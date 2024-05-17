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
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json()); // this parser is a builtin middleware of express
app.use(express_1.default.text()); // this parser is a builtin middleware of express
// express routing
const userRouter = express_1.default.Router();
const courseRouter = express_1.default.Router();
app.use('/api/v1/users', userRouter);
app.use("/api/v1/courses", courseRouter);
userRouter.post("/create-user", (req, res) => {
    const user = req.body;
    console.log(user);
    res.json({
        success: true,
        message: "User created successfully",
        data: user
    });
});
courseRouter.post("/create-course", (req, res) => {
    const course = req.body;
    console.log(course);
    res.json({
        success: true,
        message: "Course created successfully",
        data: course
    });
});
// custom middleware
const logger = (req, res, next) => {
    console.log(req.url, req.method, req.hostname, req.ip);
    next();
};
// single query ==>  http://localhost:5000?email=john@email.com
// multiple queries ==>  http://localhost:5000?email=john@email.com&name=john
app.get('/', logger, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.query);
        res.send('Hello');
    }
    catch (error) {
        next(error);
    }
}));
app.post('/', logger, (req, res) => {
    console.log(req.body);
    // res.send("Got data");
    res.json({ message: "Got data successfully" });
});
// aeita functionta sobar sheshe hobe 
app.all("*", (req, res) => {
    res.status(400).json({
        success: false,
        message: "Route Not found"
    });
});
// global Error handler
app.use((error, req, res, next) => {
    if (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        });
    }
});
exports.default = app;
