import domReady       from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import { App }        from './components/App';
import               './index.scss';

domReady( () => {
    const root = document.getElementById( 'clypper-rbp-app' );
    if ( ! root ) return;
    createRoot( root ).render( <App /> );
} );
