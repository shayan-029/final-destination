import { CreateStudentDto, UpdateStudentDto } from '@shared';
import { Injectable } from '@nestjs/common';
import { StudentService } from './../../../../student/src/app/student.service';

@Injectable()
export class GatewayStudentService {
  constructor(private readonly studentService: StudentService) {}

  async create(dto: CreateStudentDto) {
    try {
      const result = await this.studentService.create(dto);
      console.log('GATEWAY CREATE STUDENT RESULT >>>', result);
      return result;
    } catch (error) {
      console.error('GATEWAY CREATE STUDENT ERROR >>>', error);
      if (error?.message?.message) {
        return {
          statusCode: error.message.statusCode || 500,
          status: error.message.status || 'error',
          message: error.message.message,
          errors: error.message.errors || undefined,
        };
      }
      const errorMessage =
        error?.response?.message || error?.message || 'Internal server error';
      return {
        statusCode: 500,
        status: 'error',
        message: Array.isArray(errorMessage)
          ? errorMessage.join(', ')
          : errorMessage,
      };
    }
  }

  async findAll() {
    try {
      const result = await this.studentService.findAll();
      console.log('GATEWAY FIND ALL STUDENTS RESULT >>>', result);
      return result;
    } catch (error) {
      console.error('GATEWAY FIND ALL STUDENTS ERROR >>>', error);
      if (error?.message?.message) {
        return {
          statusCode: error.message.statusCode || 500,
          status: error.message.status || 'error',
          message: error.message.message,
        };
      }
      return {
        statusCode: 500,
        status: 'error',
        message: 'Internal server error',
      };
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.studentService.findOne(id);
      console.log('GATEWAY FIND ONE STUDENT RESULT >>>', result);
      return result;
    } catch (error) {
      console.error('GATEWAY FIND ONE STUDENT ERROR >>>', error);
      if (error?.message?.message) {
        return {
          statusCode: error.message.statusCode || 404,
          status: error.message.status || 'error',
          message: error.message.message,
        };
      }
      const errorMessage =
        error?.response?.message || error?.message || 'Student not found';
      return {
        statusCode: 404,
        status: 'error',
        message: Array.isArray(errorMessage)
          ? errorMessage.join(', ')
          : errorMessage,
      };
    }
  }

  async update(id: string, dto: UpdateStudentDto) {
    try {
      const result = await this.studentService.update(id, dto);
      console.log('GATEWAY UPDATE STUDENT RESULT >>>', result);
      return result;
    } catch (error) {
      console.error('GATEWAY UPDATE STUDENT ERROR >>>', error);
      if (error?.message?.message) {
        return {
          statusCode: error.message.statusCode || 500,
          status: error.message.status || 'error',
          message: error.message.message,
          errors: error.message.errors || undefined,
        };
      }
      const errorMessage =
        error?.response?.message || error?.message || 'Internal server error';
      return {
        statusCode: 500,
        status: 'error',
        message: Array.isArray(errorMessage)
          ? errorMessage.join(', ')
          : errorMessage,
      };
    }
  }

  async remove(id: string) {
    try {
      const result = await this.studentService.remove(id);
      console.log('GATEWAY DELETE STUDENT RESULT >>>', result);
      return result;
    } catch (error) {
      console.error('GATEWAY DELETE STUDENT ERROR >>>', error);
      if (error?.message?.message) {
        return {
          statusCode: error.message.statusCode || 500,
          status: error.message.status || 'error',
          message: error.message.message,
        };
      }
      const errorMessage =
        error?.response?.message || error?.message || 'Internal server error';
      return {
        statusCode: 500,
        status: 'error',
        message: Array.isArray(errorMessage)
          ? errorMessage.join(', ')
          : errorMessage,
      };
    }
  }
}

