import { Badge, CollapsibleCard } from "@wordpress/ui"
import { Button } from "@wordpress/components";
import { useState } from "react";
import { AddProductRule } from "./AddProductRule";
import { RuleList } from "../controls/RuleList";
import { useFieldArray, useFormContext } from "react-hook-form";
import { RoleRules } from "@/types/roleRules";
import { createProductRule } from "@/factories/productRuleFactory";
import { Product } from "@/types/product";

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

  const onProductAdded = (product: Product) => {
    append(createProductRule(product));
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
            <AddProductRule onAdd={onProductAdded} />
         )}

          <RuleList fields={fields} onRemove={remove} ruleKey="products"/>
        </div>
      </CollapsibleCard.Content>
    </CollapsibleCard.Root>
  )
}
