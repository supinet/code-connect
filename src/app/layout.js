import { Aside } from '@/components/Aside';
import './globals.css'

export const metadata = {
  title: "Code Connect",
  description: "A social media network",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className='app-container'>
          <Aside />
          {children}
        </div>
      </body>
    </html>
  );
}
