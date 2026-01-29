import { createRoot, createElement } from '@wordpress/element';
import ProductsTab from './ProductsTab';
import ErrorBoundary from '../../components/ErrorBoundary';
import '../../store/rules'; // Register the store

const init = (): void => {
    const rootElement = document.getElementById('crp-products-root');

    if (rootElement) {
        const root = createRoot(rootElement);
        root.render(
            createElement(
                ErrorBoundary,
                null,
                createElement(ProductsTab)
            )
        );
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
