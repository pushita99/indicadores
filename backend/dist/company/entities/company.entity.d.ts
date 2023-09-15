import { Direction } from "src/direction/entities/direction.entity";
import { Indicatorcompanydirection } from "src/indicatorcompanydirection/entities/indicatorcompanydirection.entity";
import { Planification } from "src/planification/entities/planification.entity";
export declare class Company {
    id: number;
    name: string;
    directions: Direction[];
    indicatorcompanydirections?: Indicatorcompanydirection;
    planifications?: Planification;
}
