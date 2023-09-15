import { BinnacleService } from './binnacle.service';
import { CreateBinnacleDto } from './dto/create-binnacle.dto';
import { UpdateBinnacleDto } from './dto/update-binnacle.dto';
export declare class BinnacleController {
    private readonly binnacleService;
    constructor(binnacleService: BinnacleService);
    create(createBinnacleDto: CreateBinnacleDto): Promise<import("./entities/binnacle.entity").Binnacle>;
    findAll(): Promise<import("./entities/binnacle.entity").Binnacle[]>;
    findOne(id: string): string;
    update(id: string, updateBinnacleDto: UpdateBinnacleDto): string;
    remove(id: string): string;
}
