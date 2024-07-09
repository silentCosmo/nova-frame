"use client"
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-900 bg-opacity-50 backdrop-blur-lg p-4 py-3 fixed top-0 z-50 w-full">
      <div className="mx-auto">
        <nav className="flex items-center justify-between">
          <div>
            <Link href="/">
              <Image src='/nova-logo.png' alt='NovaFrame' width={30} height={30} />
            </Link>
          </div>
          <div className="hidden md:flex">
            <ul className="flex space-x-4">
              <li>
                <Link href="/">
                  <span className="text-gray-400 hover:text-gray-300">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/chat">
                  <span className="text-gray-400 hover:text-gray-300">Chat</span>
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
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-400 hover:text-gray-300 bg- focus:outline-none relative w-8 h-8 flex flex-col justify-center items-center space-y-2">
              <span className={`block h-0.5 w-full bg-purple-500 transform transition duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-violet-500 transform transition duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-indigo-500 transform transition duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
            </button>
          </div>
        </nav>
        {isOpen && (
          <div className="md:hidden mt-4">
            <ul className="flex flex-col space-y-4 animate-slide-down text-center font-medium ">
              <li>
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <span className="text-gray-400 hover:text-gray-300">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/chat">
                  <span className="text-gray-400 hover:text-gray-300">Chat</span>
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={() => setIsOpen(false)}>
                  <span className="text-gray-400 hover:text-gray-300">About</span>
                </Link>
              </li>
              {/* Add more navigation links as needed */}
            </ul>
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </header>
  );
}
