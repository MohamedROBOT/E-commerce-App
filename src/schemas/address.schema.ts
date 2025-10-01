import { z } from "zod";

//zod validation and it's schema

//this loginFormSchema is sent to resolver to apply validation
export const addressFormSchema = z.object({
  cartId: z.string().nonempty({ message: "Name is required" }),
  details: z
    .string()
    .nonempty({ message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters" }),
  city: z
    .string()
    .nonempty({ message: " City is required" })
    .min(3, { message: "Name must be at least 3 characters" }),
  phone: z
    .string()
    .nonempty({ message: "Phone is required" })
    .min(8, { message: "Phone must be at least 8 characters" }),
  paymentMethod: z.enum(["cash", "card"], {
    message: "Payment method is required",
  }),
});

//z.infer make schema to type
export type addressFormPayload = z.infer<typeof addressFormSchema>;

export const addressFormState = {
  success: false,
  error: {
    
  },
  message: null,
};

export type addressFormStateType = {
  success: boolean;
  error: {
    cartId?: string[];
    details?: string[];
    city?: string[];
    phone?: string[];
    paymentMethod?: string[];
    callbackUrl?: string[];
  };
  message: string | null;
};
