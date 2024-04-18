import { Request, Response } from "express";
import URL from "../models/url";
import { generateRandomSlug } from "../utils/utils";

interface MyRequest extends Request {
  user?: any;
}

declare namespace Express {
  interface Request {
    customProperties: string[];
  }
}

export const generateURL = async (req: MyRequest, res: Response) => {
  const { url }: { url: string } = req.body;

  try {
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }
    let oldURL = await URL.findOne({ URL: url });
    if (oldURL) {
      return res.json({ slug: oldURL.slug });
    }

    let existingURL;
    let slug: string;
    do {
      slug = generateRandomSlug(6);
      existingURL = await URL.findOne({ slug });
    } while (existingURL);

    await URL.create({
      slug,
      URL: url,
      createdBy: req.user._id,
    });

    return res.json({ slug });
  } catch (error) {
    console.error("Error generating URL:", error);
    return res.status(500).json({ error: "Failed to generate short URL" });
  }
};

export const getSlugById = async (req: MyRequest, res: Response) => {
  const { id }: { id?: string } = req.params;

  try {
    const urlRecord = await URL.findById(id);
    if (!urlRecord) {
      return res.status(404).json({ error: "URL record not found" });
    }

    return res.json({ slug: urlRecord.slug });
  } catch (error) {
    console.error("Error retrieving slug by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateSlug = async (req: MyRequest, res: Response) => {
  const { id }: { id?: string } = req.params;
  const { slug }: { slug: string } = req.body;

  try {
    const existingURL = await URL.findOne({ slug });
    if (existingURL) {
      return res.status(400).json({ error: "Slug should be unique" });
    }
    const urlRecord = await URL.findById(id);
    if (!urlRecord) {
      return res.status(404).json({ error: "URL record not found" });
    }
    urlRecord.slug = slug;
    await urlRecord.save();

    return res.json({ message: "Slug updated successfully" });
  } catch (error) {
    console.error("Error updating slug:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
