import { RoleRules } from "@/types/roleRules"
import { CollapsibleCard } from "@wordpress/ui"

interface CategoryRulesPanelProps {
  rule: RoleRules,
  onCategoryAdded: (rule: RoleRules) => Promise<void>
}

export const CategoryRulesPanel = (props: CategoryRulesPanelProps) => {
  return (
    <CollapsibleCard.Root defaultOpen={false}>
      <CollapsibleCard.Header>
        <h2>Category Rules</h2>
        
      </CollapsibleCard.Header>

      <CollapsibleCard.Content>

      </CollapsibleCard.Content>
    </CollapsibleCard.Root>
  )
}
