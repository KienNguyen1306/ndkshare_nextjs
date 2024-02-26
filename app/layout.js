import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Search from "./components/search";

import Favicon from "/public/favicon.ico";

export const metadata = {
  title: "Game mod, game androi miễn phí, chia sẽ khóa khọc free",
  description:
    "Chào mừng bạn đến trang web của chúng tôi! Chúng tôi là nơi kết nối giữa giải trí và học tập, cung cấp một loạt game đa dạng và khóa học chất lượng, giúp bạn phát triển và thư giãn một cách đầy ý nghĩa.",
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({ children, params }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="main-body">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
