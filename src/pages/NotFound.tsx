import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <main className="relative pt-20 min-h-screen flex items-center justify-center">
      <div className="ambient-orb" />
      <div className="text-center px-6">
        <span className="micro-label block mb-6">PAGE NOT FOUND</span>
        <h1 className="text-6xl sm:text-8xl font-semibold text-white mb-4">404</h1>
        <p className="text-lg text-[#A7B1D8] max-w-md mx-auto mb-10 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="btn-primary inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
