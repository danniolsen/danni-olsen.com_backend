import mongoose from "mongoose";
const Schema: any = mongoose.Schema;

const activityItemsSchema: mongoose.Schema = new Schema({
  act_i_icon: {
    type: String,
    required: true
  },
  act_i_name: {
    type: String,
    required: true
  },
  act_i_subName: {
    type: String,
    required: true
  },
  act_i_image: {
    type: String,
    required: true
  },
  act_i_description: {
    type: String,
    required: true
  },
  act_fk: {
    type: Schema.Types.ObjectId,
    ref: "Activities"
  }
});

export default mongoose.model("ActivityItem", activityItemsSchema);

// make fk to types later
