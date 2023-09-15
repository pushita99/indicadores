import { Direction } from 'src/direction/entities/direction.entity';
import { Repository } from 'typeorm';
import { CreateIndicatorDto } from './dto/create-indicator.dto';
import { UpdateIndicatorDto } from './dto/update-indicator.dto';
import { Indicator } from './entities/indicator.entity';
export declare class IndicatorService {
    private readonly indicatorRepository;
    private directionRepository;
    private readonly logger;
    constructor(indicatorRepository: Repository<Indicator>, directionRepository: Repository<Direction>);
    create(createIndicatorDto: CreateIndicatorDto): Promise<Indicator>;
    addDirectionToIndicator(id: number, directionId: number): Promise<Indicator>;
    findAll(): Promise<Indicator[]>;
    findOne(id: number): Promise<Indicator>;
    findByDirection(direction: number): Promise<Indicator[]>;
    update(id: number, updateIndicatorDto: UpdateIndicatorDto): Promise<Indicator>;
    remove(id: number): Promise<void>;
    private handleDBExceptions;
}
