import z from "zod";
/************** USER ************************/
//input validation for backend
export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    username: z.string().optional(),})

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(8),})

/******************** BLOG ************************/

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    createdAt: z.string().datetime().optional()
})
export const updateBlogInput = z.object({
    id: z.string(),
    title: z.string().optional(),
    content: z.string().optional(),
    createdAt: z.string().datetime().optional()
})

//type inference for frontend
export type SignupType = z.infer<typeof signupInput>;
export type SigninType = z.infer<typeof signinInput>;
export type CreateBlogType = z.infer<typeof createBlogInput>;
export type UpdateBlogType = z.infer<typeof updateBlogInput>;