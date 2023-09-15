import { Company } from "src/company/entities/company.entity";
import { Direction } from "src/direction/entities/direction.entity";
import { Indicator } from "src/indicator/entities/indicator.entity";
export declare class Planification {
    id: number;
    january: number;
    february: number;
    march: number;
    april: number;
    may: number;
    june: number;
    july: number;
    august: number;
    september: number;
    october: number;
    november: number;
    december: number;
    date: Date;
    indicator: Indicator;
    company: Company;
    direction: Direction;
}
