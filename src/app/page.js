// pages/index.js
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeatureList from '../components/FeatureList';
import Frame from '../components/Frame';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import Carousel from '../components/ImageCarousel';

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <HeroSection />
        <Carousel/>
        <Frame />
        <FeatureList />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
