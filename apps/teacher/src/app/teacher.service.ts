import { Injectable } from '@nestjs/common';

@Injectable()
export class TeacherService {
  async signup() {
    return 'signUp successfully';
  }
}
