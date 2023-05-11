'use client';

import useSearchModal from '@/app/hooks/useSearchModal';
import { formatISO } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { FC, useCallback, useMemo, useState } from 'react';
import { Range } from 'react-date-range';
import Heading from '../Heading';
import Calendar from '../inputs/Calendar';
import Counter from '../inputs/Counter';
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect';
import Modal from './Modal';

interface SearchModalProps {}

enum STEPS {
	LOCATION = 0,
	DATE = 1,
	INFO = 2,
}

const SearchModal: FC<SearchModalProps> = ({}) => {
	const router = useRouter();
	const params = useSearchParams();
	const searchModal = useSearchModal();

	const [step, setStep] = useState(STEPS.LOCATION);
	const [location, setLocation] = useState<CountrySelectValue>();
	const [guestCount, setGuestCount] = useState(1);
	const [roomCount, setRoomCount] = useState(1);
	const [bathroomCount, setBathroomCount] = useState(1);
	const [dateRange, setDateRange] = useState<Range>({
		startDate: new Date(),
		endDate: new Date(),
		key: 'selection',
	});

	const onBack = useCallback(() => {
		setStep((value) => value - 1);
	}, []);

	const onNext = useCallback(() => {
		setStep((value) => value + 1);
	}, []);

	const onSubmit = useCallback(async () => {
		if (step !== STEPS.INFO) return onNext();

		let currentQuery = {};

		if (params) {
			currentQuery = queryString.parse(params.toString());
		}

		const updatedQuery: any = {
			...currentQuery,
			locationValue: location?.value,
			guestCount,
			roomCount,
			bathroomCount,
		};

		if (dateRange.startDate) {
			updatedQuery.startDate = formatISO(dateRange.startDate);
		}

		if (dateRange.endDate) {
			updatedQuery.endDate = formatISO(dateRange.endDate);
		}

		const url = queryString.stringifyUrl(
			{
				url: '/',
				query: updatedQuery,
			},
			{ skipNull: true }
		);

		setStep(STEPS.LOCATION);
		searchModal.onClose();
		router.push(url);
	}, [
		step,
		searchModal,
		location,
		router,
		roomCount,
		bathroomCount,
		dateRange,
		onNext,
		params,
		guestCount,
	]);

	const actionLabel = useMemo(() => {
		if (step === STEPS.INFO) return 'Search';

		return 'Next';
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.LOCATION) return undefined;

		return 'Back';
	}, [step]);

	let bodyContent = (
		<div className="flex flex-col gap-8">
			<Heading
				title="Where do you wanna go?"
				subtitle="Find the perfect location!"
			/>
			<CountrySelect
				value={location}
				onChange={(value) => setLocation(value as CountrySelectValue)}
			/>
		</div>
	);

	if (step === STEPS.DATE) {
		bodyContent = (
			<div className=" flex flex-col gap-8">
				<Heading
					title="When do you plan to go?"
					subtitle="Make sure everyone is free!"
				/>
				<Calendar
					value={dateRange}
					onChange={(value) => setDateRange(value.selection)}
				/>
			</div>
		);
	}

	if (step === STEPS.INFO) {
		bodyContent = (
			<div className=" flex flex-col gap-8">
				<Heading title="More information" subtitle="Find your perfect place" />
				<Counter
					title="Guests"
					subtitle="How many guests are coming?"
					value={guestCount}
					onChange={(value) => setGuestCount(value)}
				/>
				<hr />
				<Counter
					title="Rooms"
					subtitle="How many rooms do you need?"
					value={guestCount}
					onChange={(value) => setRoomCount(value)}
				/>
				<hr />
				<Counter
					title="Bathrooms"
					subtitle="How many bathrooms do you need?"
					value={guestCount}
					onChange={(value) => setBathroomCount(value)}
				/>
			</div>
		);
	}
	return (
		<Modal
			isOpen={searchModal.isOpen}
			onClose={searchModal.onClose}
			onSubmit={onSubmit}
			title="Filters"
			actionLabel={actionLabel}
			secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
			secondaryActionLabel={secondaryActionLabel}
			body={bodyContent}
		/>
	);
};

export default SearchModal;
