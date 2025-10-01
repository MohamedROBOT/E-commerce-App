"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MainContainer from "@/components/shared/MainContainer";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {  handleCreateNewPassword } from "@/services/reset-password.service";

import { formState, resetNewaPasswordPayload, resetNewPasswordSchema} from "@/schemas/resetpassword-schema";


export default function ResetNewPassword() {
const [action, formAction] =  useActionState(handleCreateNewPassword, formState)
const router = useRouter()
  // useForm
  const form = useForm<resetNewaPasswordPayload>({
    resolver: zodResolver(resetNewPasswordSchema),
    defaultValues: {
      email: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    if(action) {
      if(!action.success && action.message) {
        toast.error(action.message, {
        position: 'top-center'
      })
         router.push("/reset-password")
      }

      if(action.success) {
        toast.success("Password Reset Successfully", {
        position: 'top-center'
      })
       router.push("/login")
       
      }
    }
  }, [action, router])
  return (
    <MainContainer>
      <div className="max-w-2xl  mx-auto py-12">
        <h2 className="text-3xl font-bold mb-12">Reset Your Password</h2>
        <Form {...form}>
          {/* handleSubmit handle form submit and onSubmit function handle form data */}
          <form action={formAction} className="space-y-8">
           
          
          {/* ******************** Email *********************/}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your Email</FormLabel>
                  <FormControl>
                    <Input  {...field} />
                  </FormControl>

                  <FormMessage>{action.error?.email?.[0]}</FormMessage>
                </FormItem>
              )}
           />
          {/* ******************** Email *********************/}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your New Password</FormLabel>
                  <FormControl>
                    <Input  {...field} type="password"/>
                  </FormControl>

                  <FormMessage>{action.error?.newPassword?.[0]}</FormMessage>
                </FormItem>
              )}
           />
            <div className="text-center w-1/2 mx-auto flex items-center gap-4">
              <Button   className="grow-1" type="submit">
                  Confirm
                </Button>

              
            </div>
          </form>
        </Form>
      </div>
    </MainContainer>
  );
}
