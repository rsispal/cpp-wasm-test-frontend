"use client";
import Providers from "@/context/Providers";
import { BaseLayout } from "@/layouts/BaseLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <BaseLayout title="">
            <main>{children}</main>
          </BaseLayout>
        </Providers>
      </body>
    </html>
  );
}
