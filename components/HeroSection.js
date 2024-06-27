// components/HeroSection.js
export default function HeroSection() {
    return (
      <section className="hero bg-gradient-to-r from-blue-900 to-purple-950 text-white py-20 pt-28 relative overflow-hidden">
        <div className="container mx-auto text-center mt-10">
          <h1 className="text-4xl font-bold mb-2">Welcome to NovaFrame</h1>
          <p className="text-lg font-light">Transforming ideas into extraordinary visuals.</p>
        </div>
        {/* <div className="absolute top-0 left-0 w-full h-full bg-violet-900 opacity-10 filter blur-xl transform scale-150 -rotate-12"></div> */}
      </section>
    );
  }
  