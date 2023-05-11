import { Nunito } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import getCurrentUser from './actions/getCurrentUser';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import RentModal from './components/modals/RentModal';
import SearchModal from './components/modals/SearchModal';
import Navbar from './components/navbar/Navbar';
import './globals.css';

export const metadata = {
	title: 'Airbnb',
	description: 'Airbnb Clone',
};

const nunito = Nunito({ subsets: ['latin'] });

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentUser = await getCurrentUser();
	return (
		<html lang="en">
			<body className={nunito.className}>
				<Toaster />
				<RegisterModal />
				<LoginModal />
				<RentModal />
				<SearchModal />
				<Navbar currentUser={currentUser} />
				<div className="pb-20 pt-28">{children}</div>
			</body>
		</html>
	);
}
