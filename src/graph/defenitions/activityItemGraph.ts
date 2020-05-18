export const ActivityItemDef = `
  type ActivityItem {
    _id: ID!
    act_i_icon: String!
    act_i_name: String!
    act_i_subName: String!
    act_i_image: String!
    act_i_description: String!
    act_fk: Activity
  }
  input ActivityItemInput {
    act_i_icon: String!
    act_i_name: String!
    act_i_subName: String!
    act_i_image: String!
    act_i_description: String!
    act_fk: String!
  }`;

export function GetAllActivityItems(ActivityItemModel: any) {
  return ActivityItemModel.find()
    .then((res: any) => {
      return res.map((activity: any) => {
        return { ...activity._doc };
      });
    })
    .catch((err: any) => {
      return { error: err };
    });
}

export function CreateNewActivityItem(
  ActivityItemModel: any,
  ActivityModel: any,
  args: any
) {
  const activityItem = new ActivityItemModel({
    act_i_icon: args.activityItemInput.act_i_icon,
    act_i_name: args.activityItemInput.act_i_name,
    act_i_subName: args.activityItemInput.act_i_subName,
    act_i_image: args.activityItemInput.act_i_image,
    act_i_description: args.activityItemInput.act_i_description,
    act_fk: args.activityItemInput.act_fk
  });
  let createdActivityItem: any;
  return activityItem
    .save()
    .then((result: any) => {
      createdActivityItem = result._doc;
      return ActivityModel.findById(args.activityItemInput.act_fk);
      //return result;
    })
    .then((activity: any) => {
      activity.act_descriptions.push(activityItem);
      activity.save();
    })
    .then(() => {
      return createdActivityItem;
    })
    .catch((err: any) => console.log("error", err));
}
