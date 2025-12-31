import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroProposalCard from '../components/HeroProposalCard';
import ReplyForm from '../components/ReplyForm';
import Modal from '../components/Modal';
import siteConfig from '../config/site.json';

export default function ProposalPage() {
  const [showReplyModal, setShowReplyModal] = useState(false);

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex flex-col"
    >
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center py-12 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background with fireworks */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(/fireworks.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden="true"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/90 to-navy" aria-hidden="true" />
        
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl"
          aria-hidden="true"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-blush/5 rounded-full blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto text-center">
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-lg md:text-xl text-gold/80 mb-4 font-heading"
          >
            New Year. New Beginning. New Chapter.
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading text-gold mb-4 md:mb-6"
          >
            Will You Be Mine?
          </motion.h1>

          {/* Romantic subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-ivory/70 mb-8 md:mb-12 max-w-3xl mx-auto font-heading italic"
          >
            Forever and always, in this life and the next
          </motion.p>

          {/* Proposal Card */}
          <div className="mb-12 md:mb-16">
            <HeroProposalCard />
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => setShowReplyModal(true)}
              className="w-full sm:w-auto px-8 py-4 bg-gold text-navy rounded-lg text-lg font-medium hover:bg-gold/90 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy min-h-[44px]"
              aria-label="Accept proposal"
            >
              {siteConfig.messages.acceptButton}
            </button>

            <Link
              to="/story"
              className="w-full sm:w-auto px-8 py-4 border-2 border-gold/50 text-gold rounded-lg text-lg font-medium hover:bg-gold/10 hover:border-gold transition-all focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy min-h-[44px] flex items-center justify-center"
              aria-label="Read our story"
            >
              {siteConfig.messages.readStoryButton}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Reply Modal */}
      <Modal
        isOpen={showReplyModal}
        onClose={() => setShowReplyModal(false)}
        title="Your Response"
      >
        <ReplyForm onSuccess={() => setShowReplyModal(false)} />
      </Modal>
    </motion.main>
  );
}

