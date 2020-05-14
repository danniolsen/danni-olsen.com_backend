export const SkillDef = `
  type Skill {
    _id: ID!
    skill_name: String!
    skill_logo: String!
    skill_level: Int!
    skill_type_fk: SkillType
  }
  input SkillInput {
    skill_name: String!
    skill_logo: String!
    skill_level: Int!
    skill_type_fk: String!
  }`;

export function GetAllSkills(SkillModel: any) {
  return SkillModel.find()
    .then((res: any) => {
      return res.map((skill: any) => {
        return { ...skill._doc };
      });
    })
    .catch((err: any) => {
      console.log(err);
      throw err;
    });
}

export function CreateNewSkill(
  SkillModel: any,
  args: any,
  SkillTypeModel: any
) {
  const skill = new SkillModel({
    skill_name: args.skillInput.skill_name,
    skill_logo: args.skillInput.skill_logo,
    skill_level: args.skillInput.skill_level,
    skill_type_fk: args.skillInput.skill_type_fk
  });
  let createdSkill: any;
  return skill
    .save()
    .then((result: any) => {
      createdSkill = result._doc;
      return SkillTypeModel.findById(args.skillInput.skill_type_fk);
      //return result;
    })
    .then((skillType: any) => {
      skillType.skills.push(skill);
      skillType.save();
    })
    .then(() => {
      return createdSkill;
    })
    .catch((err: any) => console.log("error", err));
}
