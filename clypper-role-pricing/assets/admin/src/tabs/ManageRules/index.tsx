import { createRoot, createElement } from '@wordpress/element';
import ManageRulesTab from './ManageRulesTab';
import ErrorBoundary from '../../components/ErrorBoundary';

const init = (): void => {
    const rootElement = document.getElementById('rrb2b-rules-root');

    if (rootElement) {
        const root = createRoot(rootElement);
        root.render(
            createElement(
                ErrorBoundary,
                null,
                createElement(ManageRulesTab)
            )
        );
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
