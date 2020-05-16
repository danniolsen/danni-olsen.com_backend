import mongoose from "mongoose";
const Schema: any = mongoose.Schema;

const expDescriptionSchema: mongoose.Schema = new Schema({
  des_title: {
    type: String,
    required: true
  },
  des_text: {
    type: String,
    required: true
  },
  des_exp_fk: {
    type: Schema.Types.ObjectId,
    ref: "Experiences"
  }
});

export default mongoose.model("Description", expDescriptionSchema);

// make fk to types later
