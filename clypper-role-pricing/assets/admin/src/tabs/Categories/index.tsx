import { createRoot, createElement } from '@wordpress/element';
import CategoriesTab from './CategoriesTab';
import ErrorBoundary from '../../components/ErrorBoundary';
import '../../store/rules'; // Register the store

const init = (): void => {
    const rootElement = document.getElementById('crp-categories-root');

    if (rootElement) {
        const root = createRoot(rootElement);
        root.render(
            createElement(
                ErrorBoundary,
                null,
                createElement(CategoriesTab)
            )
        );
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
