import { Category } from "@/types/category"
import { PanelRow } from "@wordpress/components"

export interface AddCategoryRuleProps {
  onAdd: (category: Category) => void
}

export const AddCategoryRule = ({
  onAdd,
}: AddCategoryRuleProps) => {

  return(
    <PanelRow header="">
      
    </PanelRow>
  )
}
