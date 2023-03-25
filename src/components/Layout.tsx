import { Header } from "./Header";
import { Futures } from "./Futures";
import { styled } from "@mui/system";
import React, { useState } from "react";
export interface ActiveType {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Layout = () => {
  const [active, setActive] = useState(false);

  return (
    <LayoutContainer>
      <Header />
      <FuturesButton onClick={() => setActive(!active)}>
        <FuturesText>Futures</FuturesText>
        <Futures active={active} setActive={setActive} />
      </FuturesButton>
    </LayoutContainer>
  );
};

const LayoutContainer = styled("div")({
  display: "fixed",
  flexDirection: "row",
});

const FuturesButton = styled("div")({
  cursor: "pointer",
});

const FuturesText = styled("span")({
  marginLeft: 30,
});
