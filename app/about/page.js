// pages/about.js
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FeatureList from '@/components/FeatureList';
import HeroSection from '@/components/HeroSection';

export default function About() {
    return (
        <div className=''>
            <Head>
                <title>NovaFrame - About</title>
                <meta name="description" content="Learn more about NovaFrame and its mission." />
            </Head>
            <Header />
            <HeroSection />
            <FeatureList />
            <section className="md:p-16 p-8 mx-auto py-8 bg-gradient-to-r from-purple-950 to-blue-900 font-light leading-8  tracking-wider text-slate-100">
                <div className="my-14">
                    <h1 className="text-3xl font-bold mb-4">About NovaFrame</h1>
                    <p className="mb-4">
                        NovaFrame is a cutting-edge web application designed to transform ideas into extraordinary visuals using
                        AI-powered image generation. Whether you're an artist, designer, or enthusiast, NovaFrame empowers users to
                        create stunning creative images with ease.
                    </p>
                    <p>
                        Our mission is to provide a user-friendly platform that harnesses the power of artificial intelligence,
                        allowing users to explore new creative dimensions and express their ideas through captivating imagery.
                    </p>
                </div>
                {/* <div className="absolute top-0 left-0 w-full h-full bg-violet-900 opacity-10 filter blur-xl transform scale-75 -rotate-12"></div> */}
            </section>
            <Footer />
        </div>
    );
}
