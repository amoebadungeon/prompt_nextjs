"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const promptId = searchParam.get("id")
  console.log("asd",searchParam)
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  useEffect(() => {
    const getPromptsDetail = async() => {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();
      
        setPost({
            prompt: data.prompt,
            tag: data.tag
        })
    }
    if(promptId) getPromptsDetail();
  

  }, [promptId])
  
  const UpdatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if(!promptId) return alert("promptID not found")
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={UpdatePrompt}
    />
  );
};

export default UpdatePrompt;