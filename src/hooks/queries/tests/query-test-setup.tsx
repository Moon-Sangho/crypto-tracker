import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * Create a fresh QueryClient instance for testing
 * Disables retries to prevent flaky tests and speed up failures
 */
export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

/**
 * Wrapper component for renderHook tests
 * Provides QueryClientProvider context for hooks that use React Query
 * Note: useSuspenseQuery hooks throw promises that require a valid Suspense boundary
 */
export const createQueryWrapper = () => {
  const queryClient = createTestQueryClient();

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  return Wrapper;
};
