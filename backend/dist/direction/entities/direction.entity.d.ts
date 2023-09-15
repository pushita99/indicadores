import { Company } from "src/company/entities/company.entity";
import { Indicator } from "src/indicator/entities/indicator.entity";
import { Indicatorcompanydirection } from "src/indicatorcompanydirection/entities/indicatorcompanydirection.entity";
import { Planification } from "src/planification/entities/planification.entity";
import { User } from "src/security/entities/user.entity";
export declare class Direction {
    id: number;
    name: string;
    users: User;
    companies: Company[];
    indicatorcompanydirections?: Indicatorcompanydirection[];
    planifications?: Planification[];
    indicators: Indicator[];
}
