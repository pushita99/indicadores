"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlanificationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_planification_dto_1 = require("./create-planification.dto");
class UpdatePlanificationDto extends (0, mapped_types_1.PartialType)(create_planification_dto_1.CreatePlanificationDto) {
}
exports.UpdatePlanificationDto = UpdatePlanificationDto;
//# sourceMappingURL=update-planification.dto.js.map