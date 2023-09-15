import { Direction } from "src/direction/entities/direction.entity";
import { Indicatorcompanydirection } from "src/indicatorcompanydirection/entities/indicatorcompanydirection.entity";
import { Measurementunit } from "src/measurementunit/entities/measurementunit.entity";
import { Planification } from "src/planification/entities/planification.entity";
export declare class Indicator {
    id: number;
    name: string;
    description: string;
    measurementunit: Measurementunit;
    directions: Direction[];
    indicatorcompanydirections?: Indicatorcompanydirection;
    planifications?: Planification;
}
