import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateClassSectionDto, UpdateClassSectionDto, Public } from '@shared';
import { GatewayClassService } from '../services/class.service';

@ApiTags('Class')
@Controller('class')
export class ClassController {
  constructor(private readonly classService: GatewayClassService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create a new class section' })
  @ApiBody({ type: CreateClassSectionDto })
  @ApiResponse({ status: 201, description: 'Class section successfully created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() dto: CreateClassSectionDto) {
    return this.classService.create(dto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all class sections' })
  @ApiResponse({ status: 200, description: 'List of all class sections' })
  async findAll() {
    return this.classService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a class section by ID' })
  @ApiParam({ name: 'id', description: 'Class section ID' })
  @ApiResponse({ status: 200, description: 'Class section found' })
  @ApiResponse({ status: 404, description: 'Class section not found' })
  async findOne(@Param('id') id: string) {
    return this.classService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a class section' })
  @ApiParam({ name: 'id', description: 'Class section ID' })
  @ApiBody({ type: UpdateClassSectionDto })
  @ApiResponse({ status: 200, description: 'Class section successfully updated' })
  @ApiResponse({ status: 404, description: 'Class section not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async update(@Param('id') id: string, @Body() dto: UpdateClassSectionDto) {
    return this.classService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a class section' })
  @ApiParam({ name: 'id', description: 'Class section ID' })
  @ApiResponse({ status: 200, description: 'Class section successfully deleted' })
  @ApiResponse({ status: 404, description: 'Class section not found' })
  async remove(@Param('id') id: string) {
    return this.classService.remove(id);
  }
}

