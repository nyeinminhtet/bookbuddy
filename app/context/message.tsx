import { Message } from "@/lib/validators/message";
import { nanoid } from "nanoid";
import { ReactNode, createContext, useState } from "react";

interface MessageContextType {
  messages: Message[];
  isMessageUpdating: boolean;
  addMessage: (message: Message) => void;
  removeMessage: (id: string) => void;
  updateMessage: (id: string, updateFn: (preText: string) => string) => void;
  setIsMessageUpdating: (isUpdating: boolean) => void;
}

export const MessageContext = createContext<MessageContextType>({
  messages: [],
  isMessageUpdating: false,
  addMessage: () => {},
  removeMessage: () => {},
  updateMessage: () => {},
  setIsMessageUpdating: () => {},
});

export function MessageProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: nanoid(),
      message: "Hello, how can I help you!",
      isUserSent: false,
    },
  ]);
  const [isMessageUpdating, setIsMessageUpdating] = useState(false);

  const addMessage = (message: Message) => {
    setMessages((pre) => [...pre, message]);
  };

  const removeMessage = (id: string) => {
    setMessages((pre) => pre.filter((message) => message.id !== id));
  };

  const updateMessage = (id: string, updateFn: (preText: string) => string) => {
    setMessages((pre) =>
      pre.map((text) => {
        if (text.id === id) {
          return { ...text, message: updateFn(text.message) };
        }
        return text;
      })
    );
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        addMessage,
        removeMessage,
        updateMessage,
        setIsMessageUpdating,
        isMessageUpdating,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}
