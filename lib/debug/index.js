"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generator_1 = require("../generator");
const types_1 = require("../types");
generator_1.generate(__dirname + "/schema2.graphql", __dirname + "/output", {
    maxDepth: 2,
    language: types_1.Language.TYPESCRIPT,
    fragments: ["Message", "Location", "User", "Hub", "ModelMessageConnection"],
    separateFiles: true,
});
//# sourceMappingURL=index.js.map