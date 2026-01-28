import type { ComponentType, ErrorInfo, ReactNode } from 'react';

export type FallbackRenderProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

type CommonErrorBoundaryProps = {
  children: ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
  onReset?: () => void;
};

export type ErrorBoundaryPropsWithComponent = CommonErrorBoundaryProps & {
  rejectedFallback?: never;
  RejectedFallbackComponent: ComponentType<FallbackRenderProps>;
  rejectedFallbackRender?: never;
};

export type ErrorBoundaryPropsWithRender = CommonErrorBoundaryProps & {
  rejectedFallback?: never;
  RejectedFallbackComponent?: never;
  rejectedFallbackRender: (props: FallbackRenderProps) => ReactNode;
};

export type ErrorBoundaryPropsWithFallback = CommonErrorBoundaryProps & {
  rejectedFallback: ReactNode;
  RejectedFallbackComponent?: never;
  rejectedFallbackRender?: never;
};

export type ErrorBoundaryPropsWithoutFallback = CommonErrorBoundaryProps & {
  rejectedFallback?: never;
  RejectedFallbackComponent?: never;
  rejectedFallbackRender?: never;
};

export type ErrorBoundaryProps =
  | ErrorBoundaryPropsWithComponent
  | ErrorBoundaryPropsWithRender
  | ErrorBoundaryPropsWithFallback
  | ErrorBoundaryPropsWithoutFallback;

export type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};
