import LinkForm from '../../components/linkform/LinkForm';
import Mockups from '../../components/mobileMockup/Mockup';
import './home.scss';
const Home = () => {
	return (
		<div>
			<div className='home'>
				<div className='home__wrapper'>
					<div className='home__left'>
						<Mockups />
					</div>
					<div className='home__right'>
						<LinkForm />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
