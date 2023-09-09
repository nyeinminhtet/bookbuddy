"use client";

import React, { ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { MessageProvider } from "@/app/context/message";
import { Toaster } from "react-hot-toast";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MessageProvider>
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </MessageProvider>
    </QueryClientProvider>
  );
};

export default Providers;
