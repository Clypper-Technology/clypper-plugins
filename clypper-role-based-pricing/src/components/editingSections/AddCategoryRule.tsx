import { CategoryService } from "@/services/categoryService";
import { Category } from "@/types/category"
import { DisplayItem, ItemSearch } from "../controls/ItemSearch"
import { RoleRules } from "@/types/roleRules"
import { useFormContext } from "react-hook-form"

export interface AddCategoryRuleProps {
  onAdd: (category: Category) => void
}

export const AddCategoryRule = ({
  onAdd,
}: AddCategoryRuleProps) => {
  const { watch } = useFormContext<RoleRules>();
  const products = watch("single_categories");

  const searchCategories = async (search: string): Promise<Category[]> => {
    return CategoryService.getCategoriesByName(search);
  }

  const displayProduct = (category: Category): DisplayItem => {
    return { 
      label: category.name,
      value: String(category.id)
    };
  }

  return(
    <ItemSearch 
      onItemAdded={onAdd}
      searchItems={searchCategories} 
      displayItem={displayProduct}
      addedItems={products}/>
  )
}
