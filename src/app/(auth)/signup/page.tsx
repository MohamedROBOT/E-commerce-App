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
import { useRouter } from "next/navigation";

import {
  formState,
  RegisterFormPayload,
  registerFormSchema,
} from "@/schemas/register.schema";
import {   handleRegister } from "@/services/register.service";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
//we set our form shape to send it to useActionState as a parameter

export default function RegisterForm() {
  const router = useRouter();


//we didn't call the function directly because we want to secure our api
//we will call register in server side so we use useActionState
//we send formAction to form action attribute
//useActionState takes two parameters handleRegister and formState
//we initailze formState in register.schema.ts
//api call is in handleRegister and it now secured

  const [action, formAction] = useActionState(handleRegister, formState);
  // useForm
  const form = useForm<RegisterFormPayload>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });



useEffect(() => {
if(action){


  if(!action.success && action.message) {
    toast.error(action.message, {
      position: "top-center",
    });
  }

  if(action.success && action.message) {
    toast.success(action.message, {
      position: "top-center",
    });
    router.push("/login");
  }

}
}, [action, router])

  return (
    <MainContainer>
      <div className="max-w-2xl  mx-auto py-12">
        <h2 className="text-3xl font-bold mb-12">Register</h2>
        <Form {...form}>
          {/* we didn't use onsubmit because event on server  */}
          <form action={formAction} className="space-y-8">
            {/* ******************** Name *********************/}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex. Mohamed" {...field} />
                  </FormControl>
                  <FormMessage>{action.error?.name?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            {/* ******************** Email *********************/}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="username@domain.com" {...field} />
                  </FormControl>

                  <FormMessage>{action.error?.email?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            {/* ******************** Password *********************/}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" {...field} type="password" />
                  </FormControl>

                  <FormMessage>{action.error?.password?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            {/* ******************** rePassword *********************/}
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" {...field} type="password" />
                  </FormControl>

                  <FormMessage>{action.error?.rePassword?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            {/* ******************** phone *********************/}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+2 0123 456 789" {...field} type="tel"/>
                  </FormControl>

                  <FormMessage>{action.error?.phone?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            <div className="text-center w-1/2 mx-auto  -">
              <Button className="w-full" type="submit">
                Register
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </MainContainer>
  );
}
