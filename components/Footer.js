// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center py-4">
      <div className="py-4 mx-auto">
        <p className="text-slate-500 text-[0.9rem] font-light tracking-wide">&copy;{new Date().getFullYear()} NovaFrame. All rights reserved.</p>
        <p className="text-slate-700 text-[0.8rem] mt-[0.1rem] tracking-wide">Designed and developed by <a href="http://silentcosmo.netlify.app">silentCosmo</a></p>
      </div>
    </footer>
  );
}
