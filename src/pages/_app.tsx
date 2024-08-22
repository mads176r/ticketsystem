import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is loaded
import { AppProps } from 'next/app';
import PageTransition from '@/components/pagetransition';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PageTransition>
      <Component {...pageProps} />
    </PageTransition>
  );
}

export default MyApp;
