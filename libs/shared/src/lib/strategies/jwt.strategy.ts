import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICES } from '@shared/constants';
import { firstValueFrom, timeout, catchError, of } from 'rxjs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(SERVICES.AUTH) private authClient: ClientProxy) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });
  }

  async validate(payload: any) {
    if (!payload || !payload.sub) {
      throw new UnauthorizedException('Invalid token payload');
    }

    try {
      const user = await firstValueFrom(
        this.authClient.send('validate-user', payload.sub).pipe(
          timeout(5000),
          catchError(() => {
            // If microservice is unavailable, return payload data
            return of({
              _id: payload.sub,
              email: payload.email,
              role: payload.role,
            });
          })
        )
      );
      return user;
    } catch (error) {
      // Fallback to payload data if validation fails
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      return {
        _id: payload.sub,
        email: payload.email,
        role: payload.role,
      };
    }
  }
}

