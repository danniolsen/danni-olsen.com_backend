"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_graphql_1 = __importDefault(require("express-graphql"));
const graphql_1 = require("graphql");
const skills_types_model_1 = __importDefault(require("../models/skills_types_model"));
const skills_model_1 = __importDefault(require("../models/skills_model"));
const SkillsTypesGraph_1 = require("./defenitions/SkillsTypesGraph");
const SkillGraph_1 = require("./defenitions/SkillGraph");
const GraphEndpoint = (app) => {
    app.use("/graphql", express_graphql_1.default({
        schema: graphql_1.buildSchema(`
          ${SkillsTypesGraph_1.SkillTypeDef}
          ${SkillGraph_1.SkillDef}
          type RootQuery{
            skillType: [SkillType!]!
            skill: [Skill!]!
          }
          type RootMutation {
            createSkillType(skillTypeInput: SkillTypeInput): SkillType
            createSkill(skillInput: SkillInput): Skill
          }
          schema {
            query: RootQuery
            mutation: RootMutation
          }
        `),
        rootValue: {
            skillType: () => __awaiter(void 0, void 0, void 0, function* () {
                return SkillsTypesGraph_1.GetAllSkillTypes(skills_types_model_1.default);
            }),
            createSkillType: (args) => __awaiter(void 0, void 0, void 0, function* () {
                return SkillsTypesGraph_1.CreateNewSkillType(skills_types_model_1.default, args);
            }),
            skill: () => __awaiter(void 0, void 0, void 0, function* () {
                return SkillGraph_1.GetAllSkills(skills_model_1.default);
            }),
            createSkill: (args) => __awaiter(void 0, void 0, void 0, function* () {
                return SkillGraph_1.CreateNewSkill(skills_model_1.default, args, skills_types_model_1.default);
            })
        },
        graphiql: true
    }));
};
exports.default = GraphEndpoint;
//# sourceMappingURL=GraphEndpoint.js.map