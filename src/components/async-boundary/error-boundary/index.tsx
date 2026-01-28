import { Component } from "react";

import type {
  ErrorBoundaryProps,
  ErrorBoundaryState,
  FallbackRenderProps,
} from "./types";

const initialState: ErrorBoundaryState = {
  hasError: false,
  error: null,
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = initialState;

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.props.onError?.(error, info);
    console.error("ErrorBoundary caught:", error, info);
  }

  reset = () => {
    this.setState(initialState);
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const {
        rejectedFallback: fallback,
        RejectedFallbackComponent: FallbackComponent,
        rejectedFallbackRender: fallbackRender,
      } = this.props;
      const fallbackProps: FallbackRenderProps = {
        error: this.state.error,
        resetErrorBoundary: this.reset,
      };

      if (fallbackRender) {
        return fallbackRender(fallbackProps);
      }

      if (FallbackComponent) {
        return <FallbackComponent {...fallbackProps} />;
      }

      if (fallback) {
        return <>{fallback}</>;
      }

      return (
        <div>
          <h2>Something went wrong</h2>
          <p>{this.state.error.message}</p>
          <button type="button" onClick={this.reset}>
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
