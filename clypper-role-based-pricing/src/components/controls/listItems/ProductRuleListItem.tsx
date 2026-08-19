import { ProductRule } from "@/types/productRule";


interface ProductRuleListItemProps {
  rule: ProductRule;
  onRuleChanged: (productRule: ProductRule) => void;
}

export const ProductRuleListItem = ({
  rule,
  onRuleChanged,
}: ProductRuleListItemProps) => {

  return (
    <tr>
      <td>
        <img
          src={rule.image_url}
          alt=""
          style={{
            width: 50,
            height: 50,
            objectFit: "cover",
            borderRadius: 2,
          }}
        />
      </td>
      <td>{rule.name}</td>
      <td>{rule.price}</td>
      <td>{rule.rule.type}</td>
      <td>{rule.rule.value}</td>
      <td>{rule.min_qty}</td>
      <td>{rule.rule.quantity_type}</td>
      <td>{rule.rule.value}</td>
    </tr>
  );
};
