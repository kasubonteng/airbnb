import getCurrentUser from '../actions/getCurrentUser';
import getListings from '../actions/getListings';
import EmptyState from '../components/EmptyState';
import PropertiesClient from './PropertiesClient';

const page = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return <EmptyState title="Unauthorized" subtitle="Please log in" />;
	}

	const listings = await getListings({ userId: currentUser.id });

	if (listings.length === 0) {
		return (
			<EmptyState
				title="No properties found"
				subtitle="Looks like you haven't reserved any properties"
			/>
		);
	}

	return <PropertiesClient listings={listings} currentUser={currentUser} />;
};

export default page;
