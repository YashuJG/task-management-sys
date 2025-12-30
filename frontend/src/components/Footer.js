import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Footer = () => {
  const { user } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 mt-auto overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-500 to-violet-600 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-3xl animate-pulse -translate-x-1/2 -translate-y-1/2"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* ================= Brand Section ================= */}
          <div className="text-center md:text-left md:col-span-1">
            <h3 className="text-3xl font-extrabold mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-pulse">
                Task Manager
              </span>
            </h3>

            <p className="text-white/80 text-sm leading-relaxed mb-4">
              Organize your work efficiently and stay productive with our modern task management solution.
            </p>

            {/* Social icons */}
            <div className="flex justify-center md:justify-start gap-3 mt-6">
              {/* GitHub */}
              <div
                onClick={() => window.open("https://github.com/YashuJG", "_blank")}
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition cursor-pointer"
              >
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>

              {/* LinkedIn */}
              <div
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/yasaswini-sri-tamanampudi/",
                    "_blank"
                  )
                }
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition cursor-pointer"
              >
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zM8 19h-3v-11h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764S5.534 3.204 6.5 3.204s1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM21 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
                </svg>
              </div>
            </div>
          </div>
          {/* ================= END Brand Section ================= */}

          {/* ================= Quick Links ================= */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {user ? (
                <>
                  <li><Link to="/" className="text-white/70 hover:text-white">Dashboard</Link></li>
                  <li><Link to="/create-task" className="text-white/70 hover:text-white">Create Task</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/login" className="text-white/70 hover:text-white">Sign In</Link></li>
                  <li><Link to="/register" className="text-white/70 hover:text-white">Sign Up</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* ================= About ================= */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider">
              About
            </h4>
            <p className="text-white/70 text-sm mb-4">
              A modern task management application designed to boost productivity.
            </p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 text-xs font-medium hover:bg-white/20 transition-all duration-300">
    Task Tracking
  </span>
  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 text-xs font-medium hover:bg-white/20 transition-all duration-300">
    Productivity
  </span>
  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 text-xs font-medium hover:bg-white/20 transition-all duration-300">
    Organization
  </span>
</div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © {currentYear} Task Manager. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/50 text-sm">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
