import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is loaded
import { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/pagetransition";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <AnimatePresence mode="wait">
      <PageTransition key={router.route}>
        <Component {...pageProps} />
      </PageTransition>
    </AnimatePresence>
  );
}

export default MyApp;
