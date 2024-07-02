// pages/index.js
import Head from 'next/head';
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
      <Head>
        <title>NovaFrame - Home</title>
        <meta name="description" content="Transforming ideas into extraordinary visuals with NovaFrame." />
      </Head>
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
