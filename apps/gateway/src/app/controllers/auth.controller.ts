import { Body, Controller,  Post } from '@nestjs/common';
import {GatewayService } from '../gateway.service';

@Controller()
export class AuthController {
  constructor(private readonly appService: GatewayService) {}

  @Post("signUp")
   async signup(@Body() body:any){
    return this.appService.signup(body)
   }
}
