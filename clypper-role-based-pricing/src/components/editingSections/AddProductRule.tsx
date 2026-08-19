import { Product } from "@/types/product"
import { DisplayItem, ItemSearch } from "../controls/ItemSearch"
import { ProductService } from "@/services/productService"
import { useFormContext } from "react-hook-form"
import { RoleRules } from "@/types/roleRules"

interface AddProductRuleProps {
  onAdd: (rule: Product) => void
}

export const AddProductRule = ({
  onAdd
}: AddProductRuleProps) => {
  const { watch } = useFormContext<RoleRules>();
  const products = watch("products");

  const searchProducts = async (search: string): Promise<Product[]> => {
    return ProductService.getProductsByName(search);
  }

  const displayProduct = (product: Product): DisplayItem => {
    return { 
      label: product.name,
      value: String(product.id)
    };
  }

  return(
    <ItemSearch 
      onItemAdded={onAdd}
      searchItems={searchProducts} 
      displayItem={displayProduct}
      addedItems={products}/>
  )
}
