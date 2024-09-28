"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useUserStore } from "@/store/useUserStore";


const PostCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
 
  const router = useRouter()
  const { user, fetchUser } = useUserStore()

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const userName = user.name || "";
  const userImage = user.image || "";
  const userEmail = user.email || "";

  const [copied, setCopied] = useState("");
  const [commenting, setCommenting] = useState(false); 
  const [likeStatus, setLikeStatus] = useState(false); 
  const [comment, setComment] = useState("");

  const handleProfileClick = () => {
    if (post.creator === user._id) return router.push("/profile");
    router.push(`/profile/${post.creator}?name=${userName}`);
  };

  console.log(post.creator)

  const handleCopy = () => {
    setCopied(post.post_title);
    navigator.clipboard.writeText(post.post_title);
    setTimeout(() => setCopied(false), 3000);
  };

  // Toggle the comment input box
  const handleCommentClick = () => {
    setCommenting(!commenting);
  };

  // Handle the like action
  const handleLike = async () => {
    setLikeStatus(!likeStatus);

    // Call API to save like information
    try {
      const response = await fetch("/api/like-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: post._id,
          userId: user._id,
        }),
      });
      if (!response.ok) {
        console.error("Error saving like");
      }
    } catch (error) {
      console.error("Failed to like post", error);
    }
  };

  // Handle comment submission
  const handleCommentSubmit = async () => {
    try {
      const response = await fetch("/api/comment-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: post._id,
          userId: user._id,
          comment,
        }),
      });
      if (response.ok) {
        setComment("");
        setCommenting(false);
      } else {
        console.error("Error submitting comment");
      }
    } catch (error) {
      console.error("Failed to comment on post", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden "
    >
      <div className="p-6">
        <div className="flex justify-between items-start gap-5 mb-4">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={handleProfileClick}
          >
            <Image
              src={userImage || "/images/avatar.jpg"}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <div className="ml-2">
              <h3 className="font-semibold text-gray-900">{post.creator?.username}</h3>
              <p className="text-sm text-gray-500">{post.creator?.email}</p>
            </div>
          </div>

          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={handleCopy}
          >
            <Image
              src={
                copied === post.post_title
                  ? "/images/icons/tick.svg"
                  : "/images/icons/copy.svg"
              }
              alt={copied === post.post_title ? "tick_icon" : "copy_icon"}
              width={20}
              height={20}
            />
          </button>
        </div>

        <p className="mt-2 font-bold text-gray-700">{post.post_title}</p>

        <p className="mt-2 mb-4 text-gray-700">{post.post_content}</p>
        <p
          className="mt-4 text-sm font-medium text-blue-600 cursor-pointer hover:underline"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          #{post.post_tag}
        </p>

        <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between">
          {/* Left: Comment Button */}
          <button
            className="text-sm font-medium text-gray-600 hover:text-gray-800"
            onClick={handleCommentClick}
          >
            Comment
          </button>

          {/* Right: Like Button */}
          <button
            className={`text-sm font-medium ${
              likeStatus ? "text-red-600" : "text-gray-600"
            } hover:text-red-600`}
            onClick={handleLike}
          >
            {likeStatus ? "Liked ❤️" : "Like ❤️"}
          </button>
        </div>

        {/* Comment input field (toggle based on clicking comment button) */}
        {commenting && (
          <div className="mt-4">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Write a comment..."
            />
            <button
              className="mt-2 text-sm text-blue-600 hover:text-blue-800"
              onClick={handleCommentSubmit}
            >
              Submit Comment
            </button>
          </div>
        )}

        {user._id === post.creator?._id && pathName === "/profile" && (
          <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end space-x-4">
            <button
              className="text-sm font-medium text-green-600 hover:text-green-800"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="text-sm font-medium text-red-600 hover:text-red-800"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PostCard;
