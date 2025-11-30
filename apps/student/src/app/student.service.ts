import { Student } from './../../../../libs/shared/src/schemas/student.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStudentDto, UpdateStudentDto } from 'libs/shared/src/dtos/student-dto';
import { Model, Types } from 'mongoose';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<Student>,
  ) { }

  // CREATE -------------------------------
  async create(dto: CreateStudentDto) {
    const studentData: any = {
      name: dto.name,
      course: dto.course,
    };

    if (dto.classId) {
      studentData.classId = new Types.ObjectId(dto.classId);
    }

    const student = await this.studentModel.create(studentData);
    return student;
  }

  async findAll() {
    const students = await this.studentModel.aggregate([
      {
        $lookup: {
          from: 'classsections',
          localField: 'classId',
          foreignField: '_id',
          as: 'classData'
        }
      },
      {
        $unwind: {
          path: '$classData',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          className: {
            $cond: {
              if: { $eq: ['$classData', null] },
              then: null,
              else: {
                _id: '$classData._id',
                className: '$classData.className',
                sectionName: '$classData.sectionName',
                description: '$classData.description',
                createdAt: '$classData.createdAt',
                updatedAt: '$classData.updatedAt'
              }
            }
          }
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          course: 1,
          classId: 1,
          className: 1,
          createdAt: 1,
          updatedAt: 1
        }
      }
    ]).exec();
    return students;
  }

  // GET ONE ------------------------------
  async findOne(id: string) {
    const students = await this.studentModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'classsections',
          localField: 'classId',
          foreignField: '_id',
          as: 'classData'
        },
      },
      {
        $unwind: {
          path: '$classData',
          preserveNullAndEmptyArrays: true,
        }
      },
      {
        $addFields: {
          className: {
            $cond: {
              if: { $eq: ['$classData', null] },
              then: null,
              else: {
                _id: '$classData._id',
                className: '$classData.className',
                sectionName: '$classData.sectionName',
                description: '$classData.description',
                createdAt: '$classData.createdAt',
                updatedAt: '$classData.updatedAt',
              }
            }
          }
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          course: 1,
          classId: 1,
          className: 1,
          createdAt: 1,
          updatedAt: 1
        }
      }
    ]).exec();

    if (!students || students.length === 0) {
      throw new NotFoundException('Student not found');
    }

    return students[0];
  }

  // UPDATE -------------------------------
  async update(id: string, dto: UpdateStudentDto) {
    const student = await this.studentModel.findByIdAndUpdate(id, dto, {
      new: true,
    }).exec();

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

