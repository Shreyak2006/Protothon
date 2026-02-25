import React, { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--destructive)/0.1)] flex items-center justify-center mb-4">
                        <AlertTriangle className="w-8 h-8 text-[hsl(var(--destructive))]" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] max-w-md mb-6">
                        An unexpected error occurred. This has been logged and our team will investigate.
                    </p>
                    <Button onClick={this.handleRetry} variant="outline">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Try again
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}
