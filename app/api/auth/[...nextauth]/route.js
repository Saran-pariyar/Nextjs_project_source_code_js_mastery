import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import { signIn, signOut } from "next-auth/react";



const handler = NextAuth({

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })

    ],
    async session({ session }) {

    },
    async signIn({ profile }) {
        try { 

            
        }
        catch (error) { }
    }
})

export { handler as GET, handler as POST }

// console page: https://console.cloud.google.com/apis/credentials?hl=en-AU&organizationId=0&project=long-walker-387007