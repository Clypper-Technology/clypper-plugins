import { CategoryRule } from "./categoryRule";
import { PricingRule } from "./pricingRule";
import { ProductRule } from "./productRule";

export interface RoleRules {
  id: number;
  role_name: string;
  rule_active: 'on' | '';
  global_rule: PricingRule | null;
  category_rule: PricingRule | null;
  categories: number[];
  products: ProductRule[];
  single_categories: CategoryRule[];
}
