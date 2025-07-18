import React from 'react';
import type { ErrorInfo, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error: string | null;
  errorInfo: ErrorInfo | null;
};

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.setState({
      error: error.message,
      errorInfo: info,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-4 border border-red-500 rounded">
          <h2 className='text-red-600'>Something went wrong.</h2>
          <p>{this.state.error}</p>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded'
            onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}>
            Reset
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
