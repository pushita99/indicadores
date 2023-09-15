import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
export default class CreateSuperuserSeed implements Seeder {
    run(factory: Factory, connection: Connection): Promise<void>;
}
