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
import { handleCodeVerification } from "@/services/reset-password.service";

import { formState, resetPasswordcodePayload, resetPasswordcodeSchema} from "@/schemas/resetpassword-schema";


export default function ResetPasswordPage() {
const [action, formAction] =  useActionState(handleCodeVerification, formState)
const router = useRouter()
  // useForm
  const form = useForm<resetPasswordcodePayload>({
    resolver: zodResolver(resetPasswordcodeSchema),
    defaultValues: {
      resetCode: "",
    },
  });

  useEffect(() => {
    if(action) {
      if(!action.success && action.message) {
        toast.error(action.message, {
        position: 'top-center'
      })
      }

      if(action.success) {
        
         router.push("/new-reset-password")
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
           
          
          {/* ******************** reset code *********************/}
            <FormField
              control={form.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your reset code</FormLabel>
                  <FormControl>
                    <Input  {...field} />
                  </FormControl>

                  <FormMessage>{action.error?.resetCode?.[0]}</FormMessage>
                </FormItem>
              )}
           />
            <div className="text-center w-1/2 mx-auto flex items-center gap-4">
              <Button   className="grow-1" type="submit">
                  Verify Code
                </Button>

              
            </div>
          </form>
        </Form>
      </div>
    </MainContainer>
  );
}
