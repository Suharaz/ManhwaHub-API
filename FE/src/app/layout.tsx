import Catfish from "@/components/ADS/Catfish";
import Providers from "@/components/ProgressBarProvider";
import "@/styles/index.css";
import { GoogleAnalytics } from '@next/third-parties/google'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Đọc Truyện Online Miễn Phí`,
}

export default function LayoutGuest({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="layout-guest" suppressHydrationWarning={true}>
      <body>
        <span className="bg-read absolute top-0 left-0 right-0 w-full bg-cover bg-no-repeat block bottom-0 z-[-1]"></span>
        <Providers>
          {children}
        </Providers>
        <Catfish />
      </body>
      <GoogleAnalytics gaId={`${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`} />
    </html>
  );
}
