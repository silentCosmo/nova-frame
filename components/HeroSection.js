// components/HeroSection.js
export default function HeroSection() {
    return (
      <section className="hero bg-gradient-to-r from-blue-900 to-purple-950 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="mx-auto text-center mt-10">
          <h1 className="md:text-4xl text-3xl font-bold mb-2">Welcome to <span className="text-5xl md:text-4xl">NovaFrame</span></h1>
          <p className="md:text-lg text-base font-light">Transforming ideas into extraordinary visuals.</p>
        </div>
        {/* <div className="absolute top-0 left-0 w-full h-full bg-violet-900 opacity-10 filter blur-xl transform scale-150 -rotate-12"></div> */}
      </section>
    );
  }
  