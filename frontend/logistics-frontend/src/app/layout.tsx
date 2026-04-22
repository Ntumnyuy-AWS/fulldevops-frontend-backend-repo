"use client";

import { AuthProvider } from "./context/authContext.js";
import Navbar from "./components/Layout/Navbar.js";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main style={{ padding: "20px"}}>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}