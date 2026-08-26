import { DisplayItem, ItemSearch } from "../controls/ItemSearch"
import { useFormContext } from "react-hook-form"
import { RoleRules } from "@/types/roleRules"
import { RuleKey } from "@/types/RuleKey"

interface AddRuleProps<T> {
  onAdd: (item: T) => void,
  onSearch: (search: string) => Promise<T[]>,
  ruleKey: RuleKey
}

interface AddRuleItem {
  name: string,
  id: number
}

export const AddRule = <T extends AddRuleItem>({
  onAdd,
  onSearch,
  ruleKey: key
}: AddRuleProps<T>) => {
  const { watch } = useFormContext<RoleRules>();
  const items = watch(key);

  const displayItem = (item: T): DisplayItem => {
    return { 
      label: item.name,
      value: String(item.id)
    };
  }

  return(
    <ItemSearch 
      onItemAdded={onAdd}
      searchItems={onSearch} 
      displayItem={displayItem}
      addedItems={items}/>
  )
}
