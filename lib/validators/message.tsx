import { z } from "zod";

export const MessageSchema = z.object({
  id: z.string(),
  isUserSent: z.boolean(),
  message: z.string(),
});

export const MessageArraySchema = z.array(MessageSchema);

export type Message = z.infer<typeof MessageSchema>;
