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

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { password, email } = createUserDto;
    await this.validateUserEmail(email);
    try {
      await this.prisma.user.create({
        data: { ...createUserDto, password: await bcrypt.hash(password, 10) },
      });
      return { success: true, message: 'user created successfully' };
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return this.prisma.user.findMany({
        select: {
          first_name: true,
          last_name: true,
          email: true,
          role: true,
          created_at: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  // returns user without password
  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id },
        select: {
          first_name: true,
          last_name: true,
          email: true,
          role: true,
          created_at: true,
        },
      });
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (error) {
      throw error;
    }
  }

  // returns user with password
  async findUser(id: number) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id },
      });
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    await this.validateUserEmail(updateUserDto.email, id);
    try {
      await this.prisma.user.update({
        where: { id },
        data: { ...updateUserDto },
      });
      return { success: true, message: 'user updated successfully' };
    } catch (error) {
      throw error;
    }
  }

  async changePassword(id: number, changePasswordDto: ChangePasswordDto) {
    const { old_password, new_password } = changePasswordDto;

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

  async remove(id: number) {
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
