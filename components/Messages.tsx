"use client";

import { MessageContext } from "@/app/context/message";
import { cn } from "@/lib/utils";
import React, { FC, HtmlHTMLAttributes, useContext } from "react";
import MarkdownLite from "./MarkdownLite";

interface MessageProps extends HtmlHTMLAttributes<HTMLDivElement> {}

const Messages: FC<MessageProps> = ({ className, ...props }) => {
  const { messages } = useContext(MessageContext);
  const inverseMessages = [...messages].reverse();
  return (
    <div
      {...props}
      className={cn(
        "flex flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch",
        className
      )}
    >
      <div className="flex-1 flex-grow" />
      {inverseMessages.map((message) => (
        <div key={message.id} className="chat-message">
          <div
            className={cn("flex items-end", {
              "justify-end": message.isUserSent,
            })}
          >
            <div
              className={cn(
                "flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden",
                {
                  "order-1 items-end": message.isUserSent,
                  " order-2 items-start": !message.isUserSent,
                }
              )}
            >
              <p
                className={cn("px-4 py-2 rounded-lg", {
                  "bg-blue-600 text-white": message.isUserSent,
                  "bg-gray-200 text-gray-900": !message.isUserSent,
                })}
              >
                <MarkdownLite text={message.message} />
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
