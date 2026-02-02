import { useState, useEffect } from '@wordpress/element';
import { TextControl, SelectControl, Button, Card, CardBody } from '@wordpress/components';
import { Role } from '../../types';

interface RoleCreateFormProps {
    onCreate: (roleData: Partial<Role>) => Promise<Role>;
    allRoles?: Role[];
    cloneFrom?: string; // Slug of role to clone from
}

const RoleCreateForm: React.FC<RoleCreateFormProps> = ({ onCreate, allRoles = [], cloneFrom }) => {
    const [roleName, setRoleName] = useState<string>('');
    const [roleSlug, setRoleSlug] = useState<string>('');
    const [baseCap, setBaseCap] = useState<string>(cloneFrom || 'customer');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Update baseCap when cloneFrom changes
    useEffect(() => {
        if (cloneFrom) {
            setBaseCap(cloneFrom);
            const roleToClone = allRoles.find(r => r.slug === cloneFrom);
            if (roleToClone) {
                setRoleName(`${roleToClone.name} (Copy)`);
                setRoleSlug(generateSlug(`${roleToClone.name}_copy`));
            }
        }
    }, [cloneFrom, allRoles]);

    const handleNameChange = (value: string): void => {
        setRoleName(value);
        // Auto-generate slug from name
        if (!roleSlug || roleSlug === generateSlug(roleName)) {
            setRoleSlug(generateSlug(value));
        }
    };

    const generateSlug = (name: string): string => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '_')
            .replace(/^_+|_+$/g, '');
    };

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        if (!roleName.trim() || !roleSlug.trim()) {
            return;
        }

        setIsSubmitting(true);
        try {
            await onCreate({
                name: roleName,
                slug: roleSlug,
                baseCap: baseCap,
            });
            // Reset form
            setRoleName('');
            setRoleSlug('');
            setBaseCap('customer');
        } catch (error) {
            console.error('Error creating role:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Build options: WordPress/WooCommerce defaults + custom roles
    const builtInRoles = [
        'administrator',
        'editor',
        'author',
        'contributor',
        'subscriber',
        'customer',
        'shop_manager'
    ];

    const baseCapOptions = [
        { label: '--- WordPress & WooCommerce Defaults ---', value: '', disabled: true },
        { label: 'Customer (WooCommerce)', value: 'customer' },
        { label: 'Shop Manager (WooCommerce)', value: 'shop_manager' },
        { label: 'Subscriber', value: 'subscriber' },
        { label: 'Contributor', value: 'contributor' },
        { label: 'Author', value: 'author' },
        { label: 'Editor', value: 'editor' },
    ];

    // Filter out built-in roles to show only actual custom roles
    const customRoles = allRoles.filter(role => !builtInRoles.includes(role.slug));

    // Add custom roles if any exist
    if (customRoles.length > 0) {
        baseCapOptions.push({ label: '--- Custom Roles ---', value: '', disabled: true });
        customRoles.forEach(role => {
            baseCapOptions.push({
                label: role.name,
                value: role.slug,
                disabled: false,
            });
        });
    }

    return (
        <Card>
            <CardBody>
                <h3>{cloneFrom ? `Clone Role` : 'Create New Role'}</h3>
                <form onSubmit={handleSubmit}>
                    <TextControl
                        label="Role Name"
                        value={roleName}
                        onChange={handleNameChange}
                        placeholder="e.g. Wholesale Customer"
                        required
                    />
                    <TextControl
                        label="Role Slug"
                        value={roleSlug}
                        onChange={setRoleSlug}
                        placeholder="e.g. wholesale_customer"
                        help="Used internally. Only lowercase letters, numbers, and underscores."
                        required
                    />
                    <SelectControl
                        label="Base Capabilities (Clone From)"
                        value={baseCap}
                        onChange={setBaseCap}
                        options={baseCapOptions}
                        help="The new role will inherit all capabilities from this role."
                    />
                    <Button
                        variant="primary"
                        type="submit"
                        isBusy={isSubmitting}
                        disabled={isSubmitting || !roleName.trim() || !roleSlug.trim()}
                    >
                        {cloneFrom ? 'Create Cloned Role' : 'Create Role'}
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
};

export default RoleCreateForm;
