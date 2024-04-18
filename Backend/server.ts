import express, { Request, Response } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import URL from "./models/url";
import authRoutes from "./routes/auth";
import urlRoutes from "./routes/url";
import userRoutes from "./routes/user";
import connectDB from "./config/db";

dotenv.config();

const app = express();

connectDB(process.env.DATABASE);

// Routes
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", authRoutes);
app.use("/api/url", urlRoutes);
app.use("/api/user", userRoutes);

app.get("/:slug", async (req: Request, res: Response) => {
  const slug: string = req.params.slug;
  try {
    const item = await URL.findOneAndUpdate({ slug }, { $inc: { count: 1 } }, { new: true });
    if (!item) {
      return res.status(404).redirect(`${process.env.CLIENT_URL}/error`);
    }
    let redirectURL: string = item.URL.startsWith("http://") || item.URL.startsWith("https://") ? item.URL : "http://" + item.URL;

    res.redirect(redirectURL);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/status", async (req: Request, res: Response) => {
  try {
    res.status(200).json({ ok: 1 });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const port: number = parseInt(process.env.PORT!) || 8000;
app.listen(port, () => console.log(`API is running on port ${port}`));
