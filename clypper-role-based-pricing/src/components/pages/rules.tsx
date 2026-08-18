import { RuleService } from "@/services/ruleService";
import { RoleRules } from "@/types/roleRules";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Button, Icon, Spinner } from '@wordpress/components';
import { CategoryRulesPanel } from "../editingSections/CategoryRulesPanel";
import { ProductRulesPanel } from "../editingSections/ProductRulesPanel";
import { arrowLeft } from "@wordpress/icons";
import { Product } from "@/types/product";
import { createProductRule } from "@/factories/productRuleFactory";


export function Rules() {
  const { id } = useParams<{ id: string }>();
  const  numericId = id ? parseInt(id) : 0;
  const [isLoading, setIsLoading] = useState(true);
  const [rule, setRule] = useState<RoleRules>();
  const navigate = useNavigate();

  useEffect(() => {
    const getRule = async () => {
      setIsLoading(true);

      const rule: RoleRules = await RuleService.getRule(numericId);

      setRule(rule);
      setIsLoading(false);
    }

    getRule();
  }, [numericId])

  const updateRule = async (rule?: RoleRules) => {
    if(rule) {
    }

    setRule(rule);
  }

  const onProductAdded = (product: Product) => {
    const productRule = createProductRule(product);

    setRule((current) => {
      if(!current) {
        return current;
      }

      return {
        ...current,
        products: [
          ...current?.products,
          productRule
        ]
      }
    });
  }

  return(
    <div>
      <div className="row">
        <Icon icon={arrowLeft} onClick={(() => navigate(-1))} style={{ cursor: "pointer" }}/>
        <h1>{rule?.role_name}</h1>
      </div>
      { isLoading ? (
        <Spinner />
      ) : (
      <div className="roles-list">
        <Button onClick={(() => updateRule(rule))}></Button>
        <ProductRulesPanel rule={rule} onProductAdded={onProductAdded}/>
        <CategoryRulesPanel rule={rule} onCategoryAdded={updateRule}/>
      </div>
      )}
    </div>
  );
}
