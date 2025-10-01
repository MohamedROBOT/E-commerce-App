import { z } from "zod";

//zod validation and it's schema

//this loginFormSchema is sent to resolver to apply validation
export  const resetPasswordEmailSchema = z.object({
 
  email: z.string().email({ message: "Invalid email" }),
 });

//z.infer make schema to type
export type resetPasswordEmailFormPayload = z.infer<typeof resetPasswordEmailSchema>;







export  const resetPasswordcodeSchema = z.object({
 
  resetCode: z.string().nonempty({ message: "Reset Code is required" }),
 });

 export type resetPasswordcodePayload = z.infer<typeof resetPasswordcodeSchema>;




export  const resetNewPasswordSchema = z.object({
 
  email: z.string().email({ message: "Invalid email" }),
  newPassword: z
    .string()
    .nonempty({ message: "Password is required" }).min(8, { message: "Password must be at least 8 characters" }),
 });

 export type resetNewaPasswordPayload = z.infer<typeof resetNewPasswordSchema>;




export  const formState   = {
  success: false,
  error:  {
      
  } , 
  message: null
}

export type formStateType = z.infer<typeof formState>;