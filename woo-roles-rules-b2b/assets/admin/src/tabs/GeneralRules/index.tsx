import { createRoot, createElement } from '@wordpress/element';
import GeneralRulesTab from './GeneralRulesTab';
import ErrorBoundary from '../../components/ErrorBoundary';
import '../../store/rules'; // Register the store

const init = (): void => {
    const rootElement = document.getElementById('crp-rules-root');

    if (rootElement) {
        const root = createRoot(rootElement);
        root.render(
            createElement(
                ErrorBoundary,
                null,
                createElement(GeneralRulesTab)
            )
        );
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
