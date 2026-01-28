import type { ErrorBoundaryProps } from "./error-boundary/types";
import type { PropsWithChildren, ReactNode } from "react";

export type AsyncBoundaryProps = PropsWithChildren<
  {
    pendingFallback?: ReactNode;
  } & ErrorBoundaryProps
>;
