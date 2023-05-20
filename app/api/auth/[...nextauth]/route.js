import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import { signIn, signOut } from "next-auth/react";

//importing this function from utils/database.js
import { connectionToDB } from "@utils/database";
import User from '@models/user';


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

            await connectionToDB()

            //check if user already exist
            const userExists = await User.findOne({ email: profile.email });

            //if user doesn't exist, create one 
            if (!userExists) {
                await User.create({
                    email: profile.email,
                    //we did this so that name doesn't have any spaces and it is in lowercase
                    username: profile.name.replace(" ", "").toLowerCase(),
                    image: profile.picture,
                });
            }
            //return true if signIn successful
            return true;
        }
        catch (error) {
            //return false and console.log the error if failed to signIn
            console.log(error);
            return false
        }
    }
})

export { handler as GET, handler as POST }

// console page: https://console.cloud.google.com/apis/credentials?hl=en-AU&organizationId=0&project=long-walker-387007
//second : https://cloud.mongodb.com/v2/6465d0094a3d6c0854dc0881#/clusters