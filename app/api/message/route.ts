import { chatbotPrompt } from "@/helpers/constant/chatbotprompt";
import {
  ChatGPTMessage,
  OpenAIStream,
  OpenAIStreamPayload,
} from "@/lib/chatgpt-stream";
import { MessageArraySchema } from "@/lib/validators/message";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const parsedMessage = MessageArraySchema.parse(messages);

    const outboundMessages: ChatGPTMessage[] = parsedMessage.map((message) => ({
      role: message.isUserSent ? "user" : "system",
      content: message.message,
    }));

    outboundMessages.unshift({
      role: "system",
      content: chatbotPrompt,
    });

    const payload: OpenAIStreamPayload = {
      model: "gpt-3.5-turbo",
      messages: outboundMessages,
      temperature: 0.4,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 150,
      stream: true,
      n: 1,
    };

    const stream = await OpenAIStream(payload);

    return new Response(stream);
  } catch (error) {
    if (error === z.ZodError) {
      return new Response("Invalid message", { status: 403 });
    }

    return new Response("Something went wrong", { status: 500 });
  }
}
