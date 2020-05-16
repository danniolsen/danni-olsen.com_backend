export const ExperienceDef = `
  type Experience {
    _id: ID!
    exp_color: String!
    exp_logo: String!
    exp_company: String!
    exp_position:String!
    exp_start_date:String!
    exp_end_date:String!
    exp_descriptions: [Description!]
  }

  input ExperienceInput {
    exp_color: String!
    exp_logo: String!
    exp_company: String!
    exp_position:String!
    exp_start_date:String!
    exp_end_date:String!
    exp_descriptions: [DescriptionInput]
  }`;

export function GetAllExperience(ExperienceModel: any) {
  return ExperienceModel.find()
    .sort({ _id: "desc" })
    .populate("exp_descriptions")
    .then((res: any) => {
      return res.map((exp: any) => {
        return { ...exp._doc };
      });
    })
    .catch((err: any) => {
      console.log(err);
      throw err;
    });
}

// create new Experience
export function CreateNewExperience(ExperienceModel: any, args: any) {
  const experience = new ExperienceModel({
    exp_color: args.experienceInput.exp_color,
    exp_logo: args.experienceInput.exp_logo,
    exp_company: args.experienceInput.exp_company,
    exp_position: args.experienceInput.exp_position,
    exp_start_date: args.experienceInput.exp_start_date,
    exp_end_date: args.experienceInput.exp_end_date
  });

  return experience
    .save()
    .then((result: any) => {
      return result;
    })
    .catch((err: any) => console.log("error", err));
}
