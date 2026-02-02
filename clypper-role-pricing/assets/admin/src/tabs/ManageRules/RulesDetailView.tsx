import { TabPanel, Button } from '@wordpress/components';
import type { Role } from '../../types';
import GeneralRulesTab from '../GeneralRules/GeneralRulesTab';
import CategoriesTab from '../Categories/CategoriesTab';
import ProductsTab from '../Products/ProductsTab';

interface RulesDetailViewProps {
    role: Role;
    onBack: () => void;
}

const RulesDetailView: React.FC<RulesDetailViewProps> = ({ role, onBack }) => {
    const tabs = [
        {
            name: 'general',
            title: 'General Rules',
            className: 'tab-general-rules',
        },
        {
            name: 'categories',
            title: 'Categories',
            className: 'tab-categories',
        },
        {
            name: 'products',
            title: 'Products',
            className: 'tab-products',
        },
    ];

    return (
        <div className="crp-rules-detail-view" style={{ marginTop: '20px' }}>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Button
                    variant="secondary"
                    onClick={onBack}
                    icon="arrow-left-alt2"
                >
                    Back to Roles
                </Button>
                <div>
                    <h2 style={{ margin: 0 }}>Pricing Rules for: {role.name}</h2>
                    <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '13px' }}>
                        Role: {role.slug}
                    </p>
                </div>
            </div>

            <TabPanel
                className="crp-rules-tabs"
                activeClass="is-active"
                tabs={tabs}
            >
                {(tab) => {
                    switch (tab.name) {
                        case 'general':
                            return <GeneralRulesTab roleFilter={role.slug} />;
                        case 'categories':
                            return <CategoriesTab roleFilter={role.slug} />;
                        case 'products':
                            return <ProductsTab roleFilter={role.slug} />;
                        default:
                            return null;
                    }
                }}
            </TabPanel>
        </div>
    );
};

export default RulesDetailView;
