import { Student } from './../../../../libs/shared/src/schemas/student.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStudentDto, UpdateStudentDto } from 'libs/shared/src/dtos/student-dto';
import { Model } from 'mongoose';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<Student>,
  ) {}

  // CREATE -------------------------------
  async create(dto: CreateStudentDto) {
    return this.studentModel.create(dto);
  }

  // GET ALL ------------------------------
  async findAll() {
    return this.studentModel.find();
  }

  // GET ONE ------------------------------
  async findOne(id: string) {
    const student = await this.studentModel.findById(id);
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  // UPDATE -------------------------------
  async update(id: string, dto: UpdateStudentDto) {
    const student = await this.studentModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!student) throw new NotFoundException('Student not found');

    return student;
  }

  // DELETE -------------------------------
  async remove(id: string) {
    const student = await this.studentModel.findByIdAndDelete(id);
    if (!student) throw new NotFoundException('Student not found');

    return { message: 'Student deleted successfully' };
  }
}