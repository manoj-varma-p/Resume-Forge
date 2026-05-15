import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        try {
          if (credentials.otp) {
            console.log(`[NextAuth] Verifying OTP for ${credentials.email} at ${API_URL}`);
            const res = await fetch(`${API_URL}/auth/verify-otp`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: credentials.email, code: credentials.otp }),
            });
            if (!res.ok) {
              const errorData = await res.json().catch(() => ({}));
              console.error("[NextAuth] OTP Verification failed:", errorData);
              return null;
            }
            const data = await res.json();
            return data.user ?? null;
          }
          return null;
        } catch (error) {
          console.error("[NextAuth] Authorize exception:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          console.log(`[NextAuth] Syncing social login for ${user.email}`);
          const res = await fetch(`${API_URL}/auth/social-sync`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              image: user.image,
            }),
          });
          if (!res.ok) {
            console.error("[NextAuth] Social sync failed");
          } else {
            const data = await res.json();
            if (data.user?.id) {
              user.id = data.user.id; // Ensure the session uses our DB ID
            }
          }
        } catch (error) {
          console.error("[NextAuth] Social sync exception:", error);
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).email = token.email;
        (session.user as any).name = token.name;
        (session.user as any).image = token.picture;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
