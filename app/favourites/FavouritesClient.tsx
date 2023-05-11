import { FC } from 'react';
import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';
import { SafeListing, SafeUser } from '../types';

interface FavouritesClientProps {
	listings: SafeListing[];
	currentUser?: SafeUser | null;
}

const FavouritesClient: FC<FavouritesClientProps> = ({
	listings,
	currentUser,
}) => {
	return (
		<Container>
			<Heading
				title="Favourites"
				subtitle="List of places you want to visit!"
			/>
			<div className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
				{listings.map((listing) => (
					<ListingCard
						data={listing}
						currentUser={currentUser}
						key={listing.id}
					/>
				))}
			</div>
		</Container>
	);
};

export default FavouritesClient;