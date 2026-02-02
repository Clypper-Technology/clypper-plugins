import { createRoot, createElement } from '@wordpress/element';
import ManageRolesTab from './ManageRolesTab';
import ErrorBoundary from '../../components/ErrorBoundary';

const init = (): void => {
    const rootElement = document.getElementById('rrb2b-roles-root');

    if (rootElement) {
        const root = createRoot(rootElement);
        root.render(
            createElement(
                ErrorBoundary,
                null,
                createElement(ManageRolesTab)
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
