import { Hono } from "hono";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
const uploadfile = new Hono();

cloudinary.config({
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
});

const url = `C:\\Users\\Admin\\Downloads\\sample.pdf`;
uploadfile.post("/pdf", async (c) => {
  try {
    const pdf = await cloudinary.uploader.upload(url, {
      folder: "cloudinary-node-upload-pdf-demo",
      use_filename: true,
      unique_filename: false,
    });
    console.log(pdf.secure_url);
  } catch (error) {
    return c.json({ error }, 401);
  }
  return c.text("hi pdf is uploading");
});

export default uploadfile;
