import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateClassDto, UpdateClassDto } from '@shared';
import { ClassService } from './class.service';

@Controller()
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @MessagePattern('class.create-class')
  async create(@Payload() dto: CreateClassDto) {
    return this.classService.create(dto);
  }

  @MessagePattern('class.get-all-classes')
  async findAll() {
    return this.classService.findAll();
  }

  @MessagePattern('class.get-class')
  async findOne(id: string) {
    return this.classService.findOne(id);
  }

  @MessagePattern('class.update-class')
  async update(data: { id: string; dto: UpdateClassDto }) {
    return this.classService.update(data.id, data.dto);
  }

  @MessagePattern('class.delete-class')
  delete(@Payload() id: string) {
    return this.classService.delete(id);
  }
}
