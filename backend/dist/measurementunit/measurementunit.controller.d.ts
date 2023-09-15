import { MeasurementunitService } from './measurementunit.service';
import { CreateMeasurementunitDto } from './dto/create-measurementunit.dto';
import { UpdateMeasurementunitDto } from './dto/update-measurementunit.dto';
export declare class MeasurementunitController {
    private readonly measurementunitService;
    constructor(measurementunitService: MeasurementunitService);
    create(createMeasurementunitDto: CreateMeasurementunitDto): Promise<import("./entities/measurementunit.entity").Measurementunit>;
    findAll(): Promise<import("./entities/measurementunit.entity").Measurementunit[]>;
    findOne(id: string): Promise<import("./entities/measurementunit.entity").Measurementunit>;
    update(id: string, updateMeasurementunitDto: UpdateMeasurementunitDto): Promise<import("./entities/measurementunit.entity").Measurementunit>;
    remove(id: string): Promise<void>;
}
