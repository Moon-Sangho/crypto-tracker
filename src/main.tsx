import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./router.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Agentation } from "agentation";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on rate limit (429) or client errors (4xx)
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 429) {
            return false;
          }
          if (error.response?.status && error.response.status < 500) {
            return false;
          }
        }
        // Retry other errors up to 3 times
        return failureCount < 3;
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
      <ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
      {import.meta.env.DEV && <Agentation />}
    </QueryClientProvider>
  </StrictMode>,
);
