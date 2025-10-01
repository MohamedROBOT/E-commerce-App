import { z } from "zod";

//zod validation and it's schema

//this loginFormSchema is sent to resolver to apply validation
export  const registerFormSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }).min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" }).min(8, { message: "Password must be at least 8 characters" }),
  rePassword: z
    .string()
    .nonempty({ message: "Password is required" }),
    phone: z.string().nonempty({ message: "Phone is required" }).min(8, { message: "Phone must be at least 8 characters" }),
    
}).refine(data => data.password === data.rePassword, {
  message: "Passwords do not match",
  path: ["rePassword"],
});

//z.infer make schema to type
export type RegisterFormPayload = z.infer<typeof registerFormSchema>;


export  const formState   = {
  success: false,
  error:  {
      
  } , 
  message: null
}

export type formStateType = {
  success: boolean;
  error: {
    name?: string[];
    email?: string[];
    password?: string[];
    rePassword?: string[];
    phone?: string[];
  };
  message: string | null;
};

