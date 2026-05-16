import { PricingRule } from "./pricingRule";

export interface ProductRule {
  id: number;
  name: string;
  rule: PricingRule;
  min_qty: number;
}
