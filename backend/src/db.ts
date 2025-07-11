import mongoose, {model, Schema, Types} from 'mongoose';
mongoose.connect("mongodb+srv://rahulverma:Sakidara7@cluster0.z4t4t.mongodb.net/Brainly");

const UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true}
});

export const UserModel = model('User', UserSchema);

const TagSchema = new Schema({
    title: {type: String, required: true, unique: true}
})

export const TagModel = model('Tag', TagSchema);

const contentTypes = ["Youtube", "Twitter", "Document"];

const ContentSchema = new Schema({
    link: {type: String, required: true},
    type: {type: String, enum: contentTypes, required: true},
    title: {type: String, required: true},
    tags: [{type: Types.ObjectId, ref: "Tag"}],
    userId: {type: Types.ObjectId, ref: "User", required: true},
});

export const ContentModel = model("Content", ContentSchema);

const LinkSchema = new Schema({
    hash: {type: String, required: true},
    userId: {type: Types.ObjectId, ref:"User", required: true, unique: true}
})

export const LinkModel = model("Link", LinkSchema);

const BlacklistedTokenSchema = new Schema ({
    token: {type: String, required: true, unique: true},
    expireAt: {type:Date, required: true, index: {expires: 0}}
});

export const BlacklistedTokenModel = mongoose.model("BlackListedToken", BlacklistedTokenSchema);

