import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@azxkikr/medium-common";

type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
};
const user_router = new Hono<{ Bindings: Bindings }>();

user_router.post("/signup", async (c) => {
  //Initialise client
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  //body of the request
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (success) {
    try {
      //add user to DB
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
        },
      });
      const payload = {
        id: user.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 50, // Token expires in 50 minutes
      };
      const secret = c.env.JWT_SECRET;
      const token = await sign(payload, secret);
      return c.json({
        jwt: token,
      });
    } catch (error) {
      c.status(500);
      return c.json({
        message: "Internal Database error",
        error: error,
      });
    }
  } else {
    c.status(409);
    return c.json({
      message: "Inputs are not correct",
    });
  }
});

user_router.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (success) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
          password: body.password,
        },
      });
      if (!user) {
        c.status(403);
        return c.json({ error: "user not found" });
      }
      const token = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({
        jwt: token,
      });
    } catch (error) {
      c.status(500);
      return c.json({
        message: "Internal Database error",
        error: error,
      });
    }
  } else {
    c.status(409);
    return c.json({
      message: "Inputs are not correct",
    });
  }
});

export default user_router;
