import { RoleRules } from "@/types/roleRules"
import { PanelBody } from "@wordpress/components"

interface ProductRulesPanelProps {
  rule: RoleRules,
  onProductAdded: (rule: RoleRules) => Promise<void>
}

export const ProductRulesPanel = (props: ProductRulesPanelProps) => {
  return (
    <PanelBody title="Product Rules">
    </PanelBody>
  )
}
