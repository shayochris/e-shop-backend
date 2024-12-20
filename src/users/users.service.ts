import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from './dto/chenge-password-dto';
import {
  selectUser,
  selectUserWithPassword,
  SuccessResponse,
  User,
  UserWithPassword,
} from './types/user';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(payload: CreateUserDto): Promise<User> {
    const { password, email } = payload;
    await this.validateUserEmail(email);
    try {
      const user = await this.prisma.user.create({
        data: { ...payload, password: await bcrypt.hash(password, 10) },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return this.prisma.user.findMany({
        select: { ...selectUser },
      });
    } catch (error) {
      throw error;
    }
  }

  // returns user without password
  async findOne(id: number): Promise<User> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id },
        select: { ...selectUserWithPassword },
      });
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (error) {
      throw error;
    }
  }

  // returns user with password
  async findUser(id: number): Promise<UserWithPassword> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id },
        select: { ...selectUserWithPassword },
      });
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string): Promise<UserWithPassword> {
    try {
      return this.prisma.user.findFirst({
        where: { email },
        select: { ...selectUserWithPassword },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, payload: UpdateUserDto): Promise<SuccessResponse> {
    await this.findOne(id);
    await this.validateUserEmail(payload.email, id);
    try {
      await this.prisma.user.update({
        where: { id },
        data: { ...payload },
      });
      return { success: true, message: 'user updated successfully' };
    } catch (error) {
      throw error;
    }
  }

  async changePassword(
    id: number,
    payload: ChangePasswordDto,
  ): Promise<SuccessResponse> {
    const { old_password, new_password } = payload;

    const user = await this.findUser(id);

    if (!(await bcrypt.compare(old_password, user.password))) {
      throw new UnprocessableEntityException('Old Password is Invalid');
    }

    try {
      await this.prisma.user.update({
        where: { id },
        data: { ...user, password: await bcrypt.hash(new_password, 10) },
      });
      return { success: true, message: 'Password updated successfully' };
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<SuccessResponse> {
    await this.findOne(id);
    try {
      await this.prisma.user.delete({ where: { id } });
      return { success: true, message: 'user deleted successfully' };
    } catch (error) {
      throw error;
    }
  }

  async validateUserEmail(email: string, excludedId?: number) {
    try {
      const email_taken = await this.prisma.user.findFirst({
        where: { email, ...(excludedId && { id: { not: excludedId } }) },
      });

      if (email_taken) {
        throw new ConflictException('email is already taken');
      }
    } catch (error) {
      throw error;
    }
  }
}
