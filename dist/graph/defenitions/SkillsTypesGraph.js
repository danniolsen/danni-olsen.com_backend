"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillTypeDef = `
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
function GetAllSkillTypes(SkillTypeModel) {
    return SkillTypeModel.find()
        .populate("skills")
        .then((res) => {
        return res.map((skilltype) => {
            return Object.assign({}, skilltype._doc);
        });
    })
        .catch((err) => {
        console.log(err);
    });
}
exports.GetAllSkillTypes = GetAllSkillTypes;
function CreateNewSkillType(SkillTypeModel, args) {
    const skilltype = new SkillTypeModel({
        skill_type_name: args.skillTypeInput.skill_type_name,
        skill_type_icon: args.skillTypeInput.skill_type_icon
    });
    return skilltype
        .save()
        .then((result) => {
        return result;
    })
        .catch((err) => console.log("error", err));
}
exports.CreateNewSkillType = CreateNewSkillType;
//# sourceMappingURL=SkillsTypesGraph.js.map