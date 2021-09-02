import { useDispatch } from "react-redux";

import { logOut } from "./userSlice";

export function LogOutUser() {
  const dispatch = useDispatch();
  dispatch(logOut());
}
