"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const skillsSchema = new Schema({
    skill_name: {
        type: String,
        required: true
    },
    skill_logo: {
        type: String,
        required: true
    },
    skill_level: {
        type: Number,
        required: true
    },
    skill_type_fk: {
        type: Schema.Types.ObjectId,
        ref: "Skill_type"
    }
});
exports.default = mongoose_1.default.model("Skill", skillsSchema);
// make fk to types later
//# sourceMappingURL=skills_model.js.map