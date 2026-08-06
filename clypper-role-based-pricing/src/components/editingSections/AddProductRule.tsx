import { ProductRule } from "@/types/productRule"
import { ProductSearch } from "../controls/ProductSearch"
import { Product } from "@/types/product"
import { PricingRule } from "@/types/pricingRule"

export interface AddProductRuleProps {
  onAddProduct: (rule: ProductRule) => void
}

export const AddProductRule = (props: AddProductRuleProps) => {
  function addProduct(product: Product) {
    
    const rule: PricingRule = {
      type: '',
      value: '0',
      quantity: '0',
      quantity_type: '' 
    };

    const productRule: ProductRule = {
      id: product.id,
      name: product.name,
      rule: rule,
      min_qty: 0
    }

    props.onAddProduct(productRule);
  }

  return(
    <ProductSearch onProductAdded={addProduct} />
  )
}
