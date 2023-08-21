import { Grid } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from 'remark-gfm';
import notes from "./notes.md";
type Props = {};

const Home: React.FCX<Props> = (props) => {
  return (
    <Grid container sx={{
      display: 'block',
    }}>
      <ReactMarkdown remarkPlugins={[gfm]}>
        {notes}
      </ReactMarkdown>
    </Grid>
  );
};
export default Home;
