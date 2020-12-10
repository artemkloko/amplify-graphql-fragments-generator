"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const package_json_1 = __importDefault(require("../../package.json"));
const run = async (context) => {
    context.print.info(package_json_1.default.version);
};
exports.run = run;
//# sourceMappingURL=version.js.map