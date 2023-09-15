import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    create(createCompanyDto: CreateCompanyDto): Promise<import("./entities/company.entity").Company>;
    findAll(): Promise<import("./entities/company.entity").Company[]>;
    findOne(id: number): Promise<import("./entities/company.entity").Company>;
    addDirectionToCompany(id: number, directionId: number): Promise<import("./entities/company.entity").Company>;
    findByDirection(direction: number): Promise<import("./entities/company.entity").Company[]>;
    update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<import("./entities/company.entity").Company>;
    remove(id: number): Promise<void>;
}
