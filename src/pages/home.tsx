import { Link } from "react-router";
import { TrendingUp, Star, BarChart3, LineChart } from "lucide-react";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-16">
      <div className="text-center space-y-4 max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-900">
          Cryptocurrency Tracker
        </h1>
        <p className="text-xl text-gray-600">
          Track your favorite cryptocurrencies in real-time with live market
          data
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/crypto"
          className="flex flex-col items-center gap-2 rounded-lg bg-blue-600 px-8 py-6 text-white font-semibold hover:bg-blue-700 transition-colors"
        >
          <TrendingUp size={32} />
          <span>Browse All Coins</span>
        </Link>

        <Link
          to="/favorites"
          className="flex flex-col items-center gap-2 rounded-lg bg-yellow-500 px-8 py-6 text-white font-semibold hover:bg-yellow-600 transition-colors"
        >
          <Star size={32} />
          <span>My Favorites</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 max-w-3xl">
        <div className="rounded-lg bg-gray-50 p-6 text-center">
          <div className="flex justify-center mb-2">
            <BarChart3 size={40} className="text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Live Prices</h3>
          <p className="text-sm text-gray-600">
            Real-time price data for the top 50 cryptocurrencies
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-6 text-center">
          <div className="flex justify-center mb-2">
            <Star size={40} className="text-yellow-500" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Favorites</h3>
          <p className="text-sm text-gray-600">
            Save and organize your favorite coins
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-6 text-center">
          <div className="flex justify-center mb-2">
            <LineChart size={40} className="text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Charts</h3>
          <p className="text-sm text-gray-600">
            View historical price charts and trends
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
