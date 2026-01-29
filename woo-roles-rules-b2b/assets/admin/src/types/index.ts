export interface Role {
    slug: string;
    name: string;
    capabilities?: Record<string, boolean>;
}

export interface Rule {
    id: number;
    role_name: string; // API returns role_name, not role
    rule_active: boolean; // API returns rule_active, not active
    global_rule?: {
        type: string;
        value: string;
    } | null;
    category_rule?: {
        type: string;
        value: string;
    } | null;
    categories?: number[];
    products?: any[]; // Array of ProductRule objects
    single_categories?: any[]; // Array of CategoryRule objects
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    parent?: number;
}

export interface Product {
    id: number;
    name: string;
    sku?: string;
    thumbnail?: string;
    price?: string;
}

export interface RRB2BData {
    restUrl: string;
    nonce: string;
    currentTab: string;
    translations: Record<string, string>;
}

declare global {
    interface Window {
        rrb2bData: RRB2BData;
        wp: {
            element: any;
            components: any;
            data: any;
            apiFetch: any;
            notices: any;
        };
    }
}
