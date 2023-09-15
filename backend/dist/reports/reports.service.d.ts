import { Direction } from 'src/direction/entities/direction.entity';
import { Indicator } from 'src/indicator/entities/indicator.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
export declare class ReportsService {
    private readonly directionRepository;
    private readonly indicatorRepository;
    constructor(directionRepository: Repository<Direction>, indicatorRepository: Repository<Indicator>);
    create(createReportDto: CreateReportDto): string;
    generalReport(id: number, date: string): Promise<any[]>;
    private getPlanifications;
    private getIndicator;
    findOne(id: number): string;
    update(id: number, updateReportDto: UpdateReportDto): string;
    remove(id: number): string;
    getMonthName(date: String): string;
}
