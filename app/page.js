"use client";
import Main from "@components/index.js";
import { Provider } from "react-redux";
import store from "../store";
import "@scss/main.scss";

export default function Home() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
