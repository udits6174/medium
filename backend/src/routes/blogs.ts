import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@azxkikr/medium-common";

type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
};
type Variables = {
  userId: string;
};
const blog_router = new Hono<{ Bindings: Bindings; Variables: Variables }>();

/*************** MIDDLEWARE ****************/
blog_router.use("/*", async (c, next) => {
  const header = c.req.header("Authorization") || "";
  const token = header.split(" ")[1];
  const response = await verify(token, c.env.JWT_SECRET);
  if (response) {
    //extracting userId to pass down to route handler
    const userId = response.id;
    c.set("userId", userId);
    await next();
  } else {
    c.status(403);
    return c.json({ error: "unauthorised" });
  }
});

/*************** ROUTES ****************/

blog_router.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (success) {
    try {
      const blog = await prisma.blog.create({
        data: {
          title: body.title,
          content: body.content,
          createdAt: body.createdAt,
          authorId: c.get("userId"),
        },
      });
      return c.json({
        id: blog.id,
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

blog_router.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (success) {
    try {
      await prisma.blog.update({
        where: {
          id: body.id,
          authorId: c.get("userId"),
        },
        data: {
          title: body.title,
          content: body.content,
          createdAt: body.createdAt
        },
      });
      return c.json({
        updatedBy: c.get("userId"),
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

blog_router.get("/all", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const allBlogs = await prisma.blog.findMany({
      select:{
        content: true,
        title: true,
        id: true,
        createdAt: true,
        author:{
          select:{
            name: true
          }
        }

      }
    });
    // console.log(allBlogs);
    return c.json({ allBlogs });
  } catch (error) {
    return c.json({ 
      message: "DB error"
     });
  }
});

blog_router.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param("id");
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: id,
      },
      select:{
        content: true,
        title: true,
        id: true,
        createdAt: true,
        author:{
          select:{
            name: true
          }
        }
      }
    });
    return c.json({ blog });
  } catch (error) {}
});

export default blog_router;
