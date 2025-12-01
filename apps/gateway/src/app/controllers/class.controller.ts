import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClassService } from '../services/class.service';
import { CreateClassDto, UpdateClassDto, Roles } from '@shared';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('class')
@ApiTags('Classes')
@ApiBearerAuth()
// @ApiResponse({ status: 401, description: `You don't have access to this route `})
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Roles('admin')
  @Post()
  async create(@Body() dto: CreateClassDto) {
    return this.classService.create(dto);
  }

  @Roles()
  @Get()
  async findAll() {
    return this.classService.findAll();
  }

  @Roles()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.classService.findOne(id);
  }

  @Roles('admin')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateClassDto) {
    return this.classService.update(id, dto);
  }

  @Roles('admin')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.classService.remove(id);
  }
}
