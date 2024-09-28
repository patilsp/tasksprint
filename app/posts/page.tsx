"use client";

import PostFeed from "@/components/post-feed";
import { motion } from "framer-motion";

const Posts = () => (
  <motion.div
  animate={{ opacity: 1, scale: 1 }}
  initial={{ opacity: 0, scale: 0.8 }}
  transition={{ ease: "easeOut" }}
  className="min-h-screen scroll"
>
 
    <div className="container mx-auto py-8">
    <div className="max-w-4xl mx-auto text-center mb-12">
      <h3 className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600 mb-4">
        Daily Employee Updates
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
          Stay informed and inspired with our daily collection of AI-powered prompts and updates.
      </p>
      <div className="h-1 w-20 bg-gradient-to-r from-orange-400 to-pink-600 mx-auto rounded-full"></div>
    </div>
      <PostFeed />
    </div>
  
  </motion.div>
);

export default Posts;


