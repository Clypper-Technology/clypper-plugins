import { createRoot, createElement } from '@wordpress/element';
import RolesTab from './RolesTab';
import ErrorBoundary from '../../components/ErrorBoundary';

const init = (): void => {
    const rootElement = document.getElementById('crp-roles-root');

    if (rootElement) {
        const root = createRoot(rootElement);
        root.render(
            createElement(
                ErrorBoundary,
                null,
                createElement(RolesTab)
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
