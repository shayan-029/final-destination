import { Controller, Get } from '@nestjs/common';
import { StudentService } from './student.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @MessagePattern('signup')
  async signup() {
    return this.studentService.signup();
  }
}
