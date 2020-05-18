import mongoose from "mongoose";
const Schema: any = mongoose.Schema;

const activitiesSchema: mongoose.Schema = new Schema({
  act_title: {
    type: String,
    required: true
  },
  act_descriptions: [
    {
      type: Schema.Types.ObjectId,
      ref: "ActivityItem"
    }
  ]
});

export default mongoose.model("Activities", activitiesSchema);
