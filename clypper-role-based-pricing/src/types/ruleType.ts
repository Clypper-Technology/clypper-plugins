export type RuleType =
  | "percent"
  | "percent_add"
  | "fixed"
  | "fixed_add"
  | "fixed_set"
  | "";

export const ruleTypeFormValues: {
  label: string;
  value: RuleType;
}[] = [
  { label: "Percent", value: "percent" },
  { label: "Percent add", value: "percent_add" },
  { label: "Fixed", value: "fixed" },
  { label: "Fixed add", value: "fixed_add" },
  { label: "Fixed set", value: "fixed_set" },
];
