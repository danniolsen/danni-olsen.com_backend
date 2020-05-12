"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const skillsTypes = new Schema({
    skill_type_name: {
        type: String,
        required: true
    },
    skill_type_icon: {
        type: String,
        required: true
    },
    skills: [
        {
            type: Schema.Types.ObjectId,
            ref: "Skill"
        }
    ]
});
exports.default = mongoose_1.default.model("Skill_type", skillsTypes);
//# sourceMappingURL=skills_types_model.js.map