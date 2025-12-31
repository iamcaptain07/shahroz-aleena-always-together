export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy/50 border-t border-gold/20 mt-auto py-8" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-ivory/60 text-sm">
          <p>© {currentYear} Made with 💍</p>
        </div>
      </div>
    </footer>
  );
}

