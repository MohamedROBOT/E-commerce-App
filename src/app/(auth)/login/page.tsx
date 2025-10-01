"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { LoginFormPayload, loginFormSchema } from "@/schemas/login.schema";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";

export default function LoginForm() {
  const { status } = useSession(); //for Navigation
  const router = useRouter();

  // useForm
  const form = useForm<LoginFormPayload>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //this function collect data and send to backend to check this user correct or not
  async function onSubmit(values: LoginFormPayload) {
   
    //call api after encryption
    //we call it in try catch for more security
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false, //prevent auth from redirect to its error page
        callbackUrl: "/", //we use this to direct user to home page even though we redirect is false but we use another method
      });
      if (response?.ok) {
        toast.success("Login successfully", {
          position: "top-center",
        });
        router.push("/");
      } else {
        toast.error(response?.error || "something went wrong", {
          position: "top-center",
        });
      }
      throw new Error(response?.error || "something went wrong");
    } catch (error) {
      return (error as Error).message;
    }
  }

  return (
    <MainContainer>
      <div className="max-w-2xl  mx-auto py-12">
        <h2 className="text-3xl font-bold mb-12">Login</h2>
        <Form {...form}>
          {/* handleSubmit handle form submit and onSubmit function handle form data */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

                  <FormMessage />
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

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-center w-1/2 mx-auto flex items-center gap-4">
              {status === "authenticated" ? (
                <Button type="submit">
                  <Loader2Icon className="animate-spin" />
                  Login
                </Button>
              ) : (
                <Button className="grow-1" type="submit">
                  Login
                </Button>
              )}

              <Link
                href={`/reset-password`}
                className="text-gray-500 hover:underline"
              >
                
                Reset Your Password
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </MainContainer>
  );
}
