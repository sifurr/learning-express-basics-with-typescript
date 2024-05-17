import express, { NextFunction, Request, Response } from 'express';
const app = express()

// middlewares
app.use(express.json()); // this parser is a builtin middleware of express
app.use(express.text()); // this parser is a builtin middleware of express

// express routing
const userRouter = express.Router();
const courseRouter = express.Router();

app.use('/api/v1/users', userRouter);
app.use("/api/v1/courses", courseRouter);

userRouter.post("/create-user", (req: Request, res: Response) => {
  const user = req.body;
  console.log(user);
  res.json({
    success: true,
    message: "User created successfully",
    data: user
  })
})

courseRouter.post("/create-course", (req: Request, res: Response) => {
  const course = req.body;
  console.log(course);
  res.json({
    success: true,
    message: "Course created successfully",
    data: course
  })
})



// custom middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url, req.method, req.hostname, req.ip);
  next();
}

// single query ==>  http://localhost:5000?email=john@email.com
// multiple queries ==>  http://localhost:5000?email=john@email.com&name=john
app.get('/', logger, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log(req.query);
    res.send('Hello')
  } catch (error) {
    next(error);
  }
})


app.post('/', logger, (req: Request, res: Response) => {
  console.log(req.body);
  // res.send("Got data");
  res.json({ message: "Got data successfully" });
})


// aeita functionta sobar sheshe hobe 
app.all("*", (req: Request, res:Response)=>{
  res.status(400).json({
    success: false,
    message: "Route Not found"
  })
})

// global Error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong"
    })
  }
})

export default app;