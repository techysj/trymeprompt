"use client";
import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreatePost = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submit, setSubmit] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const createprompt = async (e) => {
    e.preventDefault();
    setSubmit(true);
    try {
      const response = await fetch("/api/promt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmit(false);
    }
  };
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      handleSubmit={createprompt}
      submit={submit}
    />
  );
};

export default CreatePost;
