"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Lock, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, signup, loginWithGoogle } = useAuth();
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsLoading(true);
    setError(null);
    try {
      if (isSignUp) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      router.push("/fifa-2026");
    } catch (err: any) {
      console.error(err);
      // Clean up firebase error messages
      const errorMsg = err.message || "";
      const errorCode = err.code || "";
      
      if (errorCode === "auth/invalid-credential" || errorMsg.includes("auth/invalid-credential")) {
        setError("Invalid email or password.");
      } else if (errorCode === "auth/email-already-in-use" || errorMsg.includes("auth/email-already-in-use")) {
        setError("An account with this email already exists.");
      } else if (errorCode === "auth/weak-password" || errorMsg.includes("auth/weak-password")) {
        setError("Password should be at least 6 characters.");
      } else if (errorCode === "auth/operation-not-allowed" || errorMsg.includes("auth/operation-not-allowed")) {
        setError("Authentication provider not enabled. Please enable Email/Password login in your Firebase Console (Authentication -> Sign-in method).");
      } else {
        setError(`Authentication failed: ${errorCode || errorMsg || "Please check your credentials."}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setError(null);
    try {
      await loginWithGoogle();
      router.push("/fifa-2026");
    } catch (err: any) {
      console.error(err);
      if (err.code !== 'auth/popup-closed-by-user') {
        const errorCode = err.code || "";
        const errorMsg = err.message || "";
        if (errorCode === "auth/operation-not-allowed" || errorMsg.includes("auth/operation-not-allowed")) {
          setError("Google sign-in is not enabled. Please enable the Google provider in your Firebase Console (Authentication -> Sign-in method).");
        } else {
          setError(`Google authentication failed: ${errorCode || errorMsg}`);
        }
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=2000&auto=format&fit=crop" 
          alt="Stadium Background" 
          className="w-full h-full object-cover opacity-20 dark:opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/80 to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--primary)]/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--secondary)]/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--text-secondary)] hover:text-[var(--primary)] mb-8 transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>

        <div className="bg-[var(--card)]/80 backdrop-blur-xl border border-[var(--divider)] rounded-3xl p-8 md:p-10 shadow-2xl group">
          <div className="text-center mb-10 flex flex-col items-center">
            <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#00F0FF] to-[#0057FF] shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all duration-500 overflow-hidden mb-5">
               <div className="absolute inset-0 bg-white/20 mix-blend-overlay"></div>
               {/* Animated Goalpost and Football */}
               <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="w-7 h-7 md:w-8 md:h-8 relative z-10 overflow-visible">
                 <style>
                   {`
                     .ball-anim-large { transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); transform-origin: 12px 17px; }
                     .group:hover .ball-anim-large { transform: translate(5px, -9px) scale(0.85) rotate(180deg); }
                     .net-anim-large { transition: all 0.3s ease; }
                     .group:hover .net-anim-large { opacity: 1; stroke-width: 1; }
                   `}
                 </style>
                 <path d="M3 22V6c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v16" strokeLinecap="round" />
                 <path className="net-anim-large" d="M3 8h18M3 12h18M3 16h18M7 4v18M11 4v18M15 4v18M19 4v18" strokeWidth="0.5" opacity="0.3" />
                 <g className="ball-anim-large">
                   <circle cx="12" cy="17" r="3.5" fill="white" stroke="none" />
                   <path d="M12 14.5l1.5 2-1 1.5h-1l-1-1.5 1.5-2z" fill="#0057FF" stroke="none" />
                 </g>
               </svg>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-white mb-2">
              STRIK<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#0057FF]">ON</span>
            </h1>
            <p className="text-sm font-semibold text-[var(--text-secondary)]">
              {isSignUp ? "Create a premium account" : "Sign in to your premium account"}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm font-medium flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-secondary)] group-focus-within:text-[var(--primary)] transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full bg-[var(--background)] border border-[var(--divider)] rounded-xl py-3.5 pl-11 pr-4 text-sm font-medium text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-secondary)] group-focus-within:text-[var(--primary)] transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-[var(--background)] border border-[var(--divider)] rounded-xl py-3.5 pl-11 pr-4 text-sm font-medium text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-between text-xs font-bold">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-[var(--divider)] bg-[var(--background)] text-[var(--primary)] focus:ring-[var(--primary)] focus:ring-offset-[var(--card)]" />
                  <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-[var(--primary)] hover:underline">Forgot password?</a>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading || isGoogleLoading || !email || !password}
              className="w-full bg-[var(--primary)] text-black font-black uppercase tracking-widest text-sm py-4 rounded-xl hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(190,255,0,0.3)] transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> {isSignUp ? "Creating Account..." : "Authenticating..."}
                </>
              ) : (
                isSignUp ? "Sign Up" : "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-[var(--divider)]"></div>
            <span className="text-xs font-bold text-[var(--text-secondary)] uppercase">Or continue with</span>
            <div className="flex-1 h-px bg-[var(--divider)]"></div>
          </div>

          <button 
            onClick={handleGoogleLogin}
            disabled={isLoading || isGoogleLoading}
            className="mt-6 w-full bg-[var(--background)] border border-[var(--divider)] text-[var(--text-primary)] font-bold text-sm py-3.5 rounded-xl hover:bg-[var(--divider)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isGoogleLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                </g>
              </svg>
            )}
            Sign in with Google
          </button>

          <div className="mt-8 text-center text-xs font-bold text-[var(--text-secondary)]">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button 
              onClick={() => { setIsSignUp(!isSignUp); setError(null); }} 
              className="text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors"
            >
              {isSignUp ? "Sign in instead" : "Sign up for free"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
