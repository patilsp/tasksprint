"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PostForm from "@/components/post-form";

const UpdatePost = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");

  const [post, setPost] = useState({ post_title: "", post_tag: "", post_content: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPostDetails = async () => {
      if (!postId) return;
      const response = await fetch(`/api/post/${postId}`);
      const data = await response.json();
      setPost({
        post_title: data.post_title,
        post_tag: data.post_tag,
        post_content: data.post_content
      });
    };

    getPostDetails();
  }, [postId]);

  const updatePost = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!postId) {
      alert("Missing postId!");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          post_title: post.post_title,
          post_tag: post.post_tag,
          post_content: post.post_content
        }),
      });

      if (response.ok) {
        router.push("/dashboard");
      } else {
        const errorData = await response.json();
        console.error(errorData.message || "An error occurred");
      }
    } catch (error) {
      console.error("Failed to update post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PostForm
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePost}
    />
  );
};

export default UpdatePost;
