import NextAuth from "next-auth"
import { authOptions } from "../config"

export const GET = NextAuth(authOptions)
export const POST = NextAuth(authOptions) 
