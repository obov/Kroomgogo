import "../styles/globals.css";
import type { AppProps } from "next/app";
import Frame from "../components/layout/Frame";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  if (process.env.NODE_ENV === "production") {
    console.log = function no_console() {};
    console.warn = function no_console() {};
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Frame>
        <Component {...pageProps} />
      </Frame>
    </QueryClientProvider>
  );
}
