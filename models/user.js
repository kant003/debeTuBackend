import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt'

let userSchema = new Schema(
  {
    _id: { type: Schema.ObjectId, auto: true },
    name: String,
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
      unique: true,
    },
    password: {type:String, required: true, trim: true, select: false, minLength: 4}, //TODO
  },
  {
    timestamps: true, // createdAt updatedAt
    versionKey: false, // _V
  }
);

userSchema.pre('save', async function (next) { 
  const user = this
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(user.password, salt)
  user.password = hash
  next()
})



const User = model("User", userSchema);
export { User };
