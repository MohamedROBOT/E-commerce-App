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
import {
  updatePasswordFormPayload,
  updatePasswordFormSchema,
} from "@/schemas/updatepassword.schema";
import { handleChangePassword } from "@/services/updatepassword.service";
import { useActionState, useEffect } from "react";
import { formState } from "@/schemas/register.schema";
import { toast } from "sonner";
import { signOut } from "next-auth/react";


export default function ProfilePage() {
const [action, formAction] =  useActionState(handleChangePassword, formState )


  const form = useForm<updatePasswordFormPayload>({
    resolver: zodResolver(updatePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
  });
  useEffect(() => {
    if(action) {
      if(!action.success && action.message) {
        toast.error(action.message, {
        position: 'top-center'
      })
      }

      if(action.success && action.message) {
        toast.success(action.message, {
        position: 'top-center'
      })
        signOut({callbackUrl: "/login"})
      }
    }
  }, [action])
  return (
    <MainContainer>
      <div className="max-w-2xl  mx-auto py-12">
        <h2 className="text-3xl font-bold mb-12">Profile Page</h2>
        <Form {...form}>
          {/* handleSubmit handle form submit and onSubmit function handle form data */}
          <form action={formAction} className="space-y-8">
           
          
            {/* ******************** currentPassword *********************/}
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" {...field} type="password" />
                  </FormControl>

                  <FormMessage>{action.error?.currentPassword?.[0]} </FormMessage>
                </FormItem>
              )}
            />
            {/* ******************** Password *********************/}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" {...field} type="password" />
                  </FormControl>

                  <FormMessage>{action.error?.password?.[0]} </FormMessage>
                </FormItem>
              )}
            />
            {/* ******************** Confirm Password *********************/}
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" {...field} type="password" />
                  </FormControl>

                  <FormMessage>{action.error?.rePassword?.[0]} </FormMessage>
                </FormItem>
              )}
            />
            <div className="text-center w-1/2 mx-auto flex items-center gap-4">
              <Button disabled={action.loading}  className="grow-1" type="submit">
                  Change Password
                </Button>

              
            </div>
          </form>
        </Form>
      </div>
    </MainContainer>
  );
}
