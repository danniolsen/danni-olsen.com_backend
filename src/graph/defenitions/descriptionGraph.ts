export const DescriptionDef = `
  type Description {
    _id: ID!
    des_title: String!
    des_text: String!
    des_exp_fk: Experience
  }
  input DescriptionInput {
    des_title: String!
    des_text: String!
    des_exp_fk: String!
  }`;

export function GetAllDescriptions(DescriptionModel: any) {
  return DescriptionModel.find()
    .then((res: any) => {
      return res.map((description: any) => {
        return { ...description._doc };
      });
    })
    .catch((err: any) => {
      return { error: err };
    });
}

export function CreateNewDescription(
  DescriptionModel: any,
  ExperienceModel: any,
  args: any
) {
  const description = new DescriptionModel({
    des_title: args.descriptionInput.des_title,
    des_text: args.descriptionInput.des_text,
    des_exp_fk: args.descriptionInput.des_exp_fk
  });
  let createdDescription: any;
  return description
    .save()
    .then((result: any) => {
      createdDescription = result._doc;
      return ExperienceModel.findById(args.descriptionInput.des_exp_fk);
      //return result;
    })
    .then((experience: any) => {
      experience.exp_descriptions.push(description);
      experience.save();
    })
    .then(() => {
      return createdDescription;
    })
    .catch((err: any) => console.log("error", err));
}
