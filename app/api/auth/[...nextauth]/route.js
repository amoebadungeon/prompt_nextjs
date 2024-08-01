import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

// Log the environment variables to verify they're set correctly
console.log({
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

// Configure the NextAuth handler
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID, // Correct naming convention
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Correct naming convention
    }),
  ],
  callbacks: {
    // Session callback to include user id in session
    async session({ session }) {
      try {
        const sessionUser = await User.findOne({
          email: session.user.email,
        });

        session.user.id = sessionUser._id.toString(); // Add user ID to session

        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        return session; // Return session even if an error occurs
      }
    },
    // Sign in callback to handle user sign-in logic
    async signIn({ profile }) {
      try {
        await connectToDB();

        // Check if user already exists
        const userExists = await User.findOne({
          email: profile.email,
        });

        // If user doesn't exist, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(/\s/g, "").toLowerCase(), // Use regex to remove spaces
            image: profile.picture,
          });
        }
        return true; // Allow sign-in
      } catch (error) {
        console.error("Sign in callback error:", error);
        return false; // Prevent sign-in
      }
    },
  },
});

// Export the handler for both GET and POST requests
export { handler as GET, handler as POST };
