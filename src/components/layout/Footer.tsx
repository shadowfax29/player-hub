import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#0d0f1a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#b0c6ff] to-[#5203d5] font-headline">
              PlayConsole
            </Link>
            <p className="text-[#6b7280] text-xs mt-3 leading-relaxed">
              The ultimate gaming marketplace. Find, book, and play at premium gaming setups near you.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-[10px] text-[#6b7280] tracking-widest font-bold mb-4 uppercase">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/marketplace" className="text-sm text-[#a0aec0] hover:text-white transition-colors">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-sm text-[#a0aec0] hover:text-white transition-colors">
                  Become a Host
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-[#a0aec0] hover:text-white transition-colors">
                  Log In
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[10px] text-[#6b7280] tracking-widest font-bold mb-4 uppercase">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-[#a0aec0] hover:text-white transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-[#a0aec0] hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-sm text-[#a0aec0] hover:text-white transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <span className="text-sm text-[#4a4d65] cursor-not-allowed">
                  Cancellation &amp; Refund Policy
                </span>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-[10px] text-[#6b7280] tracking-widest font-bold mb-4 uppercase">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@playconsole.com" className="text-sm text-[#a0aec0] hover:text-white transition-colors">
                  support@playconsole.com
                </a>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-[#a0aec0] hover:text-white transition-colors">
                  Help Centre
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-[#a0aec0] hover:text-white transition-colors">
                  Host Guidelines
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-[#4a4d65] tracking-widest">
            &copy; {new Date().getFullYear()} PLAYCONSOLE. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[10px] text-[#4a4d65] tracking-widest">
            BUILT FOR GAMERS, BY GAMERS
          </p>
        </div>
      </div>
    </footer>
  );
}
