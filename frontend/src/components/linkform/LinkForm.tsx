import './linkform.scss';
import LinkIcon from '@mui/icons-material/Link';
import TitleIcon from '@mui/icons-material/Title';
import { FieldConfig } from '../form/Form';
import Form from '../form/Form';
const LinkForm = () => {
	const fields: FieldConfig[] = [
		{
			name: 'title',
			label: 'Enter Title',
			type: 'text',
			placeholder: 'Github',
			icon: <TitleIcon className='icon' />, // Use the IconUser component for Field 1
		},
		{
			name: 'link',
			label: 'Enter Link',
			type: 'text',
			placeholder: 'www.github.com',
			icon: <LinkIcon className='icon' />, // Use the IconEmail component for Field 2
		},
	];

	const handleSubmit = (formData: { [key: string]: string }) => {
		// Handle form submission specific to Component1
		console.log('Form data from Component1:', formData);
	};
	return (
		<div>
			<div className='link'>
				<div className='link__wrapper'>
					<div className='link__heading'>
						<h1>Customize your links</h1>
						<p>
							Add/edit/remove links and then share all your profile with the
							world
						</p>
					</div>

					<Form fields={fields} onSubmit={handleSubmit} />
					<div className='form__group flex-column'>
						<button type='submit' className='button'>
							Add Link
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LinkForm;
