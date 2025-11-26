import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClassSectionDto, UpdateClassSectionDto } from '@shared';
import { ClassSection } from '../../../../libs/shared/src/schemas/class.schema';

@Injectable()
export class ClassSectionService {
  constructor(
    @InjectModel(ClassSection.name)
    private classSectionModel: Model<ClassSection>,
  ) {}

  async create(dto: CreateClassSectionDto) {
    return await this.classSectionModel.create(dto);
  }

  async findAll() {
    return await this.classSectionModel.find();
  }

  async findOne(id: string) {
    const section = await this.classSectionModel.findById(id);
    if (!section) throw new NotFoundException('Class section not found');
    return section;
  }

  async update(id: string, dto: UpdateClassSectionDto) {
    const section = await this.classSectionModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!section) throw new NotFoundException('Class section not found');
    return section;
  }

  async remove(id: string) {
    const deleted = await this.classSectionModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Class section not found');
    return { message: 'Deleted successfully' };
  }
}
