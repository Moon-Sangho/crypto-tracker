import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

import { ErrorBoundary } from "./error-boundary";

import type { AsyncBoundaryProps } from "./types";

const AsyncBoundary = ({
  children,
  pendingFallback = <></>,
  onReset,
  ...errorBoundaryProps
}: AsyncBoundaryProps) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={() => {
        onReset?.();
        reset();
      }}
      {...errorBoundaryProps}
    >
      <Suspense fallback={pendingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default AsyncBoundary;
