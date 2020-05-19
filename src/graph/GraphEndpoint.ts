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
import DescriptionModel from "../models/description_model";
import {
  DescriptionDef,
  GetAllDescriptions,
  CreateNewDescription
} from "./defenitions/descriptionGraph";
import ActivityModel from "../models/activities_model";
import {
  ActivitiesDef,
  GetAllActivities,
  CreateNewActivity
} from "./defenitions/activitiesGraph";
import ActivityItemModel from "../models/Activity_item_model";
import {
  ActivityItemDef,
  GetAllActivityItems,
  CreateNewActivityItem
} from "./defenitions/activityItemGraph";

const GraphEndpoint = (app: any) => {
  app.use(
    "/graphql",
    graphqlHttp({
      schema: buildSchema(`
          ${SkillTypeDef}
          ${SkillDef}
          ${ExperienceDef}
          ${DescriptionDef}
          ${ActivitiesDef}
          ${ActivityItemDef}
          type RootQuery{
            skillType: [SkillType!]!
            skill: [Skill!]!
            experience: [Experience!]!
            description: [Description!]!
            activities: [Activity!]!
            activityItem: [ActivityItem!]!
          }
          type RootMutation {
            createSkillType(skillTypeInput: SkillTypeInput): SkillType
            createSkill(skillInput: SkillInput): Skill
            createExperience(experienceInput: ExperienceInput): Experience
            createDescription(descriptionInput: DescriptionInput): Description
            createActivity(activityInput: ActivityInput): Activity
            createActivityItem(activityItemInput: ActivityItemInput ): ActivityItem
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
        },
        description: async () => {
          return GetAllDescriptions(DescriptionModel);
        },
        createDescription: async (args: any) => {
          return CreateNewDescription(DescriptionModel, ExperienceModel, args);
        },
        activities: async () => {
          return GetAllActivities(ActivityModel);
        },
        createActivity: async (args: any) => {
          return CreateNewActivity(ActivityModel, args);
        },
        activityItem: async () => {
          return GetAllActivityItems(ActivityItemModel);
        },
        createActivityItem: async (args: any) => {
          return CreateNewActivityItem(ActivityItemModel, ActivityModel, args);
        }
      },
      graphiql: false
    })
  );
};

export default GraphEndpoint;
