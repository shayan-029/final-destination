import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentService {
  async signup() {
    return 'signUp successfully';
  }
}
