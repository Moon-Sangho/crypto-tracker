import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./router.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Agentation } from "agentation";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
      <ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
      {import.meta.env.DEV && <Agentation />}
    </QueryClientProvider>
  </StrictMode>,
);
