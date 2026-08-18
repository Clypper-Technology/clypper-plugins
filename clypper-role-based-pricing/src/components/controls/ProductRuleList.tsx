import { ProductRule } from "@/types/productRule";
import { ProductRuleListItem } from "./listItems/ProductRuleListItem";

export interface ProductRuleListProps {
  productRules?: ProductRule[];
  onRuleEdited: (product: ProductRule) => void;
}

export const ProductRuleList = ({
  productRules,
  onRuleEdited,
}: ProductRuleListProps) => {
  return (
    <table className="wp-list-table widefat fixed striped">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Price</th>
          <th>Rule type</th>
          <th>Value</th>
          <th>Min quantity</th>
          <th>Reduction type</th>
          <th>Value</th>
        </tr>
      </thead>

      <tbody>
        {productRules?.map((rule) => (
          <ProductRuleListItem onRuleChanged={onRuleEdited} rule={rule} key={rule.id}/>
        ))}
      </tbody>
    </table>
  );
};
