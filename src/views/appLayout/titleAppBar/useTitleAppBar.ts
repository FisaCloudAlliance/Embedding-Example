import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../store/allStore";
import { updateSideDrawer } from "../../../store/sideDrawer";

export function useTitleAppBar() {
  const [open, setOpen] = useState(false);
  const drawer = useSelector((state: IRootState) => state.sideDrawer);
  const dispatch = useDispatch();

  return {
    logoClickAsync,
    open,
    setOpen,
    toggleDrawer,
  };

  async function logoClickAsync() {}

  function toggleDrawer() {
    dispatch(updateSideDrawer(!drawer.open));
  }
}
