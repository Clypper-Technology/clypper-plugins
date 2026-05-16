import { useState, useEffect } from '@wordpress/element';
import { Panel, PanelBody, PanelRow }             from '@wordpress/components';
import { RuleService } from '../services/ruleService';
import { RoleService } from '../services/roleService';
import { Role } from '../types/role';
import { RoleRules } from '../types/roleRules';
type TabName = 'rules' | 'categories' | 'products';

const TABS = [
    { name: 'rules'       as TabName, title: 'General Rules' },
    { name: 'categories'  as TabName, title: 'Category Rules' },
    { name: 'products'    as TabName, title: 'Product Rules'},
];

function getTabFromUrl(): TabName {
    const tab = new URLSearchParams( window.location.search ).get( 'tab' );
    return TABS.some( t => t.name === tab ) ? tab as TabName : 'rules';
}

export function App() {
    const [ tab, setTab ] = useState<TabName>( getTabFromUrl );
    const [ rules, setRules ] = useState<RoleRules[]>([]);
    const [ roles, setRoles ] = useState<Role[]>([]);
    
    useEffect(() => {
      loadRules();
      loadRoles();
    }, []);

    const loadRules = async () => {
      const rules = await RuleService.getRules();
      setRules(rules);
    };

    const loadRoles = async() => {
      const roles = await RoleService.getRoles();
      setRoles(roles);
    }

    function toRuleRoleName(roleSlug: string): string {
      return roleSlug === 'customer' ? 'guest' : roleSlug;
    }

    return (
      <Panel>
        {roles.map((role) => {
          const ruleRoleName = toRuleRoleName(role.slug);

          const roleRule = rules.find(
            (rule) => rule.role_name === ruleRoleName
          );

          return (
            <PanelBody
              key={role.slug}
              title={role.slug === 'customer' ? 'Customer / Guest' : role.name}
              initialOpen={false}
            >
              <PanelRow>
                <strong>Global Rule</strong>
              </PanelRow>

              <PanelRow>
                {roleRule?.global_rule?.value
                  ? `${roleRule.global_rule.type}: ${roleRule.global_rule.value}`
                  : 'No global rule yet'}
              </PanelRow>

              <PanelRow>
                <strong>Product Rules</strong>
              </PanelRow>

              {roleRule?.products?.length ? (
                roleRule.products.map((product) => (
                  <PanelRow key={product.id}>
                    {product.name} — {product.rule.type}: {product.rule.value}
                  </PanelRow>
                ))
              ) : (
                <PanelRow>No product rules yet</PanelRow>
              )}
            </PanelBody>
          );
        })}
      </Panel>
    );
}
