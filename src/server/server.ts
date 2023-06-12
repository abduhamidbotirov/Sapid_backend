import express, { Application, Request, Response, NextFunction } from "express";
// import { connectToDatabase } from "../db/db.js";
import "../db/mongo.js"
import fileUpload from "express-fileupload";
import cors from "cors"
// import "../db/mongo.js"
const app: Application = express();
const PORT: number = Number(process.env.PORT) || 5000;
import errorMiddleware from "../middleware/errorHandler.js";
import userRoutes from "../routes/user.routes.js";
import postRoutes from "../routes/post.routes.js";
import swRouter from "../utils/swagger.js";
import productRouter from "../routes/product.routes.js"
import * as path from 'path';
app.use(express.json());
app.use(fileUpload({
    limits: {
        fileSize: 50 * 1024 * 1024
    }
}));
app.use(express.static(path.join(process.cwd(),'src', "public")));
app.use(cors());
app.use('/api/docs', swRouter);
app.use('/api/users', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/product', productRouter);
app.use('/api', productRouter);
app.use(errorMiddleware);
// app.listen(PORT, () => console.log("Server listening on port" + PORT));
app.listen(PORT, () => console.log("Server listening on port" + PORT));

// connectToDatabase().then(() => {
    // app.listen(PORT, () => console.log("Server listening on port" + PORT));

// });    