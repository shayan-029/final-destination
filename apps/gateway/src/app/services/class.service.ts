import { CreateClassSectionDto, UpdateClassSectionDto } from '@shared';
import { Injectable } from '@nestjs/common';
import { ClassSectionService } from './../../../../class/src/app/class.service';

@Injectable()
export class GatewayClassService {
  constructor(private readonly classSectionService: ClassSectionService) {}

  async create(dto: CreateClassSectionDto) {
    try {
      const result = await this.classSectionService.create(dto);
      console.log('GATEWAY CREATE CLASS SECTION RESULT >>>', result);
      return result;
    } catch (error) {
      console.error('GATEWAY CREATE CLASS SECTION ERROR >>>', error);
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
      const result = await this.classSectionService.findAll();
      console.log('GATEWAY FIND ALL CLASS SECTIONS RESULT >>>', result);
      return result;
    } catch (error) {
      console.error('GATEWAY FIND ALL CLASS SECTIONS ERROR >>>', error);
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
      const result = await this.classSectionService.findOne(id);
      console.log('GATEWAY FIND ONE CLASS SECTION RESULT >>>', result);
      return result;
    } catch (error) {
      console.error('GATEWAY FIND ONE CLASS SECTION ERROR >>>', error);
      if (error?.message?.message) {
        return {
          statusCode: error.message.statusCode || 404,
          status: error.message.status || 'error',
          message: error.message.message,
        };
      }
      const errorMessage =
        error?.response?.message || error?.message || 'Class section not found';
      return {
        statusCode: 404,
        status: 'error',
        message: Array.isArray(errorMessage)
          ? errorMessage.join(', ')
          : errorMessage,
      };
    }
  }

  async update(id: string, dto: UpdateClassSectionDto) {
    try {
      const result = await this.classSectionService.update(id, dto);
      console.log('GATEWAY UPDATE CLASS SECTION RESULT >>>', result);
      return result;
    } catch (error) {
      console.error('GATEWAY UPDATE CLASS SECTION ERROR >>>', error);
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
      const result = await this.classSectionService.remove(id);
      console.log('GATEWAY DELETE CLASS SECTION RESULT >>>', result);
      return result;
    } catch (error) {
      console.error('GATEWAY DELETE CLASS SECTION ERROR >>>', error);
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

