import graphqlHttp from "express-graphql";
import { buildSchema } from "graphql";
import SkillsTypeModel from "../models/skills_types_model";
import SkillModel from "../models/skills_model";

import {
  SkillTypeDef,
  GetAllSkillTypes,
  CreateNewSkillType
} from "./defenitions/SkillsTypesGraph";

import {
  SkillDef,
  GetAllSkills,
  CreateNewSkill
} from "./defenitions/SkillGraph";

const GraphEndpoint = (app: any) => {
  app.use(
    "/graphql",
    graphqlHttp({
      schema: buildSchema(`
          ${SkillTypeDef}
          ${SkillDef}
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
        skillType: async () => {
          return GetAllSkillTypes(SkillsTypeModel);
        },
        createSkillType: async (args: any) => {
          return CreateNewSkillType(SkillsTypeModel, args);
        },
        skill: async () => {
          return GetAllSkills(SkillModel);
        },
        createSkill: async (args: any) => {
          return CreateNewSkill(SkillModel, args, SkillsTypeModel);
        }
      },
      graphiql: true
    })
  );
};

export default GraphEndpoint;
