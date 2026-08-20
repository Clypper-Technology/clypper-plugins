import { PricingRule } from "./pricingRule";

export interface ItemRule {
  id: number;
  name: string;
  rule: PricingRule;
  min_qty: number;
  image_url: string;
  price?: number;
}
