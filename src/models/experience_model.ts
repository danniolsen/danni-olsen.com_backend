import mongoose from "mongoose";
const Schema: any = mongoose.Schema;

const experienceSchema: mongoose.Schema = new Schema({
  exp_color: {
    type: String,
    required: true
  },
  exp_logo: {
    type: String,
    required: true
  },
  exp_company: {
    type: String,
    required: true
  },
  exp_position: {
    type: String,
    required: true
  },
  exp_start_date: {
    type: Date,
    required: true
  },
  exp_end_date: {
    type: Date,
    required: true
  },
  exp_description: {
    type: String,
    required: true
  }
});

export default mongoose.model("Experiences", experienceSchema);
