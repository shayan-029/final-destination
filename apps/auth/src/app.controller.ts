import { Controller, Get } from '@nestjs/common';
import { AppService } from './app/app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern("signup")
  async signup(){
    return this.appService.signup()
  }
}
