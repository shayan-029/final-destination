import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateClassDto, SERVICES, UpdateClassDto } from '@shared';

@Injectable()
export class ClassService {
  constructor(@Inject(SERVICES.CLASS) private classClient: ClientProxy) {}

  create(dto: CreateClassDto) {
    return this.classClient.send('class.create-class', dto);
  }

  findAll() {
    return this.classClient.send('class.get-all-classes', {});
  }

  findOne(id: string) {
    return this.classClient.send('class.get-class', id);
  }

  update(id: string, dto: UpdateClassDto) {
    return this.classClient.send('class.update-class', { id, dto });
  }

  remove(id: string) {
    return this.classClient.send('class.delete-class', id);
  }
}
