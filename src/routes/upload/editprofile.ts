import { Hono } from "hono";
import db from "../../db/db.js";
import { profile } from "../../db/schema.js";

const editprofile = new Hono();

editprofile.post("/", async (c) => {
  const {
    id,
    gender,
    experience,
    resume,
    video,
    image,
    address,
    bust,
    waist,
    hips,
    skin,
    eye,
    hair,
    shoe,
    profession,
    education,
    dresses,
    outstation,
    foreign,
    passport,
    all_timings,
    languages,
    interested,
  } = await c.req.json();
  try {
    const response = await db.insert(profile).values({
      userId: id,
      gender,
      experience,
      resume,
      video,
      image,
      address,
      bust,
      waist,
      hips,
      skin,
      eye,
      hair,
      shoe,
      profession,
      education,
      dresses,
      outstation,
      foreign,
      passport,
      all_timings,
      languages,
      interested,
    });
    return c.json({ message: "user profile edited successfully", response });
  } catch (error) {
    return c.json({ message: "error editing profile", error });
  }
});

export default editprofile;
