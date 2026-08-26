import { RuleService } from "@/services/ruleService";
import { RoleRules } from "@/types/roleRules";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Button, Icon, Spinner } from '@wordpress/components';
import { arrowLeft } from "@wordpress/icons";
import { FormProvider, useForm } from "react-hook-form";
import { RulesPanel } from "../editingSections/RulesPanel";
import { ProductService } from "@/services/productService";
import { createRuleFromCategory, createRuleFromProduct } from "@/factories/itemRuleFactory";
import { CategoryService } from "@/services/categoryService";


export function Rules() {
  const { id } = useParams<{ id: string }>();
  const  numericId = id ? parseInt(id) : 0;
  const [rule, setRule] = useState<RoleRules>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const methods = useForm<RoleRules>();

  useEffect(() => {
    const load = async () => {
      const rule: RoleRules = await RuleService.getRule(numericId);

      setRule(rule);
      methods.reset(rule);

      setIsLoading(false);
    }

    load();
  }, [numericId])
  
  const onSubmit = async (rule: RoleRules) => {
      await RuleService.updateRules(rule);
  }

  if (isLoading || !rule) {
    return <Spinner />
  }

  const searchProducts = async (search: string) => {
    return ProductService.getProductsByName(search);
  }

  const searchCategories = async (search: string) => {
    return CategoryService.getCategoriesByName(search);
  }
  
  return(
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="row">
            <Icon icon={arrowLeft} onClick={(() => navigate(-1))} style={{ cursor: "pointer" }}/>
            <h1>{rule?.role_name}</h1>
          </div>
          <div className="roles-list">
            <Button type="submit">Save</Button>
            <RulesPanel 
              title="Product Rules"
              createRule={(product) => createRuleFromProduct(product)}
              onSearch={searchProducts}
              ruleKey="products" />
            <RulesPanel
              title="Category Rules"
              createRule={(category) => createRuleFromCategory(category)}
              onSearch={searchCategories}
              ruleKey="single_categories" />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
