import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Note", NoteSchema);
