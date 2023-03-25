import { styled } from "@mui/system";
import { ActiveType } from "./Layout";

export const Futures = ({ active }: ActiveType) => {
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

const FuturesContainer = styled("div")({
  borderRadius: 20,
  width: "60vw",
  height: "60vh",
  backgroundColor: "gray",
});

const TextFutures = styled("span")({
  padding: "25%",
});
const TextFuturesSpreads = styled("span")({});
