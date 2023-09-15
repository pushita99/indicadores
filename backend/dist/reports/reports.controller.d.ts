import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    create(createReportDto: CreateReportDto): string;
    findAll(): string;
    generalReport(id: string, date: string): Promise<any[]>;
    update(id: string, updateReportDto: UpdateReportDto): string;
    remove(id: string): string;
}
