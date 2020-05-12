import mongoose from "mongoose";
const Schema: any = mongoose.Schema;

const skillsTypes: mongoose.Schema = new Schema({
  skill_type_name: {
    type: String,
    required: true
  },
  skill_type_icon: {
    type: String,
    required: true
  },
  skills: [
    {
      type: Schema.Types.ObjectId,
      ref: "Skill"
    }
  ]
});

export default mongoose.model("Skill_type", skillsTypes);
