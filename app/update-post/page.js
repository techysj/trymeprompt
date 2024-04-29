"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [submit, setSubmit] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/promt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updateprompt = async (e) => {
    e.preventDefault();
    setSubmit(true);
    try {
      const response = await fetch(`/api/promt/${promptId}`, {
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
      setSubmit(false);
    }
  };
  return (
    <Suspense>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        handleSubmit={updateprompt}
        submit={submit}
      />
    </Suspense>
  );
};

export default UpdatePrompt;
