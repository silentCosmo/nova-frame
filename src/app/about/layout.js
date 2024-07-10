
export const metadata = {
  title: 'About NovaFrame - Innovating AI Solutions',
  description: 'Transforming ideas into extraordinary visuals with innovative AI solutions. Explore our offerings, including AI-powered image generation, dynamic chat interfaces, and more.',
  openGraph: {
    title: 'About NovaFrame - Innovating AI Solutions',
    description: 'Transforming ideas into extraordinary visuals with innovative AI solutions. Explore our offerings, including AI-powered image generation, dynamic chat interfaces, and more.',
    url: 'https://novaframe.netlify.app',
    type: 'website',
    images: [
      {
        url: "https://novaframe.netlify.app/_next/image?url=%2Fcarousel%2F12.jpg&w=1024&q=75",
        width: 1024,
        height: 1024,
        alt: 'About NovaFrame - Innovating AI Solutions',
      },
    ],
  },
};

export default function AboutLayout({ children }) {
  return <>{children}</>;
}
