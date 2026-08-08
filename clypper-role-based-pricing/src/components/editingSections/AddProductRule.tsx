import { ProductRule } from "@/types/productRule"
import { Product } from "@/types/product"
import { PricingRule } from "@/types/pricingRule"
import { DisplayItem, ItemSearch } from "../controls/ItemSearch"
import { ProductService } from "@/services/productService"

export interface AddProductRuleProps {
  onAddProduct: (rule: ProductRule) => void,
  products: Product[]
}

export const AddProductRule = ({
  onAddProduct,
  products
}: AddProductRuleProps) => {
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

    onAddProduct(productRule);
  }

  const searchProducts = async (search: string): Promise<Product[]> => {
    return await ProductService.getProductsByName(search);
  }

  const displayProduct = (product: Product): DisplayItem => {
    return { 
      label: product.name,
      value: String(product.id)
    };
  }

  return(
    <ItemSearch onItemAdded={addProduct} searchItems={searchProducts} displayItem={displayProduct} addedItems={products}/>
  )
}
