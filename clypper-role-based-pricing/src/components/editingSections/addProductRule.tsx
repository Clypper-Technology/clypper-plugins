import { ProductRule } from "@/types/productRule"
import { PanelRow } from "@wordpress/components"

export interface AddProductRuleProps {
  OnAddProduct: (rule: ProductRule) => Promise<void>
}

export const AddProductRule = (props: AddProductRuleProps) => {

  return(
    <PanelRow header="">
      
    </PanelRow>
  )
}
