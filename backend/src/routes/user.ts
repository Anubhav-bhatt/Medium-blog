import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { parseSigned } from "hono/utils/cookie";
import { decode, sign, verify } from "hono/jwt";
import { signinInput, SigninInput,signupInput, } from "@anubhav.000x/medium-common-update";


export const  userRouter =new Hono<{
    Bindings:{
        JWT_SECRET: string,
        DATABASE_URL: string
    }
}>();


userRouter.post("/signup", async (c) => {
    const body = await c.req.json();
    const{success} = signupInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message:"inputs not correct"
      })
    }
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
      const user = await prisma.user.create({
        data: {
          username: body.username,
          password: body.password,
          name: body.name,
        },
      });
  
      const jwt = await sign(
        {
          id: user.id,
        },
        c.env.JWT_SECRET
      );
  
      return c.text(jwt);
    } catch (e) {
      c.status(411);
      return c.text("Invalid response");
    }
  });
  
  userRouter.post("/signin", async (c) => {
    const body = await c.req.json();
    const{success} = signinInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message:"inputs not correct"
      })
    }
  
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
      const user = await prisma.user.findFirst({
        where: {
          username: body.username,
          password: body.password,
        },
      });
  
      if (!user) {
        c.status(403);
        return c.json({
          message: "Invalid response",
        });
      }
      const jwt = await sign(
        {
          id: user.id,
        },
        c.env.JWT_SECRET
      );
  
      return c.text(jwt);
    } catch (e) {
      c.status(411);
      return c.text("Invalid response");
    }
  });
