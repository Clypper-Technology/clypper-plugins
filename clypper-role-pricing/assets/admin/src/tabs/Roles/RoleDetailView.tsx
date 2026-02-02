import { createElement, useState, useEffect, useMemo } from '@wordpress/element';
import { Button, Card, CardBody, Panel, PanelBody } from '@wordpress/components';
import { Role, Product } from '../../types';
import { useRules } from '../../hooks/useRules';
import { useCategories } from '../../hooks/useCategories';
import RulesTable from '../GeneralRules/RulesTable';
import AddRuleForm from '../GeneralRules/AddRuleForm';
import CategoryRulesTable from '../Categories/CategoryRulesTable';
import ProductRulesTable from '../Products/ProductRulesTable';
import apiFetch from '@wordpress/api-fetch';

interface RoleDetailViewProps {
    role: Role;
    onBack: () => void;
}

const RoleDetailView: React.FC<RoleDetailViewProps> = ({ role, onBack }) => {
    const {
        rules,
        isLoading,
        createRule,
        updateRule,
        deleteRule,
        toggleActive,
        bulkUpdate,
        bulkDelete,
    } = useRules(role.slug);

    const { categories, isLoading: categoriesLoading } = useCategories();
    const [productsCache, setProductsCache] = useState<Map<number, Product>>(new Map());

    // Filter rules by type
    const generalRules = rules.filter(rule =>
        (!rule.single_categories || rule.single_categories.length === 0) &&
        (!rule.products || rule.products.length === 0)
    );

    const categoryRules = rules.filter(rule =>
        rule.single_categories && rule.single_categories.length > 0
    );

    const productRules = rules.filter(rule =>
        rule.products && rule.products.length > 0
    );

    // Fetch product details for product rules
    useEffect(() => {
        const fetchProducts = async () => {
            const allProductIds = new Set<number>();
            productRules.forEach(rule => {
                rule.products?.forEach(id => allProductIds.add(id));
            });

            const newCache = new Map(productsCache);
            const idsToFetch = Array.from(allProductIds).filter(id => !newCache.has(id));

            if (idsToFetch.length > 0) {
                try {
                    const products = await apiFetch<Product[]>({
                        path: `/wc/v3/products?include=${idsToFetch.join(',')}`,
                    });

                    products.forEach(product => {
                        newCache.set(product.id, product);
                    });

                    setProductsCache(newCache);
                } catch (error) {
                    console.error('Failed to fetch products:', error);
                }
            }
        };

        if (productRules.length > 0) {
            fetchProducts();
        }
    }, [productRules]);

    const productsArray = useMemo(() => Array.from(productsCache.values()), [productsCache]);

    return (
        <div className="crp-role-detail-view">
            {/* Breadcrumb */}
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Button
                    variant="link"
                    onClick={onBack}
                    style={{ padding: 0, textDecoration: 'none', fontSize: '14px' }}
                >
                    ← Back to Roles
                </Button>
                <span style={{ color: '#999' }}>/</span>
                <h2 style={{ margin: 0, fontSize: '23px', fontWeight: 400 }}>
                    {role.name}
                </h2>
            </div>

            {/* Role Info Card */}
            <Card style={{ marginBottom: '20px' }}>
                <CardBody>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3 style={{ margin: '0 0 10px 0' }}>{role.name}</h3>
                            <div style={{ color: '#666', fontSize: '14px' }}>
                                <span><strong>Slug:</strong> <code>{role.slug}</code></span>
                                <span style={{ marginLeft: '20px' }}>
                                    <strong>Users:</strong> {role.user_count ?? 0}
                                </span>
                                <span style={{ marginLeft: '20px' }}>
                                    <strong>Total Rules:</strong> {rules.length}
                                </span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Button
                                href="/wp-admin/users.php"
                                variant="secondary"
                            >
                                Manage Users
                            </Button>
                            <Button
                                href={`/wp-admin/admin.php?page=wc-settings&tab=rrb2b`}
                                variant="secondary"
                            >
                                Settings
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Rules Sections */}
            <div>
                <h3>Pricing Rules for {role.name}</h3>
                <p style={{ marginBottom: '20px', color: '#666' }}>
                    Manage all pricing rules for this role. Rules are applied in priority order: <strong>Product-Specific → Category-Specific → General</strong>.
                </p>

                <Panel>
                    {/* General Pricing Rules */}
                    <PanelBody
                        title={`General Pricing Rules (${generalRules.length})`}
                        initialOpen={true}
                    >
                        <div style={{ marginBottom: '15px', padding: '12px', backgroundColor: '#f0f6fc', borderLeft: '4px solid #0073aa' }}>
                            <strong>General Rules:</strong> Apply discounts or markups to all products for this role globally.
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <AddRuleForm
                                roles={[role]}
                                onCreate={createRule}
                            />
                        </div>

                        {isLoading ? (
                            <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                                Loading rules...
                            </div>
                        ) : generalRules.length === 0 ? (
                            <div style={{ padding: '20px', textAlign: 'center', color: '#999', fontStyle: 'italic', backgroundColor: '#f9f9f9', border: '1px dashed #ddd', borderRadius: '4px' }}>
                                No general rules yet. Use the form above to create your first rule for this role.
                            </div>
                        ) : (
                            <RulesTable
                                rules={generalRules}
                                onUpdate={updateRule}
                                onDelete={deleteRule}
                                onToggleActive={toggleActive}
                            />
                        )}
                    </PanelBody>

                    {/* Category-Specific Rules */}
                    <PanelBody
                        title={`Category-Specific Rules (${categoryRules.length})`}
                        initialOpen={false}
                    >
                        <div style={{ marginBottom: '15px', padding: '12px', backgroundColor: '#fff8e1', borderLeft: '4px solid #ff9800' }}>
                            <strong>Category Rules:</strong> Set different pricing for specific product categories (overrides general rules).
                        </div>

                        {categoriesLoading ? (
                            <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                                Loading categories...
                            </div>
                        ) : categoryRules.length === 0 ? (
                            <div style={{ padding: '20px', textAlign: 'center', color: '#999', fontStyle: 'italic', backgroundColor: '#f9f9f9', border: '1px dashed #ddd', borderRadius: '4px' }}>
                                No category-specific rules yet. Category rules allow you to set different pricing for specific product categories.
                            </div>
                        ) : (
                            <CategoryRulesTable
                                rules={categoryRules}
                                categories={categories}
                                onUpdate={updateRule}
                                onBulkUpdate={bulkUpdate}
                                onBulkDelete={bulkDelete}
                            />
                        )}
                    </PanelBody>

                    {/* Product-Specific Rules */}
                    <PanelBody
                        title={`Product-Specific Rules (${productRules.length})`}
                        initialOpen={false}
                    >
                        <div style={{ marginBottom: '15px', padding: '12px', backgroundColor: '#e8f5e9', borderLeft: '4px solid #4caf50' }}>
                            <strong>Product Rules:</strong> Override pricing for individual products (highest priority, overrides all other rules).
                        </div>

                        {productRules.length === 0 ? (
                            <div style={{ padding: '20px', textAlign: 'center', color: '#999', fontStyle: 'italic', backgroundColor: '#f9f9f9', border: '1px dashed #ddd', borderRadius: '4px' }}>
                                No product-specific rules yet. Product rules let you set custom pricing for individual products.
                            </div>
                        ) : (
                            <ProductRulesTable
                                rules={productRules}
                                products={productsArray}
                                onUpdate={updateRule}
                                onBulkUpdate={bulkUpdate}
                                onBulkDelete={bulkDelete}
                            />
                        )}
                    </PanelBody>
                </Panel>
            </div>
        </div>
    );
};

export default RoleDetailView;
