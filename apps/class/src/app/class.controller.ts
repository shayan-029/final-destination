import { Controller, Get } from '@nestjs/common';
import { ClassService } from './class.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ClassController {
  constructor(private readonly ClassService: ClassService) {}

  @MessagePattern('signup')
  async signup() {
    return this.ClassService.signup();
  }
}
