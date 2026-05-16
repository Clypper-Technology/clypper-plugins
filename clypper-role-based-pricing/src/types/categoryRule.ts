
export interface CategoryRule {
  id: number;
  slug: string;
  name: string;
  rule: PricingRule;
  min_qty: number;
}
