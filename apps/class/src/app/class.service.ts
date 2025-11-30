import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateClassSectionDto, Student, UpdateClassSectionDto } from '@shared';
import { ClassSection } from '../../../../libs/shared/src/schemas/class.schema';

@Injectable()
export class ClassSectionService {
  constructor(
    @InjectModel(ClassSection.name)
    private classSectionModel: Model<ClassSection>,
    @InjectModel(Student.name)
    private studentModel: Model<Student>
  ) { }

  async create(dto: CreateClassSectionDto) {
    return await this.classSectionModel.create(dto);
  }

  async findAll() {
    const sections = await this.classSectionModel.aggregate([
      {
        $lookup: {
          from: 'students',
          localField: '_id',
          foreignField: 'classId',
          as: 'students'
        }
      },
      {
        $addFields: {
          studentCount: {
            $size: {
              $ifNull: ['$students', []]
            }
          }
        }
      },
      {
        $project: {
          _id: 1,
          className: 1,
          sectionName: 1,
          description: 1,
          studentCount: 1,
          createdAt: 1,
          updatedAt: 1,
        }
      }
    ]).exec();
    return sections;
  }

  async findOne(id: string) {
    // Validate ObjectId format
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid class section ID');
    }

    const sections = await this.classSectionModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id)
        }
      },
      {
        $lookup: {
          from: 'students',
          localField: '_id',
          foreignField: 'classId',
          as: 'allStudents'
        }
      },
      {
        $addFields: {
          students: {
            $filter: {
              input: { $ifNull: ['$allStudents', []] },
              as: 'student',
              cond: { 
                $eq: [
                  { $toLower: { $trim: { input: '$$student.course' } } }, 
                  'computer science'
                ] 
              }
            }
          }
        }
      },
      {
        $addFields: {
          studentCount: {
            $size: {
              $ifNull: ['$students', []]
            }
          }
        }
      },
      {
        $project: {
          _id: 1,
          className: 1,
          sectionName: 1,
          description: 1,
          studentCount: 1,
          students: 1,
          allStudents: 1, // Temporary: to debug if lookup is working
          createdAt: 1,
          updatedAt: 1,
        }
      }
    ]).exec();

    if (!sections || sections.length === 0) {
      throw new NotFoundException('Class section not found');
    }

    return sections[0];
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
