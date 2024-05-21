import mongoose,{Schema} from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: false,
      default:
        "https://w7.pngwing.com/pngs/427/153/png-transparent-computer-icons-business-user-company-young-miscellaneous-child-face-thumbnail.png",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    roles:{
      type:[Schema.Types.ObjectId],
      required: true,
      ref: "Role"
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);