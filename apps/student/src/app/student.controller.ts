import { Controller } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, UpdateStudentDto } from 'libs/shared/src/dtos/student-dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @MessagePattern('student.create')
  create(@Payload() dto: CreateStudentDto) {
    return this.studentService.create(dto);
  }

  @MessagePattern('student.findAll')
  findAll() {
    return this.studentService.findAll();
  }

  @MessagePattern('student.findOne')
  findOne(@Payload() id: string) {
    return this.studentService.findOne(id);
  }

  @MessagePattern('student.update')
  update(@Payload() data: { id: string; dto: UpdateStudentDto }) {
    return this.studentService.update(data.id, data.dto);
  }

  @MessagePattern('student.remove')
  remove(@Payload() id: string) {
    return this.studentService.remove(id);
  }
}
