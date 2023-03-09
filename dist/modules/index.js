"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modules = void 0;
const auth_module_1 = require("./auth/auth.module");
const file_module_1 = require("./file/file.module");
const global_1 = require("./global");
const post_module_1 = require("./post/post.module");
const project_module_1 = require("./project/project.module");
const tag_module_1 = require("./tag/tag.module");
exports.Modules = [global_1.GlobalModule, post_module_1.PostModule, tag_module_1.TagModule, file_module_1.FileModule, project_module_1.ProjectModule, auth_module_1.AuthModule];
//# sourceMappingURL=index.js.map