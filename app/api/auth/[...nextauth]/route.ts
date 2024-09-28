// import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// import GitHubProvider from 'next-auth/providers/github';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import bcrypt from 'bcrypt';

// import User from '@/models/user';
// import { connectToDB } from '@/utils/database';

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string,
//     }),
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error('Invalid credentials');
//         }
//         await connectToDB();
//         const user = await User.findOne({ email: credentials.email });
//         if (!user || !user.password) {
//           throw new Error('Invalid credentials');
//         }
//         const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);
//         if (!isCorrectPassword) {
//           throw new Error('Invalid credentials');
//         }
//         return user;
//       }
//     })
//   ],
//   callbacks: {
//     async session({ session }) {
//       // store the user id from MongoDB to session
//       const sessionUser = await User.findOne({ email: session.user.email });
//       session.user.id = sessionUser._id.toString();
//       return session;
//     },
//     async signIn({ account, profile, user, credentials }) {
//       try {
//         await connectToDB();

//         // check if user already exists
//         const userExists = await User.findOne({ email: profile.email });

//         // if not, create a new document and save user in MongoDB
//         if (!userExists) {
//           await User.create({
//             email: profile.email,
//             username: profile.name.replace(" ", "").toLowerCase(),
//             image: profile.picture,
//           });
//         }

//         return true;
//       } catch (error) {
//         console.log("Error checking if user exists: ", error.message);
//         return false;
//       }
//     },
//   },
//   pages: {
//     signIn: '/login',
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// });

// export { handler as GET, handler as POST };



import { handlers } from '@/auth';
export const { GET, POST } = handlers;