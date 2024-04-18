import axios from "axios";
import { ServerURL } from "@/helper/utils";

export const generateURL = async (url: string): Promise<string | null> => {
  try {
    if (!url) throw new Error("URL is required");
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${ServerURL}/api/url/`,
      { url },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { slug } = response.data;

    if (!slug) throw new Error("Failed to generate URL");
    if (response.data.statusCode === 429) throw new Error("hello world!");
    return `http://localhost:8000/${slug}`;
  } catch (error) {
    console.error("Error generating URL:", error.message);
    return null;
  }
};
