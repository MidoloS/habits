import { Header } from "@/components/Navigator/Header";

export const metadata = {
  title: "habitai.io",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#fff" />
      </head>

      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
