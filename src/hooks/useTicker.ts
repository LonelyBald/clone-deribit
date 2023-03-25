import {useEffect, useState} from "react";
import {addSubscription, removeSubscription} from "../deribitClient";

export const useTicker = (instrument: string) => {
    const [tickerData, setTickerData] = useState();


    useEffect(()=>{
        const updateInstruments = ({ data }) => {
            if (data) {
                setTickerData(data);
            }
        };

        addSubscription(`incremental_ticker.${instrument}`, updateInstruments);

        return () => {
            removeSubscription(`incremental_ticker.${instrument}`);
        };
    },[instrument])

    return tickerData;
};
