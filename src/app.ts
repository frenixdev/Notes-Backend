import express from "express";
import noteRoutes from "./routes/note.routes";

const app = express();
app.use(express.json());

app.use("/", noteRoutes);


export default app;
