import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Yelp Restaurants Search",
  description:
    "Created by Kelvin Arias, this web is a re-design of the yelp service",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css"
          rel="stylesheet"
        ></link>
        <link
          rel="shortcut icon"
          href="https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_large_assets/dcfe403147fc/assets/img/logos/favicon.ico"
        ></link>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
