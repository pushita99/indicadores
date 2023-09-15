import { Repository } from 'typeorm';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { UpdateDirectionDto } from './dto/update-direction.dto';
import { Direction } from './entities/direction.entity';
export declare class DirectionService {
    private readonly directionRepository;
    private readonly logger;
    constructor(directionRepository: Repository<Direction>);
    create(createDirectionDto: CreateDirectionDto): Promise<Direction>;
    findAll(): Promise<Direction[]>;
    findOne(id: number): Promise<Direction>;
    update(id: number, updateDirectionDto: UpdateDirectionDto): Promise<Direction>;
    remove(id: number): Promise<void>;
    private handleDBExceptions;
}
