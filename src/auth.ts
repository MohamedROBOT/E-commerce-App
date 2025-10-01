import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  //configuration
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { name: "email", type: "email", required: true },
        password: { name: "password", type: "password", required: true },
      },
      authorize: async (credentials) => {

        try {
          const response = await fetch(
            `${process.env.API_BASE_URL}api/v1/auth/signin`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || "something went wrong");
          }

          const decoded = JSON.parse(atob(data.token.split(".")[1])); //decode the token to get id (atob = ascii to base64)
          return {
            id: decoded.id, //to logged in with different id in the various login ways
            user: data.user, //user data from api
            token: data.token, //token value before encryption
          };
        } catch (error) {
          throw new Error((error as Error).message);
        }
      },
    }),
  ],

  //callback to encrypt token
  callbacks: {
    //encrypt token using secret keys in .env.local
    //token on the server
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user,  {/*
          token = {
          user: data.user}
          */}
        
        token.token = user.token;
        {/*
          token = {
          token: user.token}
          */}
      }
      return token;
    },
    //display token on the browser to commit actions
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },

  //initial my pages of configs too
  pages: {
    signIn: "/login", //page of auth

  },
};
