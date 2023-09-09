"use client";

import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import React, { HtmlHTMLAttributes, useContext, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { CornerRightUp, MoreHorizontal } from "lucide-react";
import { nanoid } from "nanoid";
import { Message } from "@/lib/validators/message";
import { MessageContext } from "@/app/context/message";
import toast from "react-hot-toast";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {}

const ChatInput = ({ className, ...props }: Props) => {
  const [input, setInput] = useState<string>("");
  const {
    messages,
    addMessage,
    removeMessage,
    updateMessage,
    setIsMessageUpdating,
  } = useContext(MessageContext);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { mutate: sendMessage, isLoading } = useMutation({
    mutationFn: async (message: Message) => {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [message] }),
      });

      if (!response.ok) {
        throw new Error();
      }

      return response.body;
    },
    onError: (_, message) => {
      toast.error("Something went wrong! Please try again later.");
      removeMessage(message.id);
      textareaRef.current?.focus();
      return;
    },
    onMutate(message) {
      addMessage(message);
    },
    onSuccess: async (stream) => {
      if (!stream) throw new Error("No stream found.");

      const id = nanoid();
      const responseMessage: Message = {
        id,
        isUserSent: false,
        message: "",
      };

      addMessage(responseMessage);

      setIsMessageUpdating(true);

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: ReadingDone } = await reader.read();

        done = ReadingDone;

        const chunkValue = decoder.decode(value);
        updateMessage(id, (pre) => pre + chunkValue);
      }

      setIsMessageUpdating(false);

      setTimeout(() => {
        textareaRef.current?.focus();
      }, 10);
    },
  });

  return (
    <div {...props} className={cn("border-t border-zinc-300", className)}>
      <div className=" relative my-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
        <TextareaAutosize
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              setInput("");

              const payload: Message = {
                id: nanoid(),
                isUserSent: true,
                message: input,
              };
              sendMessage(payload);
            }
          }}
          rows={2}
          maxRows={4}
          autoFocus
          value={input}
          disabled={isLoading}
          onChange={(e) => setInput(e.target.value)}
          placeholder="write a message..."
          className=" peer disabled:opacity-50 pr-14 resize-none block border-0 bg-zinc-100 py-1.5 w-full
          text-gray-900 focus:ring-0 text-sm sm:leading-6"
        />

        <div className=" absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className=" inline-flex items-center   px-1 font-sans text-xs text-gray-400">
            {isLoading ? (
              <MoreHorizontal className=" w-5 h-5 text-gray-950 animate-pulse" />
            ) : (
              <CornerRightUp
                className=" w-5 h-5 cursor-pointer hover:text-gray-700"
                onClick={() => {
                  const payload: Message = {
                    id: nanoid(),
                    isUserSent: true,
                    message: input,
                  };
                  setInput("");
                  sendMessage(payload);
                }}
              />
            )}
          </kbd>
        </div>
        <div
          aria-hidden="true"
          className=" absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-400"
        />
      </div>
    </div>
  );
};

export default ChatInput;
