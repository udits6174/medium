import { Hono } from "hono";
import user_router from "./routes/user";
import blog_router from "./routes/blogs";

type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
};
const app = new Hono<{ Bindings: Bindings }>();
app.route('/api/v1/user', user_router);
app.route('/api/v1/blog', blog_router);


export default app;
