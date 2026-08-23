import { RuleService } from "@/services/ruleService";
import { RoleRules } from "@/types/roleRules";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Button, Icon, Spinner } from '@wordpress/components';
import { CategoryRulesPanel } from "../editingSections/CategoryRulesPanel";
import { ProductRulesPanel } from "../editingSections/ProductRulesPanel";
import { arrowLeft } from "@wordpress/icons";
import { FormProvider, useForm } from "react-hook-form";


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

      console.log(rule);
      setRule(rule);
      methods.reset(rule);

      setIsLoading(false);
    }

    load();
  }, [numericId])
  
  const onSubmit = async (rule: RoleRules) => {
      console.log(rule);
      await RuleService.updateRules(rule);
  }

  if (isLoading || !rule) {
    return <Spinner />
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
            <ProductRulesPanel />
            <CategoryRulesPanel />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
