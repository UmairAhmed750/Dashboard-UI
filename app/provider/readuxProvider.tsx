'use client';
import { Provider } from "react-redux";
import { store } from "../store/store"; // Path apne folder ke mutabiq sahi karein



export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}