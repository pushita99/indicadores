import { Repository } from 'typeorm';
import { CreatePlanificationDto } from './dto/create-planification.dto';
import { UpdatePlanificationDto } from './dto/update-planification.dto';
import { Planification } from './entities/planification.entity';
export declare class PlanificationService {
    private readonly planificationRepository;
    private readonly logger;
    constructor(planificationRepository: Repository<Planification>);
    create(createPlanificationDto: CreatePlanificationDto): Promise<Planification>;
    findAll(): Promise<Planification[]>;
    findOne(id: number): Promise<Planification>;
    update(id: number, updatePlanificationDto: UpdatePlanificationDto): string;
    remove(id: number): Promise<void>;
    private handleDBExceptions;
}
