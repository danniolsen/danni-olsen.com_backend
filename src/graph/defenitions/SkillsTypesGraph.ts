export const SkillTypeDef = `
  type SkillType {
    _id: ID!
    skill_type_name: String!
    skill_type_icon: String!
    skills: [Skill!]
  }
  input SkillTypeInput {
    skill_type_name: String!,
    skill_type_icon: String!
    skills: [SkillInput]
  }`;

export function GetAllSkillTypes(SkillTypeModel: any) {
  return SkillTypeModel.find()
    .populate("skills")
    .then((res: any) => {
      return res.map((skilltype: any) => {
        return { ...skilltype._doc };
      });
    })
    .catch((err: any) => {
      console.log(err);
    });
}

export function CreateNewSkillType(SkillTypeModel: any, args: any) {
  const skilltype = new SkillTypeModel({
    skill_type_name: args.skillTypeInput.skill_type_name,
    skill_type_icon: args.skillTypeInput.skill_type_icon
  });
  return skilltype
    .save()
    .then((result: any) => {
      return result;
    })
    .catch((err: any) => console.log("error", err));
}
