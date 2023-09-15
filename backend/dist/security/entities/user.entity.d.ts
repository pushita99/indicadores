import { Binnacle } from "src/binnacle/entities/binnacle.entity";
import { Direction } from "src/direction/entities/direction.entity";
export declare class User {
    id: number;
    name: string;
    lastname: string;
    password: string;
    email: string;
    direction?: Direction;
    role: string;
    binnacles: Binnacle;
}
