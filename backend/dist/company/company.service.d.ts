import { Direction } from 'src/direction/entities/direction.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
export declare class CompanyService {
    private readonly companyRepository;
    private directionRepository;
    private readonly logger;
    constructor(companyRepository: Repository<Company>, directionRepository: Repository<Direction>);
    create(createCompanyDto: CreateCompanyDto): Promise<Company>;
    addDirectionToCompany(id: number, directionId: number): Promise<Company>;
    findAll(): Promise<Company[]>;
    findOne(id: number): Promise<Company>;
    findByDirection(direction: number): Promise<Company[]>;
    update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<Company>;
    remove(id: number): Promise<void>;
    private handleDBExceptions;
}
