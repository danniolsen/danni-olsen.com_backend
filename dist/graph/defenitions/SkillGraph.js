"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillDef = `
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
function GetAllSkills(SkillModel) {
    return SkillModel.find()
        .then((res) => {
        return res.map((skill) => {
            return Object.assign({}, skill._doc);
        });
    })
        .catch((err) => {
        console.log(err);
        throw err;
    });
}
exports.GetAllSkills = GetAllSkills;
function CreateNewSkill(SkillModel, args, SkillTypeModel) {
    const skill = new SkillModel({
        skill_name: args.skillInput.skill_name,
        skill_logo: args.skillInput.skill_logo,
        skill_level: args.skillInput.skill_level,
        skill_type_fk: args.skillInput.skill_type_fk
    });
    let createdSkill;
    return skill
        .save()
        .then((result) => {
        createdSkill = result._doc;
        return SkillTypeModel.findById(args.skillInput.skill_type_fk);
        //return result;
    })
        .then((skillType) => {
        skillType.skills.push(skill);
        skillType.save();
    })
        .then(() => {
        return createdSkill;
    })
        .catch((err) => console.log("error", err));
}
exports.CreateNewSkill = CreateNewSkill;
// make skill type fk later
//# sourceMappingURL=SkillGraph.js.map