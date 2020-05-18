//act_descriptions: [ActivityItem!]
// act_descriptions: [ActivityInput]

export const ActivitiesDef = `
  type Activity {
    _id: ID!
    act_title: String!
    act_descriptions: [ActivityItem!]
  }

  input ActivityInput {
    act_title: String!
  }`;

export function GetAllActivities(ActivitiesModel: any) {
  return ActivitiesModel.find()
    .sort({ _id: "desc" })
    .populate("act_descriptions")
    .then((res: any) => {
      return res.map((act: any) => {
        return { ...act._doc };
      });
    })
    .catch((err: any) => {
      console.log(err);
      throw err;
    });
}

// create new Activity
export function CreateNewActivity(ActivitiesModel: any, args: any) {
  const activity = new ActivitiesModel({
    act_title: args.activityInput.act_title
  });

  return activity
    .save()
    .then((result: any) => {
      return result;
    })
    .catch((err: any) => console.log("error", err));
}
