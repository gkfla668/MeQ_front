import AppLayout from "@/components/layout/AppLayout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ToastContainer />
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </RecoilRoot>
  );
}
