import LayoutDetail from "@/components/LayoutDetail";
import ProviderNext from "./Provider";

import "./globals.css";

export const metadata = {
  title: "Game mod, game androi miễn phí, chia sẽ khóa khọc free",
  description:
    "Chào mừng bạn! Trang web của chúng tôi kết nối giải trí và học tập với game và khóa học chất lượng. Hãy khám phá cùng chúng tôi!",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "de-DE": "/de-DE",
    },
  },
  locale: "en_US",
  type: "website",
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <ProviderNext>
      <LayoutDetail>{children}</LayoutDetail>
    </ProviderNext>
  );
}
