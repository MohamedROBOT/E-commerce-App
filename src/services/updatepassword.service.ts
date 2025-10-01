"use server"

import { getUserToken } from "@/lib/server-utils";
import { formStateType } from "@/schemas/register.schema";
import { updatePasswordFormSchema } from "@/schemas/updatepassword.schema";

export async function handleChangePassword(formState : formStateType , FormData : FormData) {
  const token = await getUserToken();
  const formValues = {
    currentPassword: FormData.get("currentPassword"),
    password: FormData.get("password"),
    rePassword: FormData.get("rePassword"),
  }

 const parsedData  = updatePasswordFormSchema.safeParse(formValues)

 if(!parsedData.success) {
  return {
    success: false,
    error: parsedData.error?.flatten().fieldErrors,
    message: null
  };
 }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}api/v1/users/changeMyPassword`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify(formValues),
      }
    );
    const data = await response.json();


    if (!response.ok) {
        return {
            success: false,
            error: {},
            message: data.errors.msg
        }
    } else {
        return {
            success: true,
            error: {},
            message: data.message
        }
    }
    return data
  } catch (error) {

     return {
            success: false,
            error: {},
            message: (error as Error).message
        } 
  }
 }

