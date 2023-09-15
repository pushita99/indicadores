"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../../entities/user.entity");
const bcrypt = require("bcrypt");
class CreateSuperuserSeed {
    async run(factory, connection) {
        const existingSuperuser = await connection
            .getRepository(user_entity_1.User)
            .findOneBy({ role: 'superadmin' });
        if (existingSuperuser) {
            console.log('Superuser already exists. Skipping creation.');
            return;
        }
        await connection
            .createQueryBuilder()
            .insert()
            .into(user_entity_1.User)
            .values([
            {
                password: bcrypt.hashSync('admin123', 10),
                name: 'admin',
                lastname: 'xd',
                email: 'admin@gmail.com',
                role: 'superadmin'
            },
        ])
            .execute();
        console.log('Superuser created successfully.');
    }
}
exports.default = CreateSuperuserSeed;
//# sourceMappingURL=create-superuser.seed.js.map