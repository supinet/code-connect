import { Prompt } from 'next/font/google'

import { Aside } from '@/components/Aside'
import './globals.css'
import { SearchForm } from '@/components/SearchForm';

export const metadata = {
  title: "Code Connect",
  description: "A social media network",
};

const prompt = Prompt({
  weight: [ '400', '600' ],
  subsets: [ 'latin' ],
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={prompt.className}>
      <body>
        <div className='app-container'>
          <div>
            <Aside />
          </div>
          <div className='main-container'>
            <SearchForm />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
