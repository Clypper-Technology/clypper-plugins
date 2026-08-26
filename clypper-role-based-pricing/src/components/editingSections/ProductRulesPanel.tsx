import { Badge, CollapsibleCard } from "@wordpress/ui"
import { Button } from "@wordpress/components";
import { useState } from "react";
import { RuleList } from "../controls/RuleList";
import { useFieldArray, useFormContext } from "react-hook-form";
import { RoleRules } from "@/types/roleRules";
import { Product } from "@/types/product";
import { createRuleFromProduct } from "@/factories/itemRuleFactory";
import { AddRule } from "./AddRule";
import { ProductService } from "@/services/productService";

interface ProductRulesPanelProps {
}

export const ProductRulesPanel = ({ 
}: ProductRulesPanelProps) => {
  const [addRule, setAddRule] = useState<boolean>(false);
  const { control } = useFormContext<RoleRules>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products'
  })

  const productAdded = (product: Product) => {
    append(createRuleFromProduct(product));
  }

  const search = async (search: string) => {
    return await ProductService.getProductsByName(search);
  }

  return (
    <CollapsibleCard.Root defaultOpen>
      <CollapsibleCard.Header>
        <div className="row">
          <h2>Product Rules</h2>
          <Badge intent="draft">
            {`${fields.length}`}
          </Badge>
        </div>
      </CollapsibleCard.Header>

      <CollapsibleCard.Content>
        <div className="col">
          <div className="row">
            <Button isDestructive={addRule} variant="primary" onClick={() => setAddRule(!addRule)}>{ addRule ? "Close" : "Add rule"}</Button>
          </div>
        
         { addRule && (
           <AddRule onAdd={productAdded} onSearch={search} ruleKey="products"/>
         )}

          <RuleList fields={fields} onRemove={remove} ruleKey="products"/>
        </div>
      </CollapsibleCard.Content>
    </CollapsibleCard.Root>
  )
}
