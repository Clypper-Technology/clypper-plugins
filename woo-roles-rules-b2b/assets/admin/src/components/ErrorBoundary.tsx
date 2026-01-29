import { Component, ReactNode } from '@wordpress/element';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error('React Error:', error, errorInfo);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return (
                <div className="notice notice-error" style={{ padding: '20px', margin: '20px 0' }}>
                    <h3>Something went wrong</h3>
                    <p>The admin interface encountered an error. Please refresh the page to try again.</p>
                    {this.state.error && (
                        <details style={{ marginTop: '10px' }}>
                            <summary>Error details</summary>
                            <pre style={{ marginTop: '10px', padding: '10px', background: '#f5f5f5', overflow: 'auto' }}>
                                {this.state.error.toString()}
                            </pre>
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
