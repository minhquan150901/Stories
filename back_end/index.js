import express from "express";
import cors from "cors";
import StoryRoute from "./routes/StoryRoute.js";
 
const app = express();
app.use(cors());
app.use(express.json());
app.use(StoryRoute);
 
app.listen(5000, ()=> console.log('Server up and running...'));