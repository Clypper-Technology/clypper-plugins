import { ProductRule } from "@/types/productRule";

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
          <th>Role</th>
          <th>Discount</th>
        </tr>
      </thead>

      <tbody>
        {productRules?.map((rule) => (
          <tr key={rule.id}>
            <td>
            <img
                src={rule.image_url}
                alt=""
                style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 2 }}
              />
            </td>
            <td>{rule.name}</td>
            <td>{rule.min_qty}</td>
            <td>{rule.rule.type}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
