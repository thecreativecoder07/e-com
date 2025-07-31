"use client";

import { Provider } from "react-redux";
import { makeStore } from "../redux/store";

interface Props {
  children: React.ReactNode;
}

const store = makeStore(); // ensure it's created on client

const ReduxProvider = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
