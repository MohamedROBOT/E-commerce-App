"use server"

import { formStateType, registerFormSchema } from "@/schemas/register.schema"

//api call
//it wait 2 parameters

export async function handleRegister(formState : formStateType, formData : FormData){

    //get form data from register form
    //we destructed data from formData
    const formValues = {
    name:formData.get("name"), 
    email:formData.get("email"),
    password:formData.get("password"),
    rePassword:formData.get("rePassword"),
    phone:formData.get("phone"),
}


//safeparse from zod and takes values to check
const parsedData = registerFormSchema.safeParse(formValues)

if(!parsedData.success) {
    return {
        success: false,
        //flatten to get the errors only
        error: parsedData.error?.flatten().fieldErrors,
        message: null
    }
}

    // normal api call
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/v1/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Set the content type to json because browser gave text
            },
            body: JSON.stringify(formValues)

        })

        const data = await response.json()

        if(!response.ok) {
           return {
            success: false,
            error: {
                
            },
            message: data.message
           }
        }
        return {
            success: true,
            error: {},
            message: data.message
        };
        return data
    } catch (error) {
      return  {
             success: false,
            error: {
                
            },
            message: (error as Error).message
        };
    }
}

