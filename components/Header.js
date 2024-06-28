// components/Header.js
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-gray-900 bg-opacity-50 backdrop-blur-md p-4 fixed top-0 z-50 w-full">
      <div className="mx-auto">
        <nav className="flex items-center justify-between">
          <div>
            <Link href="/">
              {/* <span className="text-white text-xl font-bold">NovaFrame</span> */}
              <Image src='/nova-logo.png' alt='NovaFrame' width={30} height={0} className='h-8' /> 
            </Link>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li>
                <Link href="/">
                  <span className="text-gray-400 hover:text-gray-300">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="text-gray-400 hover:text-gray-300">About</span>
                </Link>
              </li>
              {/* Add more navigation links as needed */}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
