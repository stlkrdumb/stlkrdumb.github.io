import { ArrowRight, Code, Layout, Rocket, Github, Twitter, Linkedin } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-zinc-50 font-sans selection:bg-purple-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-xl tracking-tighter hover:text-purple-400 transition-colors cursor-pointer">
            rai.dev<span className="text-purple-500">_</span>
          </span>
          <div className="flex items-center gap-6 text-sm font-medium text-zinc-400">
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 pt-32 pb-20">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center py-20 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm mb-8 hover:bg-white/10 transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            Available for new opportunities
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            Crafting Digital
            <br /> Experiences.
          </h1>
          
          <p className="max-w-xl text-lg text-zinc-400 mb-10 leading-relaxed">
            I&apos;m a developer focused on building fast, accessible, and beautiful web applications. 
            Transforming complex problems into elegant solutions.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="h-12 px-8 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 hover:scale-105 transition-all duration-300 flex items-center gap-2 group">
              View Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="h-12 px-8 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-300">
              Get in Touch
            </button>
          </div>
        </section>

        {/* Features / Expertise Section */}
        <section id="about" className="py-24 border-t border-white/10">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-4">What I Do</h2>
            <p className="text-zinc-400 max-w-2xl">Specializing in modern web technologies to create robust and scalable applications from end to end.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 hover:bg-white/[0.04] transition-all duration-300 group">
              <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Layout className="text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Frontend Dev</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Building responsive, interactive user interfaces using React, Next.js, and modern CSS frameworks like Tailwind.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-300 group">
              <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code className="text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Backend Systems</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Designing scalable APIs and robust server-side logic using Node.js, Python, and SQL/NoSQL databases.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all duration-300 group">
              <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Rocket className="text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Performance</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Optimizing applications for maximum speed and scalability, ensuring a smooth experience for all users.
              </p>
            </div>
          </div>
        </section>

        {/* Selected Projects */}
        <section id="projects" className="py-24 border-t border-white/10">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                {/* Placeholder pattern instead of image to ensure it works statically without assets */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] transition-transform duration-700 group-hover:scale-110"></div>
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className="text-xs font-mono px-2 py-1 rounded-md bg-white/10 text-zinc-300">Next.js</span>
                  <span className="text-xs font-mono px-2 py-1 rounded-md bg-white/10 text-zinc-300">Tailwind</span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">E-Commerce Dashboard</h3>
                <p className="text-sm text-zinc-400">A high-performance admin dashboard for managing online stores, featuring real-time analytics.</p>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5">
              <div className="aspect-video bg-zinc-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                 {/* Placeholder pattern */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] transition-transform duration-700 group-hover:scale-110"></div>
              </div>
              <div className="p-6">
                 <div className="flex gap-2 mb-3">
                  <span className="text-xs font-mono px-2 py-1 rounded-md bg-white/10 text-zinc-300">React</span>
                  <span className="text-xs font-mono px-2 py-1 rounded-md bg-white/10 text-zinc-300">Supabase</span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">AI Content Generator</h3>
                <p className="text-sm text-zinc-400">An AI-powered SaaS application that helps creators generate written content efficiently.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="border-t border-white/10 bg-black/50 py-12">
        <div className="mx-auto max-w-5xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold mb-2">Let&apos;s build together</h2>
            <p className="text-sm text-zinc-400">Feel free to reach out for collaborations or just a friendly hello.</p>
          </div>
          
          <div className="flex gap-4">
            <a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-zinc-400 hover:text-white transition-all">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-zinc-400 hover:text-white transition-all">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-zinc-400 hover:text-white transition-all">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
