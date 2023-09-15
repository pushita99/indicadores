import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from "typeorm";
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class SecurityService {
    private readonly userRepository;
    private readonly jwtService;
    private readonly logger;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    create(createUserDto: CreateUserDto): Promise<{
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
    findOne(id: number): Promise<User>;
    update(id: number, updateSecurityDto: UpdateUserDto): string;
    remove(id: number): Promise<void>;
    private handleDBExceptions;
    private getJwtToken;
}
