"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "E-Commerce Reimagined",
    category: "Web App",
    description: "A headless storefront with fluid transitions and WebGL product viewers.",
    color: "from-blue-500/20 to-purple-500/20",
  },
  {
    title: "Fintech Dashboard",
    category: "UI/UX",
    description: "Complex data visualization simplified into beautiful, interactive charts.",
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "Creative Agency",
    category: "Corporate Site",
    description: "Award-winning scrolling experience for a boutique design agency.",
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    title: "AI Assistant",
    category: "Product Design",
    description: "Conversational interface with spatial audio and generative UI.",
    color: "from-pink-500/20 to-rose-500/20",
  }
];

export default function Projects() {
  return (
    <section className="min-h-screen bg-[#121212] py-32 px-4 md:px-12 lg:px-24 text-white relative z-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Latest Work</h2>
          <p className="text-xl text-white/50 max-w-2xl font-light">
            A selection of recent projects exploring human-computer interaction, motion design, and performance engineering.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 hover:bg-white/10 transition-colors duration-500 backdrop-blur-md`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className="relative z-10 h-full flex flex-col justify-between min-h-[300px]">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full border border-white/20 text-xs font-medium tracking-wider uppercase mb-8 backdrop-blur-md">
                    {project.category}
                  </span>
                  <h3 className="text-3xl font-semibold mb-4 tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                    {project.title}
                  </h3>
                  <p className="text-white/60 font-light leading-relaxed max-w-md">
                    {project.description}
                  </p>
                </div>
                
                <div className="mt-8">
                  <span className="inline-flex items-center text-sm font-medium hover:text-white/80 transition-colors">
                    View Case Study 
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
