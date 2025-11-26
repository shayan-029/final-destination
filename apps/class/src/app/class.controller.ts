import { Controller } from '@nestjs/common';
import { ClassSectionService } from './class.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateClassSectionDto, UpdateClassSectionDto } from '@shared';

@Controller()
export class ClassController {
  constructor(private readonly classSectionService: ClassSectionService) {}

  @MessagePattern('class.create')
  async create(@Payload() dto: CreateClassSectionDto) {
    return this.classSectionService.create(dto);
  }

  @MessagePattern('class.findAll')
  async findAll() {
    return this.classSectionService.findAll();
  }

  @MessagePattern('class.findOne')
  async findOne(@Payload() id: string) {
    return this.classSectionService.findOne(id);
  }

  @MessagePattern('class.update')
  async update(@Payload() data: { id: string; dto: UpdateClassSectionDto }) {
    return this.classSectionService.update(data.id, data.dto);
  }

  @MessagePattern('class.remove')
  async remove(@Payload() id: string) {
    return this.classSectionService.remove(id);
  }
}
