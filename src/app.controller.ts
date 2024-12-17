import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Send Custom message' })
  @ApiResponse({ status: 200, description: 'Message' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
