import { z } from "zod";

//zod validation and it's schema

//this loginFormSchema is sent to resolver to apply validation
export  const loginFormSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    
});

//z.infer make schema to type
export type LoginFormPayload = z.infer<typeof loginFormSchema>;
