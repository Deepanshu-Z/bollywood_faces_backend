import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  index,
  uuid,
  pgEnum,
  integer,
  numeric,
} from "drizzle-orm/pg-core";
const rolesEnum = pgEnum("roles", ["user", "admin"]);
const employmentEnum = pgEnum("employmentType", [
  "full_time",
  "part_time",
  "contract",
  "internship",
  "freelance",
]);
const skintone = pgEnum("skintone", ["fair", "brown", "black"]);
const dresses = pgEnum("dresses", ["indian", "western", "shots", "hot"]);
const gender = pgEnum("gender", ["male", "female"]);
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  role: rolesEnum().default("user").notNull(),
});

export const profile = pgTable("profile", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_Id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  gender: gender(),
  experience: text("experience").notNull(),
  resume: text("resume_url"),
  video: text("video_url"),
  image: text("image_url"),
  address: text("address"),
  bust: numeric("bus_size", { precision: 5, scale: 2 }),
  waist: numeric("waist_size", { precision: 5, scale: 2 }),
  hips: numeric("hips_size", { precision: 5, scale: 2 }),
  skin: skintone().default("brown"),
  eye: text("eye_colour"),
  hair: text("hair_colour"),
  shoe: integer("shoe_size"),
  profession: text("present_profession"),
  education: text("education"),
  dresses: dresses().default("indian"),
  outstation: boolean("open_for_outstation_shoots").default(true),
  foreign: boolean("open_for_outof_country_shoots").default(true),
  passport: boolean("passport").default(true),
  all_timings: boolean("can_work_with_all_timings").default(true),
  languages: text("languages_known"),
});

export const vacancies = pgTable("vacancies", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  package: text("package"),
  skills: text("skills"),
  description: text("description").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  employmentType: employmentEnum("employment_type")
    .default("full_time")
    .notNull(),
  location: text("location").notNull(),
  experienceYears: integer("experience_years").default(0).notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)]
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)]
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)]
);

export const forms = pgTable("forms", {
  id: text("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull(),
  content: text("content").notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const schema = {
  user,
  session,
  account,
  verification,
  vacancies,
};
