import { Repository } from 'typeorm';
import { CreateIndicatorcompanydirectionDto } from './dto/create-indicatorcompanydirection.dto';
import { UpdateIndicatorcompanydirectionDto } from './dto/update-indicatorcompanydirection.dto';
import { Indicatorcompanydirection } from './entities/indicatorcompanydirection.entity';
export declare class IndicatorcompanydirectionService {
    private readonly indicatorcompanydirectionRepository;
    private readonly logger;
    constructor(indicatorcompanydirectionRepository: Repository<Indicatorcompanydirection>);
    create(createIndicatorcompanydirectionDto: CreateIndicatorcompanydirectionDto): Promise<Indicatorcompanydirection>;
    findAll(): Promise<Indicatorcompanydirection[]>;
    findOne(id: number): Promise<Indicatorcompanydirection>;
    update(id: number, updateIndicatorcompanydirectionDto: UpdateIndicatorcompanydirectionDto): string;
    remove(id: number): Promise<void>;
    private handleDBExceptions;
}
