// app/layout.js
import './globals.css';

export const metadata = {
  title: 'Captain Coquet — Cruise Duck Adventures',
  description: 'Twelve Northumbrian cruise ducks sailing from Amble to anywhere. Find a duck, log a sighting and follow the fleet.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
