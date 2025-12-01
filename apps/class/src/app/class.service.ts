import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Class, CreateClassDto, UpdateClassDto } from '@shared';
import { Model } from 'mongoose';
 
@Injectable()
export class ClassService {
  constructor(@InjectModel(Class.name) private classModel: Model<Class>) {}
 
  async create(dto: CreateClassDto): Promise<Class> {
    return await this.classModel.create(dto);
  }
 
  async findAll(): Promise<Class[]> {
    return this.classModel.find();
  }
 
  async findOne(id: string): Promise<Class> {
    const cls = await this.classModel.findById(id);
    if (!cls) throw new NotFoundException('Class not found');
    return cls;
  }
 
  async update(id: string, dto: UpdateClassDto): Promise<Class> {
    const updated = await this.classModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Class not found');
    return updated;
  }
 
  async delete(id: string): Promise<{ message: string }> {
    const deleted = await this.classModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Class not found');
    return { message: 'Class removed successfully' };
  }
}