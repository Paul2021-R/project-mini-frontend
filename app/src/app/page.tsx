'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  const toggleProjects = () => {
    setIsProjectsOpen(!isProjectsOpen);
  };

  const projects = [
    { href: '/projects/01-profile', name: '01. Profile' },
    {
      href: '/projects/02-marketing-generator',
      name: '02. Marketing Generator',
    },
    { href: '/projects/03-AI-chat-bot', name: '03. AI Chat Bot' },
    {
      href: '/projects/04-prompt-version-controller',
      name: '04. Prompt Controller',
    },
  ];

  return (
    <main>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          {/* ... (h1, Image, h2 부분은 동일) ... */}
          <div className="mb-6 text-center text-3xl font-bold text-gray-800">
            <h1>Ryu's Demo Projects</h1>
          </div>
          <div className="mb-4 items-center">
            <Image
              src="/main.png"
              alt="메인 비주얼"
              width={800}
              height={800}
              priority
            />
          </div>
          <div className="mb-4 text-left text-xl font-bold text-gray-400">
            <h2>Page List</h2>
          </div>

          <ol className="space-y-2">
            <li>
              <Link href="/login" className="text-blue-600 hover:underline">
                Login Page
              </Link>
            </li>
            <li>
              <Link
                href="/dash-board"
                className="text-blue-600 hover:underline"
              >
                DashBoard Page
              </Link>
            </li>
            <li>
              <div className="flex items-center justify-between">
                <Link
                  href="/projects"
                  className="text-blue-600 hover:underline"
                >
                  Project List Page
                </Link>

                <button
                  onClick={toggleProjects}
                  className="rounded-full p-1 hover:bg-gray-200"
                  aria-expanded={isProjectsOpen} // 웹 접근성
                >
                  {/* (아이콘) 상태에 따라 아이콘 회전 */}
                  <svg
                    className={`h-5 w-5 transition-transform ${
                      isProjectsOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
              </div>

              {isProjectsOpen && (
                <ol
                  className="
                    w-full
                    rounded-md
                    bg-gray-50
                    p-4
                    shadow-lg
                  "
                >
                  {projects.map((project) => (
                    <li key={project.href} className="mt-1">
                      <Link
                        href={project.href}
                        className="text-sm text-gray-700 hover:text-blue-600 hover:underline"
                      >
                        {project.name}
                      </Link>
                    </li>
                  ))}
                </ol>
              )}
            </li>
          </ol>
        </div>
      </div>
    </main>
  );
}
