import React, { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '../ui/Button';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Log to error reporting service in production
        console.error('[ErrorBoundary] Caught error:', error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    handleGoHome = () => {
        this.setState({ hasError: false, error: null });
        window.location.href = '/dashboard';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div role="alert" className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--destructive)/0.1)] flex items-center justify-center mb-4">
                        <AlertTriangle className="w-8 h-8 text-[hsl(var(--destructive))]" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] max-w-md mb-2">
                        An unexpected error occurred. Please try again or return to the dashboard.
                    </p>
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                        <details className="mb-4 max-w-md text-left">
                            <summary className="text-xs text-[hsl(var(--muted-foreground))] cursor-pointer hover:text-[hsl(var(--foreground))]">
                                Error details
                            </summary>
                            <pre className="mt-2 p-3 rounded-lg bg-[hsl(var(--secondary))] text-xs overflow-auto max-h-32 text-[hsl(var(--destructive))]">
                                {this.state.error.message}
                            </pre>
                        </details>
                    )}
                    <div className="flex gap-3">
                        <Button onClick={this.handleRetry} variant="outline">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Try Again
                        </Button>
                        <Button onClick={this.handleGoHome}>
                            <Home className="w-4 h-4 mr-2" />
                            Return to Dashboard
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
