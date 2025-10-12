import React from "react";

// If you need to use client-side features like useState, useEffect, etc.
// Uncomment the following line:
// 'use client';

export const metadata = {
  title: "API Tester Tool",
  description: "A Postman-like API testing tool built with Next.js",
};

export default function ApiTesterLayout({ children }) {
  return (


    <div className="layout-container">
      {/* You can add common header/sidebar components here */}
      <main className="main-content">{children}</main>
      {/* You can add a footer here if needed */}
    </div>
  );
}
