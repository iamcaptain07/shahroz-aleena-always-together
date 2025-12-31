import { motion } from 'framer-motion';
import Timeline from '../components/Timeline';

export default function StoryPage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen py-12 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-5xl mb-4"
            aria-hidden="true"
          >
            📖
          </motion.div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-gold mb-4">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl text-ivory/80 max-w-3xl mx-auto mb-4">
            A journey of moments that led us here
          </p>
          <p className="text-lg text-ivory/60 max-w-2xl mx-auto italic">
            Every chapter written with care, every moment treasured, every memory cherished
          </p>
        </motion.div>

        {/* Timeline */}
        <Timeline />
      </div>
    </motion.main>
  );
}

