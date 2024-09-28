"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PostForm from "@/components/post-form";
import { useUserStore } from "@/store/useUserStore";

const CreatePost= () => {

  const router = useRouter()
  const { user, fetchUser } = useUserStore()

  useEffect(() => {
    fetchUser()
  }, [fetchUser])


  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ post_title: "", post_tag: "", post_content: ""});

  const createPost = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/post/new", {
        method: "POST",
        body: JSON.stringify({
          userId: user._id,
          post_title: post.post_title,          
          post_tag: post.post_tag,
          post_content: post.post_content

        }),
      });

      if (response.ok) {
        toast.success("Post has been created! 🔥");
        router.push("/posts");
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PostForm
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPost}
    />
  );
};

export default CreatePost;
