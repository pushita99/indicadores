import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Connection } from 'typeorm';
export declare class AppModule implements NestModule {
    private connection;
    constructor(connection: Connection);
    configure(consumer: MiddlewareConsumer): Promise<void>;
    onModuleInit(): Promise<void>;
    seedSuperuser(): Promise<void>;
}
