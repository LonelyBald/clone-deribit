import {useTicker} from "../hooks/useTicker";

export const Header = () => {
    const ticker = useTicker('BTC_PERPETUAL')
    console.log(ticker)
  return (
    <div className="header-container">
      <div className="logo-block">
        <span>Deribit</span>
      </div>
    </div>
  );
};
