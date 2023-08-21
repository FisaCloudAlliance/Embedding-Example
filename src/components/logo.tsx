import styled from "@emotion/styled";
import React from "react";

const Img = styled("img")(({ theme }) => ({
  userSelect: "none",
  width: "35px",
}));
const Logo: React.FC = (props) => {
  return <Img src={`/logo.webp`} loading="lazy" />;
};
export default Logo;
