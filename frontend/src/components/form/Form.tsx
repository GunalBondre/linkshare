import React, { useState, ChangeEvent, FormEvent } from 'react';
import './form.scss';

export interface FieldConfig {
	name: string;
	label: string;
	type: string;
	placeholder: string;
	icon: React.ReactNode;
	width?: string;
	// Add more attributes like placeholder, required, etc., as needed
}

interface Props {
	fields: FieldConfig[];
	onSubmit: (formData: { [key: string]: string }) => void;
}

const Form: React.FC<Props> = ({ fields, onSubmit }) => {
	const [formValues, setFormValues] = useState<{ [key: string]: string }>({});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onSubmit(formValues);
	};

	return (
		<form onSubmit={handleSubmit}>
			{fields.map((field) => (
				<div key={field.name}>
					<div className='form__group'>
						<label htmlFor={field.name}>{field.label}</label>
						<div className='iconwrapper'>{field.icon}</div>
						<input
							type={field.type}
							name={field.name}
							value={formValues[field.name] || ''}
							onChange={handleChange}
							placeholder={field.placeholder}
							style={{ width: field.width }}
							// You can add other input attributes like placeholder, required, etc.
						/>
					</div>
				</div>
			))}
		</form>
	);
};

export default Form;
