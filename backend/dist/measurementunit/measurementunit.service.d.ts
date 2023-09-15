import { Repository } from 'typeorm';
import { CreateMeasurementunitDto } from './dto/create-measurementunit.dto';
import { UpdateMeasurementunitDto } from './dto/update-measurementunit.dto';
import { Measurementunit } from './entities/measurementunit.entity';
export declare class MeasurementunitService {
    private readonly measurementunitRepository;
    private readonly logger;
    constructor(measurementunitRepository: Repository<Measurementunit>);
    create(createMeasurementunitDto: CreateMeasurementunitDto): Promise<Measurementunit>;
    findAll(): Promise<Measurementunit[]>;
    findOne(id: number): Promise<Measurementunit>;
    update(id: number, updateMeasurementunitDto: UpdateMeasurementunitDto): Promise<Measurementunit>;
    remove(id: number): Promise<void>;
    private handleDBExceptions;
}
