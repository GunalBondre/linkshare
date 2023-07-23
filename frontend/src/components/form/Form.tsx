import './form.scss';
import { useState } from 'react';

export interface FieldConfig {
	name: string;
	label: string;
	type: string;
	placeholder?: string;
	icon: React.ReactNode;
	width?: string;
}

interface Props {
	fields: FieldConfig[];
	onSubmit: (FormData: { [key: string]: string }) => void;
}

const Form: React.FC<Props> = ({ fields, onSubmit }) => {
	const [formValue, setFormValue] = useState<{ [key: string]: string }>({});

	const handleSubmit = () => {};
	const handleChange = () => {};
	return (
		<div>
			<form action='' onSubmit={handleSubmit}>
				{fields.map((field) => (
					<div key={field.name}>
						<div className='form__group'>
							<label htmlFor={field.name}>{field.label}</label>
							<div className='iconwrapper'>{field.icon}</div>
							<input
								type={field.type}
								name={field.name}
								value={formValue[field.name] || ''}
								onChange={handleChange}
								placeholder={field.placeholder}
								style={{ width: field.width }}
							/>
						</div>
					</div>
				))}
			</form>
		</div>
	);
};

export default Form;
