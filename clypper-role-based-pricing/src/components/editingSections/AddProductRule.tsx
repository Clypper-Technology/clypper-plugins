import { Product } from "@/types/product"
import { DisplayItem, ItemSearch } from "../controls/ItemSearch"
import { ProductService } from "@/services/productService"

export interface AddProductRuleProps {
  onAddProduct: (rule: Product) => void,
  products: []
}

export const AddProductRule = ({
  onAddProduct,
  products
}: AddProductRuleProps) => {
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
    <ItemSearch onItemAdded={onAddProduct} searchItems={searchProducts} displayItem={displayProduct} addedItems={products}/>
  )
}
