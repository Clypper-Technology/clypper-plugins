import { RuleService } from "@/services/ruleService";
import { RoleRules } from "@/types/roleRules";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from '@wordpress/components';


export function Rules() {
  const { id } = useParams<{ id: string }>();
  const  numericId = id ? parseInt(id) : 0;
  const [isLoading, setIsLoading] = useState(false);
  const [rule, setRule] = useState<RoleRule>();

  useEffect(() => {
    const getRule = async () => {
      setIsLoading(true);
      const rule: RoleRules = await RuleService.getRule(numericId);

      setRule(rule);
      setIsLoading(false);
    }

    getRule();
  }, [])

  return(
    <div>
      <div>
        <h1>Rules</h1>
      </div>
      { isLoading ? (
        <Spinner />
      ) : (
        <></>
      )}
    </div>
  );
}
