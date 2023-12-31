import './linkform.scss';
import LinkIcon from '@mui/icons-material/Link';
import TitleIcon from '@mui/icons-material/Title';
import { FieldConfig } from '../form/Form';
import Form from '../form/Form';
import { createLink } from '../../redux/linkSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { toast } from 'react-toastify';

const LinkForm = () => {
	const dispatch = useDispatch<AppDispatch>();
	const userData = useSelector((state: RootState) => state.auth);
	const linkState = useSelector((state: RootState) => state?.links);
	const { user } = userData;
	const id = user?.id;

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
		const { title, link } = formData;

		if (!title || !link) {
			toast.error('add required fields');
		} else if (
			linkState.collection.length > 3 &&
			userData?.user?.subscription?.plan !== 'paid'
		) {
			toast.error('link limit reached get premium subscription');
		} else {
			dispatch(createLink({ title, link, id }));
		}
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

					<Form fields={fields} onSubmit={handleSubmit} formType='link' />
				</div>
			</div>
		</div>
	);
};

export default LinkForm;
