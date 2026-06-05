import { RuleService } from "@/services/ruleService";
import { RoleRules } from "@/types/roleRules";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Panel, Spinner } from '@wordpress/components';
import { ProductRulesPanel } from "../editingSections/ProductRulesPanel";
import { CategoryRulesPanel } from "../editingSections/CategoryRulesPanel";


export function Rules() {
  const { id } = useParams<{ id: string }>();
  const  numericId = id ? parseInt(id) : 0;
  const [isLoading, setIsLoading] = useState(false);
  const [rule, setRule] = useState<RoleRules>();

  useEffect(() => {
    const getRule = async () => {
      setIsLoading(true);
      const rule: RoleRules = await RuleService.getRule(numericId);

      setRule(rule);
      setIsLoading(false);
    }

    getRule();
  }, [numericId])

  const updateRule = async (rule: RoleRules) => {

  }

  return(
    <div>
      <div>
        <h1>Rules</h1>
      </div>
      { isLoading ? (
        <Spinner />
      ) : (
      <div className="roles-list">
        <Panel>
          <ProductRulesPanel rule={rule} onProductAdded={updateRule}/>
          <CategoryRulesPanel rule={rule} onCategoryAdded={updateRule}/>
        </Panel>
      </div>
      )}
    </div>
  );
}
