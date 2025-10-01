import { z } from "zod";

//zod validation and it's schema

//this loginFormSchema is sent to resolver to apply validation
export  const updatePasswordFormSchema = z.object({
  
  currentPassword: z
    .string()
    .nonempty({ message: "Password is required" }).min(8, { message: "Password must be at least 8 characters" }),
  password: z
    .string()
    .nonempty({ message: "New Password is required" }).min(8, { message: "New Password must be at least 8 characters" }),
  rePassword: z
    .string()
    .nonempty({ message: "Conform Password is required" }),
    
}).refine(data => data.password === data.rePassword, {
  message: "Confirm Password do not match with New Password",
  path: ["rePassword"],
});

//z.infer make schema to type
export type updatePasswordFormPayload = z.infer<typeof updatePasswordFormSchema>;


export const formState = {
  success: false,
  error: {},
  message: null
}

export type formStateType = typeof formState