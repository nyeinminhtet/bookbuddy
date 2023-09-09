"use client";

import React from "react";
import { Accordion, AccordionItem, AccordionTrigger } from "./ui/accordion";
import ChatHeader from "./ChatHeader";
import { AccordionContent } from "@radix-ui/react-accordion";
import ChatInput from "./ChatInput";
import Messages from "./Messages";

const Chat = () => {
  return (
    <Accordion
      type="single"
      collapsible
      className=" relative bg-white z-40 shadow"
    >
      <AccordionItem value="item-1">
        <div className=" fixed right-0 sm:right-8 bottom-8 bg-white border w-100 border-gray-200 rounded-md overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <AccordionTrigger className=" px-6 border-b border-zinc-300">
              <ChatHeader />
            </AccordionTrigger>
            <AccordionContent>
              <div className=" flex flex-col h-80">
                <Messages className="px-2 py-3 flex-1" />
                <ChatInput className="px-4" />
              </div>
            </AccordionContent>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default Chat;
