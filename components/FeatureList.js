// components/FeatureList.js
const features = [
  'AI-Powered Image Generation',
  'User-Friendly Interface',
  'No Sign-in Required',
  'Free Image Downloads',
];

export default function FeatureList() {
  return (
    <section className="features text-slate-200 py-16  tracking-wide">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Key Features</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <li key={index} className="p-4 bg-gray-900 rounded-md text-slate-50 bg-opacity-40 backdrop-blur-lg">
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
