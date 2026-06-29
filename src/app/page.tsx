import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full flex-1 flex flex-col justify-center items-center px-4 relative min-h-[calc(100vh-64px)] overflow-hidden">
      {/* Background Image / Banner */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2000&auto=format&fit=crop" 
          alt="Football Background" 
          className="w-full h-full object-cover opacity-60 dark:opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/80 via-transparent to-transparent"></div>
      </div>
      
      {/* Hero Section */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center mt-12 mb-12">
        
        {/* Custom built 26 Logo to bypass all image blockings */}
        <div className="flex flex-col items-center justify-center font-black leading-[0.8] tracking-tighter cursor-pointer hover:scale-105 transition-transform drop-shadow-[0_0_40px_rgba(255,255,255,0.2)] mb-12">
          <div className="text-[100px] md:text-[130px] text-white">2</div>
          <div className="text-[100px] md:text-[130px] text-white relative flex items-center justify-center -mt-4">
            <img src="/fifa26.png" className="absolute w-20 md:w-24 h-auto object-contain drop-shadow-2xl z-10 -top-8 md:-top-10" alt="Trophy" />
            <span className="relative z-0">6</span>
          </div>
          <div className="text-lg md:text-2xl tracking-[0.3em] font-bold text-white mt-4 z-20">FIFA</div>
        </div>

        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter drop-shadow-2xl mb-6 text-[var(--text-primary)]">
          THE BIGGEST <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">STAGE</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-[var(--text-secondary)] font-medium mb-12 max-w-2xl">
          Experience the ultimate football tournament. Live scores, comprehensive stats, and interactive fixtures.
        </p>

        <Link href="/fifa-2026" className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-black transition-all duration-300 bg-[var(--primary)] rounded-full hover:scale-105 hover:shadow-[0_0_40px_rgba(190,255,0,0.7)] overflow-hidden">
           <span className="relative z-10 flex items-center gap-3 text-lg md:text-xl uppercase tracking-widest font-black">
             Enter FIFA 2026 
             <span className="group-hover:translate-x-3 transition-transform duration-300">→</span>
           </span>
           <div className="absolute inset-0 h-full w-full bg-white/30 scale-0 group-hover:scale-150 rounded-full transition-transform duration-500 ease-out origin-center"></div>
        </Link>
      </div>
    </div>
  );
}
