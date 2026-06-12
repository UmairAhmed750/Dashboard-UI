'use client';
import { Provider } from "react-redux";
import { store } from "../store/store"; // Path apne folder ke mutabiq sahi karein
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";// 1. Apna ReduxProvider

const queryClient = new QueryClient();
export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </Provider>
  );
}