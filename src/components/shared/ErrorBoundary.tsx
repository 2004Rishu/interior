import React, { ReactNode, ErrorInfo } from 'react';
import { useRouteError } from 'react-router-dom';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

// Global Error Boundary (React Class Component)
interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class GlobalErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-sand-50 px-4">
          <div className="bg-white p-8 max-w-md w-full shadow-sm text-center">
            <div className="flex justify-center mb-6 text-red-600">
              <AlertTriangle size={48} strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-serif text-charcoal-900 mb-2">Something went wrong</h2>
            <p className="text-sand-600 mb-8">{this.state.error?.message || 'An unexpected error occurred.'}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center bg-charcoal-900 text-white px-6 py-3 font-medium hover:bg-charcoal-800 transition-colors w-full"
            >
              <RefreshCcw size={18} className="mr-2" /> Reload Page
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}

// Route-Level Error Boundary
export function RouteErrorBoundary() {
  const error = useRouteError() as any;

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="bg-red-50 p-4 rounded-full mb-6">
        <AlertTriangle size={32} className="text-red-600" />
      </div>
      <h2 className="text-xl font-serif text-charcoal-900 mb-2">Failed to load this section</h2>
      <p className="text-sand-600 max-w-sm mb-6">
        {error?.message || error?.statusText || 'An unexpected error occurred while loading this route.'}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="text-charcoal-900 font-medium underline hover:text-sand-600 transition-colors"
      >
        Try refreshing
      </button>
    </div>
  );
}
