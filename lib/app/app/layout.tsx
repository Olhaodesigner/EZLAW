export const metadata = {
  title: "EZLAW Admin",
  description: "Painel administrativo do EZLAW"
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
