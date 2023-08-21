import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/home";
import NotFound from "./views/notFound";
import Sample01 from "./views/sample01";
type Props = {};
const AppRoute: React.FCX<Props> = (props) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sample01" element={<Sample01 />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export const sideNavigations = [
  {
    title: "ホーム",
    to: "/",
  },
  {
    title: "Simple Embedding",
    to: "/sample01",
  },
];

export default AppRoute;
