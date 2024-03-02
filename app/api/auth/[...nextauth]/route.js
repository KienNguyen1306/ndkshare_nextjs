import connection from "@/db/db";
import jwt from "jsonwebtoken";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
 const optionsNextauth = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Custom Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { username, password } = credentials
          const [rows] = await connection.execute(`SELECT * FROM users WHERE username = "${username}" AND password = "${password}"`);
          if (rows.length > 0) {
            const assetToken = jwt.sign({ username }, `${process.env.SECRET_KEY}`, {expiresIn: "1h",});
            const resetToken = jwt.sign({ username }, `${process.env.SECRET_KEY}`, {expiresIn: "1d",});
            return { assetToken, resetToken ,rows}
          } else {
            return null
            
          }
        } catch (error) {
          return error
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user}) {
      return user
    },
    async jwt({ token, user }) {
      if(user){
        token.username = user.rows[0].username
        token.fullname = user.rows[0].fullname
        token.image = user.rows[0].image
        token.role = user.rows[0].role
        token.email =user.rows[0].email
        token.assetToken =user.assetToken
        token.resetToken =user.resetToken
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user:{
          ...session.user,
          name:token.username,
          email:token.email,
          image:token.image,
          fullname:token.fullname,
          role:token.role,
        }
      }
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(optionsNextauth);
export { handler as GET, handler as POST, optionsNextauth };

