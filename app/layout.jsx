import Navbar from "@components/Navbar";
import Provider from "@components/Provider";
import "@styles/globals.css";
import { Suspense } from "react";

export const metadata = {
  title: "trymeoprompt",
  description: "TRY ME PROMPT",
};
const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <Navbar />
          <main className="app">
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
