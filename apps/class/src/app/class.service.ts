import { Injectable } from '@nestjs/common';

@Injectable()
export class ClassService {
  async signup() {
    return 'signUp successfully';
  }
}
