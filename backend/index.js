"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = __importDefault(require("zod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const db_1 = require("./db");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const userProfileSchema = zod_1.default.object({
    username: zod_1.default
        .string()
        .min(3, { message: "Username must be atleast 3 characters long." })
        .max(10, { message: "Username must be at most 8 characters long." }),
    password: zod_1.default
        .string()
        .min(8, { message: "Password must be atleast 8 characters long." })
        .max(20, { message: "Password must be at most 20 characters long." })
        .regex(/[a-z]/, { message: "Password must have atleast one Lowercase letter." })
        .regex(/[A-Z]/, { message: "Password must have atleast one Uppercase letter." })
        .regex(/\d/, { message: "Password must have atleast one number" })
        .regex(/[^A-Za-z0-9]/, { message: "Password must have atleast one special character." })
});
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const parseResult = userProfileSchema.safeParse(req.body);
    if (!parseResult.success) {
        const fieldError = parseResult.error.flatten().fieldErrors;
        res.status(411).json({
            message: "Error in inputs",
            errors: fieldError
        });
        return;
    }
    try {
        const user = yield db_1.UserModel.findOne({
            username: username
        });
        if (user) {
            res.status(403).json({
                message: "User already exists"
            });
            return;
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 5);
        yield db_1.UserModel.create({
            username: username,
            password: hashPassword,
        });
        res.status(200).json({
            message: "You are signed-up successfully"
        });
    }
    catch (error) {
        console.log("Signup error");
        res.status(500).json({
            message: "Internal server error"
        });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield db_1.UserModel.findOne({
            username: username
        });
        if (!user) {
            res.status(404).json({
                message: "User does not exist. Please sign-up."
            });
            return;
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (passwordMatch) {
            const token = jsonwebtoken_1.default.sign({
                userId: user._id
            }, config_1.JWT_PASS);
            res.status(200).json({
                message: "You are signed-in successfully.",
                token: token
            });
        }
        else {
            res.status(403).json({
                message: "Wrong email password. Please try again."
            });
            return;
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error."
        });
    }
}));
app.post("/api/v1/content", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, link, title } = req.body;
    try {
        // @ts-ignore
        const userId = req.userId;
        yield db_1.ContentModel.create({
            title: title,
            type: type,
            link: link,
            tags: [],
            userId: userId
        });
        res.status(200).json({
            message: "Content is successfully added."
        });
    }
    catch (error) {
        console.log("Content creation error: " + error);
        res.status(500).json({
            message: "Internal server error."
        });
    }
}));
app.get("/api/v1/content", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const userId = req.userId;
        const content = yield db_1.ContentModel.find({
            userId: userId
        }).populate("userId", "username");
        res.status(200).json({
            content
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error."
        });
    }
}));
app.delete("/api/v1/content", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.body;
    try {
        //@ts-ignore
        const userId = req.userId;
        const content = yield db_1.ContentModel.find({
            _id: contentId,
            userId: userId
        });
        if (!content) {
            res.status(403).json({
                message: "No such content is available to delete."
            });
            return;
        }
        yield db_1.ContentModel.deleteOne({
            _id: contentId,
            userId: userId
        });
        res.status(200).json({
            message: "Content has been successfully deleted."
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
}));
app.post("/api/v1/brain/share", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    try {
        //@ts-ignore
        const userId = req.userId;
        if (share) {
            yield db_1.LinkModel.create({
                userId: userId,
                hash: (0, utils_1.random)(10)
            });
        }
        else {
            yield db_1.LinkModel.deleteOne({
                userId: userId
            });
        }
        res.status(200).json({
            message: "Updated Share Link "
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error."
        });
    }
}));
app.get("/api/v1/brain/:shareLink", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.LinkModel.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            message: "Sorry wrong Input."
        });
        return;
    }
    const content = yield db_1.ContentModel.find({
        userId: link.userId
    });
    const user = yield db_1.UserModel.findOne({
        _id: link.userId
    });
    res.json({
        username: user === null || user === void 0 ? void 0 : user.username,
        content: content
    });
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect("mongodb+srv://rahulverma:Sakidara7@cluster0.z4t4t.mongodb.net/Brainly");
        app.listen(3000);
        console.log("Listening on port 3000");
    });
}
main();
