import { CategoryRule } from "@/types/categoryRule"
import { PanelRow } from "@wordpress/components"

export interface AddCategoryRuleProps {
  OnAddProduct: (rule: CategoryRule) => Promise<void>
}

export const AddCategoryRule = (props: AddCategoryRuleProps) => {

  return(
    <PanelRow header="">
      
    </PanelRow>
  )
}
