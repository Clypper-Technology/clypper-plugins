import React from 'react';

// Mock common WordPress components
export const Button = ({ children, onClick, ...props }: any) => (
	<button onClick={onClick} {...props}>
		{children}
	</button>
);

export const TextControl = ({ label, value, onChange, ...props }: any) => (
	<div>
		<label>{label}</label>
		<input type="text" value={value} onChange={(e) => onChange(e.target.value)} {...props} />
	</div>
);

export const SelectControl = ({ label, value, options, onChange, ...props }: any) => (
	<div>
		<label>{label}</label>
		<select value={value} onChange={(e) => onChange(e.target.value)} {...props}>
			{options.map((opt: any) => (
				<option key={opt.value} value={opt.value}>
					{opt.label}
				</option>
			))}
		</select>
	</div>
);

export const CheckboxControl = ({ label, checked, onChange, ...props }: any) => (
	<div>
		<label>
			<input
				type="checkbox"
				checked={checked}
				onChange={(e) => onChange(e.target.checked)}
				{...props}
			/>
			{label}
		</label>
	</div>
);

export const Spinner = () => <div data-testid="spinner">Loading...</div>;

export const Notice = ({ children, status, ...props }: any) => (
	<div className={`notice notice-${status}`} {...props}>
		{children}
	</div>
);

export const Modal = ({ title, children, onRequestClose, ...props }: any) => (
	<div className="modal" {...props}>
		<div className="modal-header">
			<h2>{title}</h2>
			<button onClick={onRequestClose}>×</button>
		</div>
		<div className="modal-content">{children}</div>
	</div>
);

export const Panel = ({ children, ...props }: any) => <div className="panel" {...props}>{children}</div>;

export const PanelBody = ({ title, children, ...props }: any) => (
	<div className="panel-body" {...props}>
		<h3>{title}</h3>
		{children}
	</div>
);

export const PanelRow = ({ children, ...props }: any) => <div className="panel-row" {...props}>{children}</div>;

export const Placeholder = ({ children, ...props }: any) => (
	<div className="placeholder" {...props}>
		{children}
	</div>
);
