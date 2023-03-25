import { styled } from '@mui/system';
import { ActiveType } from './Layout';
import { addSubscription } from '../deribitClient';
import { useEffect, useState } from 'react';

export const Futures = ({ active }: ActiveType) => {
	const [instruments, setInstruments] = useState();

	useEffect(() => {
		const updateInstruments = ({ data }) => {
			if (data) {
				setInstruments(data);
			}
		};
		addSubscription(`get_instruments`, updateInstruments);
	}, [instruments]);

	return (
		<div>
			{active ? (
				<FuturesContainer>
					<TextFutures>Futures</TextFutures>
					<TextFuturesSpreads>Futures Spreads</TextFuturesSpreads>
				</FuturesContainer>
			) : null}
		</div>
	);
};

const FuturesContainer = styled('div')({
	borderRadius: 20,
	width: '60vw',
	height: '60vh',
	backgroundColor: 'gray',
});

const TextFutures = styled('span')({
	padding: '25%',
});
const TextFuturesSpreads = styled('span')({});
