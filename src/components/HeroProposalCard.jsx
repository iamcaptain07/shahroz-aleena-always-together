import { motion } from 'framer-motion';

const proposalMessage = `Aleena, this hiding and silence has gone on for too long.
Sometimes there is a message, sometimes a conversation, and then nothing.
So much time has passed that I feel like I keep asking unnecessary questions.
To keep it short and honest, I want to say that I really like you and you mean something to me.
Please accept my proposal.
From the very first day, I was thinking about how to message you and what to say.
Then a fight happened in the group and I finally got a chance to speak.
Otherwise, I honestly have no interest in anyone's arguments or fights.`;

export default function HeroProposalCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative max-w-4xl mx-auto"
    >
      {/* Glowing gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-blush/5 to-transparent rounded-2xl blur-2xl" />

      {/* Pulsing heart decoration */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-8 -right-8 hidden md:block"
        aria-hidden="true"
      >
        <img src="/heart.svg" alt="" className="w-16 h-16 opacity-50" />
      </motion.div>

      {/* Card */}
      <div className="relative bg-ivory/5 backdrop-blur-sm border border-gold/30 rounded-2xl p-8 md:p-12 shadow-2xl">
        {/* Decorative corner elements */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold/30 rounded-tl-lg" aria-hidden="true" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold/30 rounded-tr-lg" aria-hidden="true" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-gold/30 rounded-bl-lg" aria-hidden="true" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold/30 rounded-br-lg" aria-hidden="true" />

        {/* Quote styling */}
        <div className="absolute top-6 left-6 text-gold/20 text-6xl md:text-7xl font-heading leading-none" aria-hidden="true">
          "
        </div>

        <div className="relative z-10">
          {/* Personal greeting */}
          <div className="mb-6 text-center">
            <p className="text-2xl md:text-3xl font-heading text-gold mb-2">Dear Aleena,</p>
            <div className="w-24 h-0.5 bg-gold/30 mx-auto"></div>
          </div>

          <blockquote className="text-lg md:text-xl lg:text-2xl font-heading text-ivory leading-relaxed text-justify">
            {proposalMessage.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </blockquote>

          {/* Closing */}
          <div className="mt-8 text-right">
            <p className="text-xl md:text-2xl font-heading text-gold">With all my love,</p>
            <p className="text-lg text-ivory/80 mt-2">Forever yours</p>
          </div>
        </div>

        {/* Bottom quote mark */}
        <div className="absolute bottom-6 right-6 text-gold/20 text-6xl md:text-7xl font-heading leading-none rotate-180" aria-hidden="true">
          "
        </div>

        {/* Sparkle decorations */}
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          className="absolute top-12 right-12 text-2xl text-gold/40"
          aria-hidden="true"
        >
          ✨
        </motion.div>
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="absolute bottom-12 left-12 text-2xl text-gold/40"
          aria-hidden="true"
        >
          ✨
        </motion.div>
      </div>
    </motion.div>
  );
}

