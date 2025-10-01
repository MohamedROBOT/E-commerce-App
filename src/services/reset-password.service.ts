"use server"
import { formStateType, resetNewPasswordSchema, resetPasswordcodeSchema, resetPasswordEmailSchema } from "@/schemas/resetpassword-schema"



//api call
//it wait 2 parameters

export async function handleGetCode(formState : formStateType , formData : FormData){

    //get form data from register form
    //we destructed data from formData
    const formValues = {
    email:formData.get("email"), 
}


//safeparse from zod and takes values to check
const parsedData = resetPasswordEmailSchema.safeParse(formValues)

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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/v1/auth/forgotPasswords`, {
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

export async function handleCodeVerification(formState : formStateType , formData : FormData){

    //get form data from register form
    //we destructed data from formData
    const formValues = {
    resetCode:formData.get("resetCode"), 
    
}


//safeparse from zod and takes values to check
const parsedData = resetPasswordcodeSchema.safeParse(formValues)

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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/v1/auth/verifyResetCode`, {
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
export async function handleCreateNewPassword(formState : formStateType , formData : FormData){

    //get form data from register form
    //we destructed data from formData
    const formValues = {
    email:formData.get("email"), 
    newPassword:formData.get("newPassword"), 
    
}


//safeparse from zod and takes values to check
const parsedData = resetNewPasswordSchema.safeParse(formValues)

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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/v1/auth/resetPassword`, {
            method: "PUT",
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



