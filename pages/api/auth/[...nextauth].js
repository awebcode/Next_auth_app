import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "../../../database/conn";
import Users, { signUp } from "../../../model/Schema";
import { compare } from "bcryptjs";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { MongoClient } from "mongodb";
const adminEmails = ["asikurrahaman997@gmail.com"];
import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcryptjs"
import axios from "axios";

const uri = process.env.MONGO_URL;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
export default NextAuth({
  // secret: "XH6bp/TkLvnUkQiPDEZNyHc0CV+VV5RL/n+HdVHoHN0=",
  // session: {
  //   strategy: "jwt",
  // },

  providers: [
    // Google Provider

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      scope: "user:email=null",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  //mongodb
  // database: process.env.MONGO_URL,

  // callbacks: {
  //   async signIn(user, account, profile) {
  //     // Connect to the MongoDB database
  //     console.log("userCallb", user?.email);
  //     const db = await connectMongo();

  //     // Check if the user already exists in the Users collection
  //     const existingUser = await Users.findOne({ email: user.email });
  //     console.log("extingUser``1", existingUser);
  //     if (existingUser) {
  //       // If the user exists, update their information
  //       await Users.updateOne(
  //         { email: user.email },
  //         { $set: { name: user.name, password: user.password, avatar: user.image } }
  //       );
  //     } else {
  //       // If the user doesn't exist, create a new document in the Users collection
  //       await Users.create({
  //         name: user.name,
  //         email: user.email,
  //         password: user.password,
  //         avatar: user.image,
  //       });
  //     }
  //     console.log("extingUser", existingUser);
  //     // Set the custom session object
  //     const session = { jwt: existingUser?._id.toString() };

  //     return true;
  //   },
  //   async session(session, user) {
  //     // Get the user from the MongoDB database using the jwt property in the session object
  //     const db = await connectMongo();
  //     const foundUser = await Users.findById(session.jwt);
  //     console.log("found  userl", foundUser);
  //     // If the user is found, add the user object to the session
  //     if (foundUser) {
  //       session.user = foundUser;
  //     }
  //     console.log("sess token cal", session);
  //     return session;
  //   },
  //   async jwt(token, user) {
  //     // Add the user id to the token
  //     if (user) {
  //       token.userId = user.id;
  //     }
  //     console.log("jwt token", token);
  //     return token;
  //   },
  // },

  adapter: MongoDBAdapter(clientPromise),
  // session: {
  //   jwt: true,
  // },
  // jwt: {
  //   secret: process.env.SECRET,
  // },
  // // database: process.env.MONGO_URL,

  // secret: process.env.SECRET,
});
