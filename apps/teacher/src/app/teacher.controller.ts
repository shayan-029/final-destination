import { Controller } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class TeacherController {
  constructor(private readonly TeacherService: TeacherService) {}

  @MessagePattern('signup')
  async signup() {
    return this.TeacherService.signup();
  }
}
