import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSetting } from "../helpers/errorHandlers.js";

import { emailRegexp } from "../constant/user-constant.js";

const userSchema = new Schema(
    {
      password: {
        type: String,
        required: [true, "Password is required"],
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        match: emailRegexp,
        unique: true,
      },
      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter",
      },
      token: {
        type: String,
        default: null,
      },
    },
    { versionKey: false, timestamps: true }
  );
  
  userSchema.post("save", handleSaveError);
  userSchema.pre("findOneAndUpdate", setUpdateSetting);
  userSchema.post("user", handleSaveError);
  
  const User = model("user", userSchema);
  
  export default User;