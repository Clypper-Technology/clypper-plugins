import { useState, useEffect } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { useRules } from '../../hooks/useRules';
import { useRoles } from '../../hooks/useRoles';
import { useCategories } from '../../hooks/useCategories';
import ProductRulesTable from './ProductRulesTable';
import AddProductModal from './AddProductModal';
import RoleSelector from '../../components/RoleSelector';
import { Product } from '../../types';
import apiFetch from '@wordpress/api-fetch';

interface ProductsTabProps {
    roleFilter?: string;
}

const ProductsTab: React.FC<ProductsTabProps> = ({ roleFilter: roleFilterProp }) => {
    const [roleFilterState, setRoleFilterState] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const roleFilter = roleFilterProp || roleFilterState;
    const { roles, isLoading: rolesLoading } = useRoles();
    const { categories, isLoading: categoriesLoading } = useCategories();
    const {
        rules,
        isLoading: rulesLoading,
        createRule,
        updateRule,
        bulkUpdate,
        bulkDelete,
        refetch
    } = useRules(roleFilter);

    const [productsCache, setProductsCache] = useState<Map<number, Product>>(new Map());

    const productRules = rules.filter(rule =>
        rule.products && rule.products.length > 0
    );

    useEffect(() => {
        const fetchProducts = async () => {
            const allProductIds = new Set<number>();
            productRules.forEach(rule => {
                // rule.products is an array of ProductRule objects {id, name, rule, min_qty}
                rule.products?.forEach((prod: any) => allProductIds.add(prod.id));
            });

            const newCache = new Map(productsCache);
            const idsToFetch = Array.from(allProductIds).filter(id => !newCache.has(id));

            if (idsToFetch.length > 0) {
                try {
                    for (let i = 0; i < idsToFetch.length; i += 20) {
                        const batch = idsToFetch.slice(i, i + 20);
                        const wcProducts = await apiFetch<any[]>({
                            path: `/wc/v3/products?include=${batch.join(',')}`,
                        });

                        // Map WooCommerce products to our Product type
                        wcProducts.forEach(wcProduct => {
                            newCache.set(wcProduct.id, {
                                id: wcProduct.id,
                                name: wcProduct.name,
                                sku: wcProduct.sku,
                                price: wcProduct.price,
                                thumbnail: wcProduct.images?.[0]?.src || '',
                            });
                        });
                    }

                    setProductsCache(newCache);
                } catch (error) {
                    console.error('Failed to fetch products:', error);
                }
            }
        };

        if (productRules.length > 0) {
            fetchProducts();
        }
    }, [productRules.length]);

    const handleAddProduct = async (product: Product): Promise<void> => {
        if (!roleFilter) {
            throw new Error('Please select a role first');
        }

        // Find existing rule for this role, or create if doesn't exist
        const existingRule = rules.find(r => r.role_name === roleFilter);

        if (existingRule) {
            // Update existing rule by adding product to its products array
            const currentProducts = existingRule.products || [];
            const rows = [
                // Keep existing products (products are objects with id, name, rule, min_qty)
                ...currentProducts.map((prod: any) => ({
                    product_id: prod.id,
                    product_name: prod.name || '',
                    type: prod.rule?.type || 'percentage',
                    value: prod.rule?.value || '0',
                    min_qty: prod.min_qty || 1,
                })),
                // Add new product
                {
                    product_id: product.id,
                    product_name: product.name,
                    type: 'percentage',
                    value: '0',
                    min_qty: 1,
                }
            ];

            await apiFetch({
                path: `/rrb2b/v1/rules/${existingRule.id}/products`,
                method: 'PUT',
                data: { rows },
            });

            // Refetch rules to get updated data without page reload
            refetch();
        } else {
            // Create new rule if none exists for this role
            await createRule({
                role: roleFilter,
                rule_type: 'percentage',
                rule_value: '0',
                active: true,
                products: [product.id],
                productDetails: [{ id: product.id, name: product.name }],
            });
        }

        setProductsCache(prev => new Map(prev).set(product.id, product));
    };

    const handleAddFromCategory = async (categoryIds: number[], includeVariations: boolean): Promise<void> => {
        if (!roleFilter) {
            throw new Error('Please select a role first');
        }

        // Find existing rule for this role, or create if doesn't exist
        const existingRule = rules.find(r => r.role_name === roleFilter);

        if (!existingRule) {
            throw new Error('Please create a rule for this role first');
        }

        // Call the API to add products from category
        await apiFetch({
            path: `/rrb2b/v1/rules/${existingRule.id}/products/from-category`,
            method: 'POST',
            data: {
                category: categoryIds[0], // API expects single category for now
                variations: includeVariations,
            },
        });

        // Refetch to show new products without page reload
        refetch();
    };

    return (
        <div className="crp-products-tab">
            {!roleFilterProp && (
                <>
                    <div style={{ marginBottom: '20px' }}>
                        <h2>Product Pricing Rules</h2>
                        <p>
                            Configure role-based pricing rules for specific products.
                        </p>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <RoleSelector
                            value={roleFilter}
                            onChange={setRoleFilterState}
                            roles={roles}
                            label="Filter by Role"
                            disabled={rolesLoading}
                        />
                    </div>
                </>
            )}

            <div style={{ marginBottom: '20px' }}>
                <Button
                    variant="secondary"
                    onClick={() => setShowAddModal(true)}
                    disabled={!roleFilter && !roleFilterProp}
                >
                    + Add Product Rules
                </Button>
            </div>

            <AddProductModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onAddProduct={handleAddProduct}
                onAddFromCategory={handleAddFromCategory}
                categories={categories}
            />

            <ProductRulesTable
                rules={productRules}
                products={productsCache}
                isLoading={rulesLoading}
                roleFilter={roleFilter}
                onUpdate={updateRule}
                onBulkUpdate={bulkUpdate}
                onBulkDelete={bulkDelete}
                onAddProduct={handleAddProduct}
                onRefetch={refetch}
            />
        </div>
    );
};

export default ProductsTab;
