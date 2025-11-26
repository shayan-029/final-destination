import { Student } from './../../../../libs/shared/src/schemas/student.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStudentDto, UpdateStudentDto } from 'libs/shared/src/dtos/student-dto';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<Student>,
  ) {}

  // CREATE -------------------------------
  async create(dto: CreateStudentDto) {
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    
    const studentData: any = {
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      course: dto.course,
    };

    // Add classId only if provided
    if (dto.classId) {
      studentData.classId = dto.classId;
    }

    const student = await this.studentModel.create(studentData);
    
    // Use aggregation with $lookup to get class data
    const populatedStudent = await this.studentModel.aggregate([
      { $match: { _id: new Types.ObjectId(student._id) } },
      {
        $lookup: {
          from: 'classsections', // MongoDB collection name (plural, lowercase)
          localField: 'classId',
          foreignField: '_id',
          as: 'classData'
        }
      },
      {
        $unwind: {
          path: '$classData',
          preserveNullAndEmptyArrays: true // Keep student even if no class found
        }
      },
      {
        $addFields: {
          classId: {
            $cond: {
              if: { $eq: ['$classData', null] },
              then: null,
              else: '$classData'
            }
          }
        }
      },
      {
        $project: {
          password: 0, // Remove password from response
          classData: 0, // Remove temporary classData field
          'classId.__v': 0, // Remove version field from classId
        }
      }
    ]).exec();

    if (!populatedStudent || populatedStudent.length === 0) {
      throw new NotFoundException('Student not found after creation');
    }

    return populatedStudent[0];
  }

  // GET ALL ------------------------------
  async findAll() {
    // Use aggregation with $lookup to get class data for all students
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
          classId: {
            $cond: {
              if: { $eq: ['$classData', null] },
              then: null,
              else: '$classData'
            }
          }
        }
      },
      {
        $project: {
          password: 0,
          classData: 0,
          'classId.__v': 0,
        }
      }
    ]).exec();

    return students;
  }

  // GET ONE ------------------------------
  async findOne(id: string) {
    // Validate ObjectId format
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid student ID format');
    }

    const students = await this.studentModel.aggregate([
      { $match: { _id: new Types.ObjectId(id) } },
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
          classId: {
            $cond: {
              if: { $eq: ['$classData', null] },
              then: null,
              else: '$classData'
            }
          }
        }
      },
      {
        $project: {
          password: 0,
          classData: 0,
          'classId.__v': 0,
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
    // If password is being updated, hash it
    const updateData: any = {};
    
    if (dto.name) updateData.name = dto.name;
    if (dto.email) updateData.email = dto.email;
    if (dto.course) updateData.course = dto.course;
    if (dto.classId) updateData.classId = dto.classId;
    
    if (dto.password) {
      updateData.password = await bcrypt.hash(dto.password, 10);
    }

    const student = await this.studentModel.findByIdAndUpdate(id, updateData, {
      new: true,
    }).exec();

    if (!student) throw new NotFoundException('Student not found');

    // Use aggregation with $lookup to get updated class data
    const populatedStudent = await this.studentModel.aggregate([
      { $match: { _id: new Types.ObjectId(student._id) } },
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
          classId: {
            $cond: {
              if: { $eq: ['$classData', null] },
              then: null,
              else: '$classData'
            }
          }
        }
      },
      {
        $project: {
          password: 0,
          classData: 0,
          'classId.__v': 0,
        }
      }
    ]).exec();

    if (!populatedStudent || populatedStudent.length === 0) {
      throw new NotFoundException('Student not found after update');
    }

    return populatedStudent[0];
  }

  // DELETE -------------------------------
  async remove(id: string) {
    const student = await this.studentModel.findByIdAndDelete(id);
    if (!student) throw new NotFoundException('Student not found');

    return { message: 'Student deleted successfully' };
  }
}