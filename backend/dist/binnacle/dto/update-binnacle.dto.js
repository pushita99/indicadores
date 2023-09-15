"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBinnacleDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_binnacle_dto_1 = require("./create-binnacle.dto");
class UpdateBinnacleDto extends (0, mapped_types_1.PartialType)(create_binnacle_dto_1.CreateBinnacleDto) {
}
exports.UpdateBinnacleDto = UpdateBinnacleDto;
//# sourceMappingURL=update-binnacle.dto.js.map