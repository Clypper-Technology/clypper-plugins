import { RuleType } from "./ruleType";

export interface PricingRule {
  type: RuleType;
  value: string;
  quantity: string;
  quantity_type: RuleType;
}
