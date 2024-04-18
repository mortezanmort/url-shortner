import { Request, Response } from "express";
import URL from "../models/url";

interface MyRequest extends Request {
  user?: any;
}

interface FormattedURL {
  slug: string;
  URL: string;
  count: number;
  _id: string;
  redirectURL: string;
}

interface AuthenticatedRequest extends Request {
  user: { _id: string };
}

export const getUserURLs = async (req: MyRequest, res: Response) => {
  try {
    const userURLs = await URL.find({ createdBy: req.user._id });

    const formattedURLs: FormattedURL[] = userURLs.map(url => {
      let trimmedURL = url.URL;
      if (trimmedURL.length > 60) {
        trimmedURL = trimmedURL.substring(0, 60) + "...";
      }

      return {
        slug: url.slug,
        URL: trimmedURL,
        count: url.count,
        _id: url._id,
        redirectURL: `http://localhost:8000/${url.slug}`,
      };
    });

    return res.json(formattedURLs);
  } catch (error: any) {
    console.error("Error fetching user URLs:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
