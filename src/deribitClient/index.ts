interface SubscriptionsType {
	[key: string]: (data: any) => void;
}

interface WSDataType {
	data: unknown;
	channel: string;
}
let subscriptions: Partial<SubscriptionsType> = {};
export let ws: WebSocket;
export let isWSOpen: boolean;

export const getSubscriptions = () => subscriptions;

export const setWS = (socket: WebSocket) => {
	ws = socket;
};

export const onMessage = (e: MessageEvent<string>) => {
	const data: WSDataType = JSON.parse(e.data).params;
	if (data) {
		const channel = data.channel;
		const storedSubscriptions = getSubscriptions();
		if (storedSubscriptions) {
			const handleData = storedSubscriptions[channel];
			if (handleData) {
				handleData(data.data);
			}
		}
	}
};
export const onOpen = (e: Event) => {
	// @ts-ignore
	if (e.target && e.target.readyState === 1) {
		isWSOpen = true;
		// addSubscription('incremental_ticker.BTC-PERPETUAL', data => console.log(data));
	}
};

export const onClose = () => {
	subscriptions = {};
};

export const addSubscription = (source: string, callback: (data: any) => void) => {
	if (!isWSOpen) {
		console.log('Ti obshibsya websocket ne atkryt');
		return;
	}

	subscriptions[source] = callback;
	const msg = {
		jsonrpc: '2.0',
		id: 3600,
		method: 'public/subscribe',
		params: {
			channels: [...Object.keys(subscriptions)],
		},
	};

	ws.send(JSON.stringify(msg));
};

export const removeSubscription = (source: string) => {
	delete subscriptions[source];
};
