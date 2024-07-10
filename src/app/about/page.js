import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FeedbackButton from '@/src/components/FeedBack';

const features = [
    'AI-Powered Image Generation',
    'Dynamic AI-Chat Interfaces',
    'Advanced Creative Tools',
    'Innovative AI Solutions',
    'Seamless User Experience',
    'Future-Oriented Technology'
];

export default function About() {

    return (
        <div className='relative overflow-hidden text-slate-200'>
            <Header />
            <section className="hero bg-gradient-to-r from-blue-900 to-purple-950 text-white py-20 md:py-28 relative overflow-hidden">
                <div className="mx-auto text-center relative mt-10">
                    <h1 className="md:text-4xl text-3xl font-bold mb-2 animate-fade-in">Welcome to <span className="text-5xl md:text-4xl">NovaFrame</span></h1>
                    <p className="md:text-lg text-base font-light animate-fade-in animate-delay-200">Innovating AI for creative exploration.</p>
                </div>
            </section>

            <section className="features text-slate-200 py-16 tracking-wide">
                <div className="container mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-8 animate-fade-in">Capabilities</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <li key={index} className="p-4 bg- rounded-sm bg-slate-800 text-slate-300 bg-opacity-40 backdrop-blur-lg text-lg animate-slide-up">
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="md:my-14 mx-2 md:px-44">
                <section className="md:p-16 p-8 mx-auto bg-gradient-to-r rounded-sm from-slate-900 text-slate-300 to-slate-950 py-8 font-light leading-8 shadow-lg">
                    <div className="md:my-14 py-10 md:px-16  text-justify">
                        <h1 className="text-3xl font-bold mb-4 animate-fade-in">About NovaFrame</h1>
                        <p className="mb-4 animate-fade-in">NovaFrame is a pioneering platform designed to push the boundaries of creativity with a suite of AI-powered tools. From advanced image generation to dynamic chat interfaces, our mission is to empower users across various creative fields.</p>
                        <p className="mb-4 animate-fade-in">At NovaFrame, we are dedicated to delivering innovative solutions that inspire and enable users to explore new possibilities in art, design, and beyond.</p>
                        <p className="animate-fade-in">We are committed to continuing our journey of innovation and creativity, and we are excited to introduce new products and features that will further enhance your creative experience.</p>
                    </div>
                    <div className="text-center mt-8 animate-fade-in">
                        <p className="mb-4">Check out our new product, <span className="font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">NovaChat</span>!</p>
                        <a href="/chat" className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white p-2 px-4 rounded-md shadow-lg hover:from-sky-500 hover:to-indigo-700 transition duration-300">Explore NovaChat</a>
                    </div>
                </section>
            </section>

            <section className="support mx-2 md:mx-44 md:my-20 my-8 bg-gradient-to-r rounded-sm from-slate-900 to-slate-950 text-slate-300 py-16 md:py-20 font-light">
                <div className="md:px-48 px-6 mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-8 animate-fade-in">Support & Feedback</h2>
                    <div className=' md:text-center text-justify'>
                    <p className="mb-4 animate-fade-in">We value your input and are here to help. If you have any questions, suggestions, or feedback, please reach out to us.</p>
                    <p className="mb-8 animate-fade-in">Your thoughts drive our innovation and help us to continue providing excellent products and services.</p>
                    </div>
                    <FeedbackButton/>
                </div>
            </section>
            <Footer />
        </div>
    );
}