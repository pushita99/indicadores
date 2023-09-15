import { IndicatorService } from './indicator.service';
import { CreateIndicatorDto } from './dto/create-indicator.dto';
import { UpdateIndicatorDto } from './dto/update-indicator.dto';
export declare class IndicatorController {
    private readonly indicatorService;
    constructor(indicatorService: IndicatorService);
    create(createIndicatorDto: CreateIndicatorDto): Promise<import("./entities/indicator.entity").Indicator>;
    addDirectionToIndicator(id: number, directionId: number): Promise<import("./entities/indicator.entity").Indicator>;
    findAll(): Promise<import("./entities/indicator.entity").Indicator[]>;
    findOne(id: string): Promise<import("./entities/indicator.entity").Indicator>;
    findByDirection(direction: number): Promise<import("./entities/indicator.entity").Indicator[]>;
    update(id: string, updateIndicatorDto: UpdateIndicatorDto): Promise<import("./entities/indicator.entity").Indicator>;
    remove(id: string): Promise<void>;
}
