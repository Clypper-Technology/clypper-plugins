import { SelectControl } from '@wordpress/components';
import { Role } from '../types';

interface RoleSelectorProps {
    value: string;
    onChange: (value: string) => void;
    roles: Role[];
    label?: string;
    disabled?: boolean;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({
    value,
    onChange,
    roles,
    label = 'Select Role',
    disabled = false
}) => {
    const options = [
        { label: 'Select Role', value: '' },
        ...roles.map(role => ({ label: role.name, value: role.slug }))
    ];

    return (
        <SelectControl
            label={label}
            value={value}
            options={options}
            onChange={onChange}
            disabled={disabled}
        />
    );
};

export default RoleSelector;
