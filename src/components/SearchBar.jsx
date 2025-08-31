import './SearchBar.css';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const SearchBar = ({ cityInput, setCityInput, handleSearch }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
        placeholder="Enter a city name..."
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSearch}
      >
        Search
      </motion.button>
    </div>
  );
};

export default SearchBar;