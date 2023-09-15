import { PlanificationService } from './planification.service';
import { CreatePlanificationDto } from './dto/create-planification.dto';
import { UpdatePlanificationDto } from './dto/update-planification.dto';
export declare class PlanificationController {
    private readonly planificationService;
    constructor(planificationService: PlanificationService);
    create(createPlanificationDto: CreatePlanificationDto): Promise<import("./entities/planification.entity").Planification>;
    findAll(): Promise<import("./entities/planification.entity").Planification[]>;
    findOne(id: string): Promise<import("./entities/planification.entity").Planification>;
    update(id: string, updatePlanificationDto: UpdatePlanificationDto): string;
    remove(id: string): Promise<void>;
}
