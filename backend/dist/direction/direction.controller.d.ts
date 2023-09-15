import { DirectionService } from './direction.service';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { UpdateDirectionDto } from './dto/update-direction.dto';
export declare class DirectionController {
    private readonly directionService;
    constructor(directionService: DirectionService);
    create(createDirectionDto: CreateDirectionDto): Promise<import("./entities/direction.entity").Direction>;
    findAll(): Promise<import("./entities/direction.entity").Direction[]>;
    findOne(id: number): Promise<import("./entities/direction.entity").Direction>;
    update(id: string, updateDirectionDto: UpdateDirectionDto): Promise<import("./entities/direction.entity").Direction>;
    remove(id: string): Promise<void>;
}
