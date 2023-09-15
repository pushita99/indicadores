import { SecurityService } from './security.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
export declare class SecurityController {
    private readonly securityService;
    constructor(securityService: SecurityService);
    create(createSecurityDto: CreateUserDto): Promise<{
        token: string;
        id: number;
        name: string;
        lastname: string;
        password: string;
        email: string;
        direction?: import("../direction/entities/direction.entity").Direction;
        role: string;
        binnacles: import("../binnacle/entities/binnacle.entity").Binnacle;
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        name: string;
        direction: import("../direction/entities/direction.entity").Direction;
        role: string;
        token: string;
    }>;
    checkAuthStatus(user: User): Promise<{
        user: string;
        direction: import("../direction/entities/direction.entity").Direction;
        role: string;
        token: string;
    }>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    test(): {
        ok: string;
    };
    update(id: string, updateSecurityDto: UpdateUserDto): string;
    remove(id: string): Promise<void>;
}
