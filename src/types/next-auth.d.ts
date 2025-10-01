import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  //jwt
  interface User {
    user: {
      name: string;
      email: string;
      role: string;
    };
    token: string;
  }

  //session
  interface Session {
    user: User.user
  }
}
