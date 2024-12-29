import { Controller, Get, HttpCode, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  @HttpCode(204)
  root() {
    return { message: 'Hello world!11111111' };
  }
}



