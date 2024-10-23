/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://ai-interview_owner:z4FXs2RcWTyA@ep-wild-king-a8kuhaqd.eastus2.azure.neon.tech/ai-interview?sslmode=require",
  },
};
