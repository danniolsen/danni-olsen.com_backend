import graphqlHttp from "express-graphql";
import { buildSchema } from "graphql";
import SkillsTypeModel from "../models/skills_types_model";
import {
  SkillTypeDef,
  GetAllSkillTypes,
  CreateNewSkillType
} from "./defenitions/SkillsTypesGraph";
import SkillModel from "../models/skills_model";
import {
  SkillDef,
  GetAllSkills,
  CreateNewSkill
} from "./defenitions/SkillGraph";
import ExperienceModel from "../models/experience_model";
import {
  ExperienceDef,
  GetAllExperience,
  CreateNewExperience
} from "./defenitions/experiencesGraph";

const GraphEndpoint = (app: any) => {
  app.use(
    "/graphql",
    graphqlHttp({
      schema: buildSchema(`
          ${SkillTypeDef}
          ${SkillDef}
          ${ExperienceDef}
          type RootQuery{
            skillType: [SkillType!]!
            skill: [Skill!]!
            experience: [Experience!]!
          }
          type RootMutation {
            createSkillType(skillTypeInput: SkillTypeInput): SkillType
            createSkill(skillInput: SkillInput): Skill
            createExperience(experienceInput: ExperienceInput): Experience
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
        },
        experience: async () => {
          return GetAllExperience(ExperienceModel);
        },
        createExperience: async (args: any) => {
          return CreateNewExperience(ExperienceModel, args);
        }
      },
      graphiql: true
    })
  );
};

export default GraphEndpoint;
