import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { IndicatorService } from './indicator.service';
import { CreateIndicatorDto } from './dto/create-indicator.dto';
import { UpdateIndicatorDto } from './dto/update-indicator.dto';

@Controller('indicator')
export class IndicatorController {
  constructor(private readonly indicatorService: IndicatorService) {}

  @Post()
  create(@Body() createIndicatorDto: CreateIndicatorDto) {
    return this.indicatorService.create(createIndicatorDto);
  }

  @Put(':id/direction/:directionId')
  addDirectionToIndicator(
    @Param('id') id: number,
    @Param('directionId', ParseIntPipe) directionId: number,
  ) {
    return this.indicatorService.addDirectionToIndicator(id, directionId);
  }

  @Get()
  findAll() {
    return this.indicatorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.indicatorService.findOne(+id);
  }

  @Get('/direction/:direction')
  findByDirection(@Param('direction') direction: number) {
    return this.indicatorService.findByDirection(+direction);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateIndicatorDto: UpdateIndicatorDto
    ) {
    return this.indicatorService.update(+id, updateIndicatorDto);
 }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.indicatorService.remove(+id);
  }
}
