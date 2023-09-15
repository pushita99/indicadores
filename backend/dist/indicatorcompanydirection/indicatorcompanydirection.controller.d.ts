import { IndicatorcompanydirectionService } from './indicatorcompanydirection.service';
import { CreateIndicatorcompanydirectionDto } from './dto/create-indicatorcompanydirection.dto';
import { UpdateIndicatorcompanydirectionDto } from './dto/update-indicatorcompanydirection.dto';
export declare class IndicatorcompanydirectionController {
    private readonly indicatorcompanydirectionService;
    constructor(indicatorcompanydirectionService: IndicatorcompanydirectionService);
    create(createIndicatorcompanydirectionDto: CreateIndicatorcompanydirectionDto): Promise<import("./entities/indicatorcompanydirection.entity").Indicatorcompanydirection>;
    findAll(): Promise<import("./entities/indicatorcompanydirection.entity").Indicatorcompanydirection[]>;
    findOne(id: string): Promise<import("./entities/indicatorcompanydirection.entity").Indicatorcompanydirection>;
    update(id: string, updateIndicatorcompanydirectionDto: UpdateIndicatorcompanydirectionDto): string;
    remove(id: string): Promise<void>;
}
