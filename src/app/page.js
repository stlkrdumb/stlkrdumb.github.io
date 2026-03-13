"use client";

import { ArrowRight, Code, Layout, Rocket, Github, Twitter, Linkedin, User, Layers, Mail } from "lucide-react";
import ReactFullpage from "@fullpage/react-fullpage";

export default function Home() {
  return (
    <div className="bg-transparent text-foreground font-sans selection:bg-black/10 dark:selection:bg-white/10 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <div className="flex items-center justify-between gap-0 px-0 h-14 md:h-20 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/30 w-full max-w-2xl">
          <img
            src="/logo.svg"
            alt="stlkrdumb"
            className="h-8 md:h-16 w-auto cursor-pointer opacity-90 hover:opacity-60 transition-opacity ml-2"
            onClick={() => window.fullpage_api.moveTo('hero')}
          />
          <div className="flex items-center gap-2 mr-2">
            <button onClick={() => window.fullpage_api.moveTo('about')} title="About" className="h-9 w-9 flex items-center justify-center rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200">
              <User className="w-[1.1rem] h-[1.1rem]" />
            </button>
            <button onClick={() => window.fullpage_api.moveTo('projects')} title="Projects" className="h-9 w-9 flex items-center justify-center rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200">
              <Layers className="w-[1.1rem] h-[1.1rem]" />
            </button>
            <button onClick={() => window.fullpage_api.moveTo('contact')} title="Contact" className="h-9 w-9 flex items-center justify-center rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200">
              <Mail className="w-[1.1rem] h-[1.1rem]" />
            </button>
          </div>
        </div>
      </nav>

      <ReactFullpage
        scrollingSpeed={1000}
        anchors={['hero', 'about', 'projects', 'contact']}
        navigation={true}
        navigationPosition="right"
        credits={{ enabled: false }}
        render={({ state, fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              
              {/* Hero Section */}
              <div className="section relative" data-anchor="hero">
                {/* Background Image Container */}
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('/images/one.png')" }}
                >
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>                

                <main className="relative z-10 mx-auto max-w-5xl px-6 h-full flex items-center justify-center">
                  <section className="flex flex-col items-center text-center animate-fade-in-up w-full">
                  </section>
                </main>

                {/* Scroll down indicator */}
                <div
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer text-white/60 hover:text-white/90 transition-colors"
                  onClick={() => fullpageApi.moveTo('about')}
                  style={{ animation: "scrollBounce 2s ease-in-out infinite" }}
                >
                  <span className="text-xs tracking-widest uppercase">Scroll</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Features / Expertise Section */}
              {/* About Section */}
              <div className="section relative" data-anchor="about">
                {/* Background Image */}
                <div
                  className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('/images/two.png')" }}
                >
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>
              </div>

              {/* Selected Projects */}
              <div className="section relative" data-anchor="projects">
                {/* Background Image */}
                <div
                  className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('/images/three.png')" }}
                >
                  <div className="absolute inset-0 bg-black/50"></div>
                </div>
                <main className="relative z-10 mx-auto max-w-5xl px-6 h-full flex flex-col justify-center">
                  <div className="mb-16 flex items-end justify-between">
                    <div>
                      <h2 className="text-3xl font-bold mb-4">Selected Work</h2>
                      <p className="text-zinc-400 max-w-2xl">A collection of projects I&apos;ve built recently.</p>
                    </div>
                    <a href="#" className="hidden sm:flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group">
                      View Github <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Project 1 */}
                    <div className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                      <div className="aspect-video bg-zinc-900 relative overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent z-10"></div>
                        <div className="absolute inset-0 opacity-20 flex bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] transition-transform duration-700 group-hover:scale-110"></div>
                      </div>
                      <div className="p-6">
                        <div className="flex gap-2 mb-3">
                          <span className="text-xs font-mono px-2 py-1 rounded-md bg-white/10 text-zinc-300">Next.js</span>
                          <span className="text-xs font-mono px-2 py-1 rounded-md bg-white/10 text-zinc-300">Tailwind</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-zinc-400 transition-colors">E-Commerce Dashboard</h3>
                        <p className="text-sm text-zinc-400">A high-performance admin dashboard for managing online stores, featuring real-time analytics.</p>
                      </div>
                    </div>

                    {/* Project 2 */}
                    <div className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                      <div className="aspect-video bg-zinc-900 relative overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent z-10"></div>
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] transition-transform duration-700 group-hover:scale-110"></div>
                      </div>
                      <div className="p-6">
                        <div className="flex gap-2 mb-3">
                          <span className="text-xs font-mono px-2 py-1 rounded-md bg-white/10 text-zinc-300">React</span>
                          <span className="text-xs font-mono px-2 py-1 rounded-md bg-white/10 text-zinc-300">Supabase</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-zinc-400 transition-colors">AI Content Generator</h3>
                        <p className="text-sm text-zinc-400">An AI-powered SaaS application that helps creators generate written content efficiently.</p>
                      </div>
                    </div>
                  </div>
                </main>
              </div>

              {/* Footer / Contact */}
              <div className="section relative" data-anchor="contact">
                {/* Background Image */}
                <div
                  className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('/images/four.png')" }}
                >
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>

                <main className="relative z-10 mx-auto max-w-5xl px-6 h-full flex flex-col justify-center">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="text-center md:text-left">
                      <h2 className="text-4xl font-bold mb-4">Let&apos;s build together</h2>
                      <p className="text-lg text-zinc-400">Feel free to reach out for collaborations or just a friendly hello.</p>
                    </div>
                    
                    <div className="flex gap-6">
                      <a href="https://github.com/stlkrdumb" className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-zinc-400 hover:text-white transition-all hover:scale-110">
                        <Github className="w-8 h-8" />
                      </a>
                      <a href="https://x.com/nurairstalk" className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-zinc-400 hover:text-white transition-all hover:scale-110">
                        <Twitter className="w-8 h-8" />
                      </a>
                    </div>
                  </div>
                </main>
                
                {/* Copyright positioned at absolute bottom */}
                <div className="absolute bottom-6 w-full text-center text-sm text-zinc-500 z-10">
                  © {new Date().getFullYear()} rai.dev. Crafted with Next.js & Fullpage.js.
                </div>
              </div>

            </ReactFullpage.Wrapper>
          );
        }}
      />
    </div>
  );
}
