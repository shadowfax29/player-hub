"use client";

import Link from "next/link";
import { HomeLayout } from "@/components/layout/HomeLayout";

export default function DisclaimerPage() {
  return (
    <HomeLayout>
      <div className="px-4 md:px-8 py-8 pt-24 pb-24 md:pb-8 max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6b7280] hover:text-white tracking-widest mb-6 transition-colors">
          ← BACK HOME
        </Link>

        <h1 className="font-heading text-2xl md:text-4xl font-extrabold text-white tracking-wide mb-2">
          DISCLAIMER
        </h1>
        <p className="text-[#6b7280] text-xs mb-8">Last Updated: August 2026</p>

        <div className="space-y-6 text-sm text-[#a0aec0] leading-relaxed">
          <p>
            The PlayConsole site, including all content, software, functions, materials and information made available on or accessed through this website, is provided &quot;AS IS&quot; to the fullest extent permissible by law. We make no representations or warranties of any kind whatsoever for the content on the site or the materials, information and functions made accessible by the software used on or accessed through the site, for any services or for any breach of security associated with the transmission of sensitive information through the site, even if PlayConsole becomes aware of any such breaches.
          </p>

          {/* Section 1 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">1. NO WARRANTIES</h2>
            <p className="ml-4">
              We expressly repudiate any express or implied warranties, including, without limitation, non-infringement, merchantability, or fitness for a particular purpose. We do not warrant that the functions contained on the site or any materials or content contained therein will be uninterrupted or error free, that defects will be corrected, or that the site or the server that makes it available is free of viruses or other harmful components.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">2. USER-PROVIDED CONTENT</h2>
            <p className="ml-4 mb-2">
              You acknowledge and approve that any communication to and from this site is not confidential and your communications or user-contributed content may be read or captured by others.
            </p>
            <p className="ml-4">
              You further acknowledge and agree that by submitting communications or user-contributed content to us and by posting information on the site, including gaming location listings, reviews, or photographs, no confidential, contractually implied or other relationship is created between you and us other than pursuant to these Terms.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">3. NO RESPONSIBILITY FOR USER CONTENT</h2>
            <p className="ml-4 mb-2">
              You acknowledge and agree that you will not hold or seek us responsible for the content provided by any user, including, without limitation, any translation thereof, and you further acknowledge and agree that we are not a party to any Gaming Session or any arrangement between a Host and a Player.
            </p>
            <p className="ml-4">
              We have no control over and do not guarantee (other than pursuant to any guarantee that may be offered on the site) the safety of any transaction or the truth or accuracy of any listing or other content provided on the site.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">4. NOT A PARTY TO TRANSACTIONS</h2>
            <p className="ml-4 mb-2">
              PlayConsole acts as a technology platform connecting Hosts and Players. We are not a party to any agreement, transaction, or arrangement between a Host and a Player.
            </p>
            <p className="ml-4 mb-2">
              We do not: own, operate, or control any Host Premises; employ or supervise any Host; guarantee the quality, safety, or legality of any Gaming Session; guarantee the accuracy of any listing; guarantee the truthfulness of any user-provided content; or guarantee that any transaction will be completed successfully.
            </p>
            <p className="ml-4">
              Any dispute between a Host and a Player is between those parties. PlayConsole is not responsible for resolving such disputes, except to the extent it chooses to assist in communication.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">5. LIMITATION OF LIABILITY</h2>
            <p className="ml-4 mb-2">
              To the maximum extent permitted by applicable law, PlayConsole, its owners, directors, employees, affiliates, contractors, and service providers shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access to or use of (or inability to access or use) the site, including but not limited to:
            </p>
            <ul className="list-disc ml-10 space-y-1">
              <li>Any errors or omissions in any content</li>
              <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
              <li>Any interruption or cessation of transmission to or from the site</li>
              <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through the site by any third party</li>
              <li>Any loss or damage incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available through the site</li>
              <li>Any loss or damage to Host Premises, personal belongings, or gaming equipment</li>
              <li>Any personal injury sustained at Host Premises</li>
              <li>Any conduct of any Host, Player, or other user of the site</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">6. THIRD-PARTY LINKS AND SERVICES</h2>
            <p className="ml-4 mb-2">
              The site may contain links to third-party websites or services that are not owned or controlled by PlayConsole. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
            </p>
            <p className="ml-4">
              You acknowledge and agree that PlayConsole shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any content, goods, or services available on or through any third-party websites or services.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">7. INDEMNIFICATION</h2>
            <p className="ml-4">
              You agree to defend, indemnify, and hold harmless PlayConsole, its owners, directors, employees, affiliates, contractors, and service providers from and against any claims, liabilities, damages, losses, and expenses, including, without limitation, reasonable legal and accounting fees, arising out of or in any way connected with your access to or use of the site or your violation of these Terms.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">8. GOVERNING LAW</h2>
            <p className="ml-4">
              This Disclaimer shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising under or in connection with this Disclaimer shall be subject to the exclusive jurisdiction of the courts applicable to the legal entity operating the Platform.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">9. SEVERABILITY</h2>
            <p className="ml-4">
              If any provision of this Disclaimer is determined to be invalid, illegal, or unenforceable, the remaining provisions will continue to remain valid and enforceable to the maximum extent permitted by law.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">10. CHANGES TO THIS DISCLAIMER</h2>
            <p className="ml-4 mb-2">
              We may update this Disclaimer from time to time. When we make changes, we may update the &quot;Last Updated&quot; date displayed at the beginning of this Disclaimer. Your continued use of PlayConsole after an updated Disclaimer becomes effective may constitute acceptance of the updated Disclaimer to the extent permitted by law.
            </p>
            <p className="ml-4">
              If you do not agree with the updated Disclaimer, you must stop using the Platform.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">11. CONTACT</h2>
            <div className="ml-4 space-y-1">
              <p>If you have any questions about this Disclaimer, please contact us at:</p>
              <p><strong className="text-white">Platform:</strong> PlayConsole</p>
              <p><strong className="text-white">Email:</strong> support@playconsole.com</p>
              <p><strong className="text-white">Website:</strong> playconsole.com</p>
            </div>
          </section>

          {/* Acceptance */}
          <section className="mt-8 p-4 border border-white/10 rounded-lg bg-white/5">
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide">ACCEPTANCE</h2>
            <p className="mb-2">
              By using PlayConsole, you acknowledge that:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>You have read this Disclaimer</li>
              <li>You understand this Disclaimer</li>
              <li>You agree to comply with this Disclaimer</li>
              <li>You use the Platform at your own risk</li>
              <li>You are responsible for your own conduct and interactions with other users</li>
              <li>PlayConsole is not responsible for any harm arising from your use of the Platform</li>
            </ul>
            <p className="mt-3 text-white font-semibold">
              By continuing to use the Platform, you agree to this Disclaimer.
            </p>
          </section>
        </div>
      </div>
    </HomeLayout>
  );
}
