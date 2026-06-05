import { RoleRules } from "@/types/roleRules"
import { PanelBody } from "@wordpress/components"

interface CategoryRulesPanelProps {
  rule: RoleRules,
  onCategoryAdded: (rule: RoleRules) => Promise<void>
}

export const CategoryRulesPanel = (props: CategoryRulesPanelProps) => {
  return (
    <PanelBody title="Category Rules">
    </PanelBody>
  )
}
