"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillDTO = void 0;
const class_transformer_1 = require("class-transformer");
function fillDTO(dto, plainObject) {
    return (0, class_transformer_1.plainToInstance)(dto, plainObject, { excludeExtraneousValues: true });
}
exports.fillDTO = fillDTO;
//# sourceMappingURL=fill-dto.js.map