import { Controller } from '@nestjs/common';
import { AttendenceService } from './attendence.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AttendenceController {
  constructor(private readonly AttendenceService: AttendenceService) {}

  @MessagePattern('signup')
  async signup() {
    return this.AttendenceService.signup();
  }
}
