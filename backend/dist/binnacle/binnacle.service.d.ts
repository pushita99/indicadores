import { Repository } from 'typeorm';
import { CreateBinnacleDto } from './dto/create-binnacle.dto';
import { UpdateBinnacleDto } from './dto/update-binnacle.dto';
import { Binnacle } from './entities/binnacle.entity';
export declare class BinnacleService {
    private readonly binnacleRepository;
    constructor(binnacleRepository: Repository<Binnacle>);
    create(createBinnacleDto: CreateBinnacleDto): Promise<Binnacle>;
    findAll(): Promise<Binnacle[]>;
    findOne(id: number): string;
    update(id: number, updateBinnacleDto: UpdateBinnacleDto): string;
    remove(id: number): string;
}
