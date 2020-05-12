import mongoose from "mongoose";
const Schema: any = mongoose.Schema;

const skillsSchema: mongoose.Schema = new Schema({
  skill_name: {
    type: String,
    required: true
  },
  skill_logo: {
    type: String,
    required: true
  },
  skill_level: {
    type: Number,
    required: true
  },
  skill_type_fk: {
    type: Schema.Types.ObjectId,
    ref: "Skill_type"
  }
});

export default mongoose.model("Skill", skillsSchema);

// make fk to types later
