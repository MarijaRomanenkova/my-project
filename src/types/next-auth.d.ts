// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name: string;
    role: string | null; // Ensure this property is included
    createdAt?: Date; // Optional properties
    updatedAt?: Date; // Optional properties
    age?: number; // Optional properties
    district?: string; // Optional properties
  }

  interface Session {
    user: User; // Ensure the user type in the session includes the extended User type
  }

  interface Token {
    role?: string; // Allow role to be string or undefined in the token
  }
}




