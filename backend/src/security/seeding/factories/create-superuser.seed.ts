import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from 'src/security/entities/user.entity';
import * as bcrypt from 'bcrypt';


export default class CreateSuperuserSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const existingSuperuser = await connection
    .getRepository(User)
    .findOneBy({ role: 'superadmin' });

  if (existingSuperuser) {
    console.log('Superuser already exists. Skipping creation.');
    return;
  }
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {         
          password: bcrypt.hashSync('admin123', 10),
          name: 'admin',
          lastname: 'xd',
       //   status: true,
          email: 'admin@gmail.com',
       //   created_at: 20230606,
          role: 'superadmin'
        },
      ])
      .execute();

    console.log('Superuser created successfully.');
  }
}