import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";

const PoppinstFont = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--font-poppins'
})

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className={`${PoppinstFont.variable}`}>
            <Component {...pageProps} />
        </div>
    );
}
