import mongoose,{Schema} from "mongoose";

const TokenSchema = new mongoose.Schema(
    {  
        userId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        token: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 300
        }
    }
);

export default mongoose.model('UserToken', TokenSchema);