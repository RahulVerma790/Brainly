import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import z from "zod";
import bcrypt from "bcrypt";
import cors from "cors";

import {JWT_PASS} from "./config";

import { ContentModel, LinkModel, UserModel } from "./db";

import { authMiddleware } from "./middleware";
import { random } from "./utils";


const app = express();

app.use(express.json());
app.use(cors());


const userProfileSchema = z.object({
    username: z
    .string()
    .min(3, {message: "Username must be atleast 3 characters long."})
    .max(10,{message: "Username must be at most 8 characters long."}),

    password: z
    .string()
    .min(8, {message: "Password must be atleast 8 characters long."})
    .max(20, {message: "Password must be at most 20 characters long."})
    .regex(/[a-z]/, {message: "Password must have atleast one Lowercase letter."})
    .regex(/[A-Z]/, {message: "Password must have atleast one Uppercase letter."})
    .regex(/\d/, {message: "Password must have atleast one number"})
    .regex(/[^A-Za-z0-9]/, {message: "Password must have atleast one special character."})
})

app.post("/api/v1/signup", async (req, res) => {
    const {username, password} = req.body;
    const parseResult = userProfileSchema.safeParse(req.body);

    if(!parseResult.success){
        const fieldError = parseResult.error.flatten().fieldErrors;
        res.status(411).json({
            message: "Error in inputs",
            errors: fieldError
        });
        return;
    }

    try {
        const user = await UserModel.findOne({
            username: username
        })

        if(user){
            res.status(403).json({
                message: "User already exists"
            });
            return;
        }

        const hashPassword = await bcrypt.hash(password, 5);

        await UserModel.create({
            username: username,
            password: hashPassword,
        });

        res.status(200).json({
            message: "You are signed-up successfully"
        })

    } catch(error){
        console.log("Signup error");

        res.status(500).json({
            message: "Internal server error"
        })
    }
})

app.post("/api/v1/signin", async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await UserModel.findOne({
            username: username
        })

        if(!user){
            res.status(404).json({
                message: "User does not exist. Please sign-up."
            })
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(passwordMatch){
            const token = jwt.sign({
                userId: user._id
            }, JWT_PASS);

            res.status(200).json({
                message: "You are signed-in successfully.",
                token: token
            })
        } else {
            res.status(403).json({
                message: "Wrong email password. Please try again."
            })
            return;
        }
    }catch(error){
        res.status(500).json({
            message: "Internal server error."
        })
    }
})

app.post("/api/v1/content", authMiddleware, async (req, res) => {
    const {type, link, title} = req.body;

    try {
        // @ts-ignore
        const userId = req.userId;

        await ContentModel.create({
            title: title,
            type: type,
            link: link,
            tags: [],
            userId: userId
        })

        res.status(200).json({
            message: "Content is successfully added."
        })
    } catch(error){
        console.log("Content creation error: " + error);
        res.status(500).json({
            message: "Internal server error."
        })
    }
})

app.get("/api/v1/content", authMiddleware, async (req, res) => {

    try {
        //@ts-ignore
        const userId = req.userId;

        const content = await ContentModel.find({
            userId: userId
        }).populate("userId", "username");

        res.status(200).json({
            content
        })

    } catch(error){
        res.status(500).json({
            message: "Internal server error."
        })
    }
})

app.delete("/api/v1/content",authMiddleware, async (req, res) => {

    const {contentId} = req.body;

    try {
        //@ts-ignore
        const userId = req.userId;

        const content = await ContentModel.find({
            _id: contentId,
            userId: userId
        })

        if(!content){
            res.status(403).json({
                message: "No such content is available to delete."
            })
            return;
        }

        await ContentModel.deleteOne({
            _id: contentId,
            userId: userId
        })

        res.status(200).json({
            message: "Content has been successfully deleted."
        })
    } catch (error){
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

app.post("/api/v1/brain/share",authMiddleware, async (req, res) => {
    const share = req.body.share;

    try {
        //@ts-ignore
        const userId = req.userId;
        if(share){
            await LinkModel.create({
                userId: userId,
                hash: random(10)
            })
        } else {
            await LinkModel.deleteOne({
                userId: userId 
            })
        }
        res.status(200).json({
            message: "Updated Share Link "
        })
    } catch (error){
        res.status(500).json({
            message: "Internal server error."
        })
    }
})

app.get("/api/v1/brain/:shareLink",authMiddleware, async (req, res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    })

    if(!link){
        res.status(411).json({
            message: "Sorry wrong Input."
        });
        return;
    }

    const content = await ContentModel.find({
        userId: link.userId
    })

    const user = await UserModel.findOne({
        _id: link.userId
    })

    res.json({
        username: user?.username,
        content: content
    })
})
 
async function main(){
    await mongoose.connect("mongodb+srv://rahulverma:Sakidara7@cluster0.z4t4t.mongodb.net/Brainly");
    app.listen(3000);
    console.log("Listening on port 3000");
}

main();