
interface SubscriptionsType {
    [key: string]: (data: any) => void
}
let subscriptions: SubscriptionsType | {} = {
}
export let ws: WebSocket
export let isWSOpen: boolean

export const getSubscriptions = ()=> subscriptions

export const setWS = (socket: WebSocket)=>{
    ws = socket
}

export const onMessage = (e)=>{
    const data = JSON.parse(e.data).params
    if(data){
        const channel = data.channel
        const storedSubscriptions = getSubscriptions()
        const handleData = storedSubscriptions[channel]
        if(handleData){
            handleData(data.data)
        }
    }
}
export const onOpen = (e)=>{
    if(e.target.readyState === 1){
        isWSOpen = true
        addSubscription("incremental_ticker.BTC-PERPETUAL", (data)=> console.log(data))
    }
}

export const onClose = ()=>{
    subscriptions = {}
}


export const addSubscription = (source: string, callback : (data: any)=> void)=> {
    if(!isWSOpen) {
        console.log('Ti obshibsya websocket ne atkryt')
        return
    }


    subscriptions[source] = callback
    const msg = {
        jsonrpc: "2.0",
        id: 3600,
        method: "public/subscribe",
        params: {
            channels: [...Object.keys(subscriptions)],
        },
    };

    ws.send(JSON.stringify(msg))

}


export const removeSubscription = (source)=>{
    delete subscriptions[source]
}
