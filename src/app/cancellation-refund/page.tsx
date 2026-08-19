"use client";

import Link from "next/link";
import { HomeLayout } from "@/components/layout/HomeLayout";

export default function CancellationRefundPage() {
  return (
    <HomeLayout>
      <div className="px-4 md:px-8 py-8 pt-24 pb-24 md:pb-8 max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6b7280] hover:text-white tracking-widest mb-6 transition-colors">
          ← BACK HOME
        </Link>

        <h1 className="font-heading text-2xl md:text-4xl font-extrabold text-white tracking-wide mb-2">
          CANCELLATION &amp; REFUND POLICY
        </h1>
        <p className="text-[#6b7280] text-xs mb-8">Last Updated: August 2026</p>

        <div className="space-y-6 text-sm text-[#a0aec0] leading-relaxed">
          <p>
            This Cancellation &amp; Refund Policy (&quot;Policy&quot;) applies to all Gaming Sessions booked through the <strong className="text-white">PlayConsole</strong> platform. By making a Booking, you agree to the terms outlined below.
          </p>

          {/* Section 1 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">1. BOOKING CONFIRMATION</h2>
            <p className="ml-4">
              A Booking is considered confirmed only after the booking process has been successfully completed through the Platform and payment, where applicable, has been processed. Until confirmation, the Booking remains provisional and may be subject to availability.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">2. CANCELLATION BY PLAYER</h2>

            <h3 className="font-heading text-sm font-bold text-white mb-2 ml-4">2.1 Free Cancellation Window</h3>
            <p className="ml-4 mb-2">
              Players may cancel a Booking free of charge up to <strong className="text-white">24 hours before</strong> the scheduled Gaming Session start time. In such cases, a full refund of the Booking amount will be issued to the original payment method.
            </p>

            <h3 className="font-heading text-sm font-bold text-white mb-2 ml-4">2.2 Late Cancellation</h3>
            <p className="ml-4 mb-2">
              Cancellations made <strong className="text-white">less than 24 hours</strong> before the scheduled start time may be subject to a cancellation fee of up to <strong className="text-white">50% of the Booking amount</strong>, as the Host may have prepared the gaming setup and reserved the time slot.
            </p>

            <h3 className="font-heading text-sm font-bold text-white mb-2 ml-4">2.3 No-Show</h3>
            <p className="ml-4">
              If a Player fails to arrive for a confirmed Booking without prior cancellation (&quot;No-Show&quot;), the Booking amount is <strong className="text-white">non-refundable</strong>. The Host shall be entitled to the full Booking amount for the reserved session.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">3. CANCELLATION BY HOST</h2>

            <h3 className="font-heading text-sm font-bold text-white mb-2 ml-4">3.1 Host-Initiated Cancellation</h3>
            <p className="ml-4 mb-2">
              If a Host cancels a confirmed Booking, the Player will receive a <strong className="text-white">full refund</strong> of the Booking amount, regardless of the cancellation timing.
            </p>

            <h3 className="font-heading text-sm font-bold text-white mb-2 ml-4">3.2 Repeated Host Cancellations</h3>
            <p className="ml-4">
              Hosts who repeatedly cancel confirmed Bookings may face account restrictions, reduced listing visibility, or permanent suspension from the Platform.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">4. SESSION EXTENSIONS</h2>
            <p className="ml-4 mb-2">
              If a Player requests additional gaming time beyond the booked session, the extension may be subject to an additional charge at the Host&apos;s applicable hourly rate.
            </p>
            <p className="ml-4">
              Extensions confirmed and paid through the Platform are covered by this Policy. Extensions arranged directly between Player and Host outside the Platform are not covered.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">5. REFUND PROCESS</h2>

            <h3 className="font-heading text-sm font-bold text-white mb-2 ml-4">5.1 Refund Method</h3>
            <p className="ml-4 mb-2">
              Refunds, where applicable, will be processed to the <strong className="text-white">original payment method</strong> used for the Booking. Processing times may vary depending on the payment provider.
            </p>

            <h3 className="font-heading text-sm font-bold text-white mb-2 ml-4">5.2 Refund Timeline</h3>
            <p className="ml-4 mb-2">
              Refunds are typically initiated within <strong className="text-white">3–5 business days</strong> of the cancellation approval. The actual credit to the Player&apos;s account may take an additional 5–10 business days depending on the bank or payment provider.
            </p>

            <h3 className="font-heading text-sm font-bold text-white mb-2 ml-4">5.3 Platform Fees</h3>
            <p className="ml-4">
              Platform service fees are non-refundable where the cancellation is made by the Player within the late cancellation window or in the event of a No-Show. Platform fees are fully refunded when the cancellation is initiated by the Host.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">6. DISPUTES AND ISSUES DURING SESSION</h2>

            <h3 className="font-heading text-sm font-bold text-white mb-2 ml-4">6.1 Equipment Issues</h3>
            <p className="ml-4 mb-2">
              If a Player encounters significant issues with the gaming equipment during a session (e.g., console malfunction, controller failure, internet outage), the Player should immediately notify the Host and report the issue through the Platform.
            </p>

            <h3 className="font-heading text-sm font-bold text-white mb-2 ml-4">6.2 Partial Refund for Early Termination</h3>
            <p className="ml-4 mb-2">
              If a Gaming Session must be terminated early due to <strong className="text-white">Host-side issues</strong> (equipment failure, facility problems), the Player may be eligible for a <strong className="text-white">partial refund</strong> proportional to the unused session time, at the Host&apos;s discretion or as determined by PlayConsole support.
            </p>

            <h3 className="font-heading text-sm font-bold text-white mb-2 ml-4">6.3 Report Window</h3>
            <p className="ml-4">
              Issues must be reported within <strong className="text-white">24 hours</strong> of the session end time to be eligible for review. Reports submitted after this window may not be considered.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">7. DAMAGE AND CONDUCT-RELATED CHARGES</h2>
            <p className="ml-4 mb-2">
              If a Player causes intentional or negligent damage to the Host&apos;s gaming equipment, property, or premises, the Host may seek compensation through the Platform&apos;s dispute resolution process.
            </p>
            <p className="ml-4 mb-2">
              In such cases, the Booking amount may be retained by the Host, and additional charges may apply. The Player will be notified and given an opportunity to respond before any additional charges are enforced.
            </p>
            <p className="ml-4">
              PlayConsole facilitates communication but does not guarantee resolution of damage disputes.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">8. HOW TO CANCEL OR REQUEST A REFUND</h2>
            <div className="ml-4 space-y-2">
              <p>Players may cancel or request a refund through:</p>
              <ul className="list-disc ml-10 space-y-1">
                <li>The <strong className="text-white">My Bookings</strong> page on PlayConsole</li>
                <li>Contacting PlayConsole support at <strong className="text-white">support@playconsole.com</strong></li>
              </ul>
              <p className="mt-2">
                Please provide your Booking ID, reason for cancellation, and any supporting evidence (e.g., photographs of equipment issues) when submitting a refund request.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">9. EXCEPTIONS</h2>
            <p className="ml-4 mb-2">Refunds may not be available in the following circumstances:</p>
            <ul className="list-disc ml-10 space-y-1">
              <li>No-Show without prior cancellation</li>
              <li>Cancellation made after the Gaming Session start time</li>
              <li>Player misconduct resulting in removal from Host Premises</li>
              <li>Force majeure events beyond the control of both parties</li>
              <li>Extensions arranged outside the Platform</li>
            </ul>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">10. CHANGES TO THIS POLICY</h2>
            <p className="ml-4 mb-2">
              We may update this Cancellation &amp; Refund Policy from time to time. When we make changes, we will update the &quot;Last Updated&quot; date at the top of this page.
            </p>
            <p className="ml-4">
              Your continued use of PlayConsole after an updated Policy becomes effective constitutes acceptance of the revised Policy to the extent permitted by applicable law.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">11. CONTACT US</h2>
            <div className="ml-4 space-y-1">
              <p>For questions, disputes, or refund requests related to this Policy, please contact:</p>
              <p><strong className="text-white">Platform:</strong> PlayConsole</p>
              <p><strong className="text-white">Email:</strong> support@playconsole.com</p>
              <p><strong className="text-white">Website:</strong> playconsole.com</p>
            </div>
          </section>

          {/* Summary box */}
          <section className="mt-8 p-4 border border-white/10 rounded-lg bg-white/5">
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide">QUICK SUMMARY</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-3 rounded bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-emerald-400 font-bold mb-1">FREE CANCELLATION</p>
                <p>24+ hours before session</p>
              </div>
              <div className="p-3 rounded bg-amber-500/10 border border-amber-500/20">
                <p className="text-amber-400 font-bold mb-1">LATE CANCELLATION</p>
                <p>Less than 24h before — up to 50% fee</p>
              </div>
              <div className="p-3 rounded bg-red-500/10 border border-red-500/20">
                <p className="text-red-400 font-bold mb-1">NO-SHOW</p>
                <p>Non-refundable</p>
              </div>
              <div className="p-3 rounded bg-purple-500/10 border border-purple-500/20">
                <p className="text-purple-400 font-bold mb-1">HOST CANCELS</p>
                <p>Full refund, always</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </HomeLayout>
  );
}
