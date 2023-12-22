import React, { useState, ChangeEvent, FormEvent } from 'react';
import './form.scss';
import { Link } from 'react-router-dom';

export interface FieldConfig {
	name: string;
	label: string;
	type: string;
	placeholder: string;
	icon: React.ReactNode;
	width?: string;
}

interface Props {
	fields: FieldConfig[];
	formType?: string;
	onSubmit: (formData: { [key: string]: string }) => void;
}

const Form: React.FC<Props> = ({ fields, onSubmit, formType }) => {
	const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onSubmit(formValues);
		setFormValues({});
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
						/>
					</div>
				</div>
			))}
			{
				<>
					<div className='form__group flex-column'>
						<button type='submit' className='button'>
							{formType === 'register'
								? 'Create New Account'
								: formType === 'link'
								? 'Add Link'
								: 'Sign In'}
						</button>
					</div>
					{formType !== 'link' && (
						<p>
							Already have an account?
							<Link to={formType === 'register' ? '/login' : '/register'}>
								{formType === 'register' ? 'Login' : 'Register'}
							</Link>
						</p>
					)}
				</>
			}
		</form>
	);
};

export default Form;
