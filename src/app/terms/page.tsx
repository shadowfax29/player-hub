"use client";

import Link from "next/link";
import { HomeLayout } from "@/components/layout/HomeLayout";

export default function TermsPage() {
  return (
    <HomeLayout>
      <div className="px-4 md:px-8 py-8 pt-24 pb-24 md:pb-8 max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6b7280] hover:text-white tracking-widest mb-6 transition-colors">
          ← BACK HOME
        </Link>

        <h1 className="font-heading text-2xl md:text-4xl font-extrabold text-white tracking-wide mb-2">
          TERMS AND CONDITIONS
        </h1>
        <p className="text-[#6b7280] text-xs mb-8">Last Updated: August 2026</p>

        <div className="space-y-6 text-sm text-[#a0aec0] leading-relaxed">
          <p>
            Welcome to <strong className="text-white">PlayConsole</strong> (&quot;Platform&quot;, &quot;App&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
          </p>
          <p>
            PlayConsole is a digital platform that connects individuals who wish to play PlayStation and other supported games (&quot;Players&quot; or &quot;Guests&quot;) with independent individuals or businesses offering gaming facilities at their premises (&quot;Hosts&quot;).
          </p>
          <p>
            Hosts may provide PlayStation consoles, controllers, televisions, games, internet connectivity, seating, and other gaming-related facilities at their own premises.
          </p>
          <p>
            By accessing, registering on, browsing, booking through, or otherwise using the Platform, you acknowledge that you have read, understood, and agreed to these Terms and Conditions (&quot;Terms&quot;) and our Privacy Policy.
          </p>
          <p className="text-white font-semibold">
            If you do not agree with these Terms, you must not use the Platform.
          </p>

          {/* Section 1 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">1. DEFINITIONS</h2>
            <div className="space-y-2 ml-4">
              <p><strong className="text-white">&quot;Platform&quot;</strong> means the PlayConsole website, mobile application, software, and related services operated by us.</p>
              <p><strong className="text-white">&quot;Host&quot;</strong> means an individual or business that lists a gaming location and provides access to gaming equipment and facilities through the Platform.</p>
              <p><strong className="text-white">&quot;Player&quot; or &quot;Guest&quot;</strong> means an individual who books or uses a gaming session through the Platform.</p>
              <p><strong className="text-white">&quot;Gaming Session&quot;</strong> means the period of time booked by a Player to use gaming facilities provided by a Host.</p>
              <p><strong className="text-white">&quot;Booking&quot;</strong> means a confirmed reservation made by a Player through the Platform.</p>
              <p><strong className="text-white">&quot;Host Premises&quot;</strong> means the physical location provided by the Host where the Gaming Session takes place.</p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">2. ELIGIBILITY</h2>
            <div className="space-y-2 ml-4">
              <p>2.1. You must be legally capable of entering into a binding agreement under applicable Indian law to use the Platform.</p>
              <p>2.2. The Platform may impose age restrictions for particular Hosts, games, locations, or services.</p>
              <p>2.3. Hosts may impose additional age restrictions or identification requirements for their premises.</p>
              <p>2.4. Users are responsible for providing accurate information during registration and booking.</p>
              <p>2.5. We reserve the right to request reasonable verification information where required for security, fraud prevention, or compliance purposes.</p>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">3. ROLE OF THE PLATFORM</h2>
            <div className="space-y-2 ml-4">
              <p>3.1. The Platform operates as a technology and booking platform connecting Players with Hosts.</p>
              <p>3.2. The Platform does not generally own, possess, operate, or control the PlayStation consoles, controllers, televisions, furniture, internet connections, gaming rooms, or other equipment provided by Hosts.</p>
              <p>3.3. Hosts are independent providers and are responsible for their own premises, equipment, facilities, listings, house rules, and operations.</p>
              <p>3.4. A Host&apos;s listing on the Platform does not mean that the Platform owns, operates, manages, or supervises that Host&apos;s premises.</p>
              <p>3.5. The Platform may facilitate: discovery of Hosts, booking of Gaming Sessions, payment processing, booking confirmations, communication between Hosts and Players, reviews and ratings, customer support, and other technology-related services.</p>
              <p>3.6. Except where expressly stated otherwise, the Platform is not responsible for the physical operation of a Host&apos;s gaming location.</p>
              <p>3.7. The actual Gaming Session occurs at the Host Premises and involves a direct interaction between the Host and Player.</p>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">4. HOST RESPONSIBILITIES</h2>
            <div className="space-y-2 ml-4">
              <p>4.1. Hosts are solely responsible for the accuracy of their listings and the gaming facilities they provide.</p>
              <p>4.2. Hosts must provide accurate information regarding: location, available PlayStation console, console model, number of controllers, games available, gaming setup, session duration, pricing, number of Players permitted, facilities, house rules, and any relevant restrictions.</p>
              <p>4.3. Hosts are responsible for ensuring that the gaming equipment listed by them is reasonably functional and available during confirmed bookings.</p>
              <p>4.4. Hosts are responsible for maintaining their premises and equipment.</p>
              <p>4.5. Hosts are responsible for determining and implementing reasonable safety and security measures at their premises.</p>
              <p>4.6. Hosts are responsible for supervising Players at their premises to the extent they consider reasonably necessary.</p>
              <p>4.7. Hosts are responsible for any CCTV or surveillance systems installed at their premises and must use such systems in accordance with applicable law.</p>
              <p>4.8. Hosts must not install surveillance equipment in private areas such as bathrooms or other areas where individuals reasonably expect privacy.</p>
              <p>4.9. Where required by applicable law, Hosts are responsible for informing Players about CCTV or other surveillance being used at the premises.</p>
              <p>4.10. Hosts are responsible for obtaining any licenses, permissions, registrations, or approvals required to legally operate their gaming premises or provide their services.</p>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">5. PLAYER RESPONSIBILITIES</h2>
            <div className="space-y-2 ml-4">
              <p>5.1. Players must use the Host Premises and gaming equipment responsibly.</p>
              <p>5.2. Players must follow the reasonable house rules communicated by the Host.</p>
              <p>5.3. Players must arrive at the location within the permitted booking period.</p>
              <p>5.4. Players must not permit additional persons to use the gaming facilities where the booking does not permit additional Players.</p>
              <p>5.5. Players must not: intentionally damage a PlayStation console; throw, hit, bend, break, or intentionally damage controllers; damage televisions or displays; damage gaming accessories; damage furniture or other Host property; tamper with cables or electrical equipment; open or modify gaming equipment; jailbreak, hack, or modify a console; install unauthorized software; attempt to access another person&apos;s account; engage in violence or threatening behaviour; harass the Host or other Players; engage in unlawful activity; cause unreasonable disturbance; bring unauthorized persons to the premises; or attempt to bypass the Platform&apos;s booking or payment system.</p>
              <p>5.6. Players are responsible for their own conduct while visiting Host Premises.</p>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">6. DAMAGE TO PLAYSTATION, CONTROLLERS AND HOST PROPERTY</h2>
            <div className="space-y-2 ml-4">
              <p>6.1. PlayStation consoles, controllers, televisions, furniture, accessories, and other gaming equipment provided at a Host Premises are generally the property or responsibility of the Host.</p>
              <p>6.2. If a Player intentionally or negligently causes physical damage to the Host&apos;s property, the Player may be responsible for such damage to the extent permitted by applicable law.</p>
              <p>6.3. Examples of potentially chargeable damage may include: broken controllers; damaged PlayStation consoles; damaged HDMI or power cables; broken television screens; damaged gaming accessories; damaged furniture; or other physical property damage caused by the Player.</p>
              <p>6.4. The Host may provide evidence relating to alleged damage, including photographs, videos, CCTV footage where lawfully obtained, repair estimates, invoices, or other relevant information.</p>
              <p>6.5. The Platform may facilitate communication between the Host and Player regarding a reported incident.</p>
              <p>6.6. The Platform does not guarantee recovery of any damage amount on behalf of a Host.</p>
              <p>6.7. Normal wear and tear, pre-existing damage, equipment malfunction, or technical failure should not automatically be treated as damage caused by a Player.</p>
              <p>6.8. Any dispute concerning responsibility for physical damage is primarily between the Host and Player, subject to applicable law.</p>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">7. SURVEILLANCE AND SECURITY</h2>
            <div className="space-y-2 ml-4">
              <p>7.1. Gaming Sessions take place at Host-controlled premises.</p>
              <p>7.2. Hosts are responsible for determining appropriate supervision and security measures at their premises.</p>
              <p>7.3. The Platform does not continuously supervise or monitor Host Premises.</p>
              <p>7.4. The Platform is not responsible for providing security personnel, CCTV, guards, or physical supervision at Host Premises unless expressly stated otherwise.</p>
              <p>7.5. Hosts may use CCTV or other lawful surveillance systems for security purposes, subject to applicable law.</p>
              <p>7.6. Where legally required, Hosts must provide appropriate notice regarding CCTV or other surveillance.</p>
              <p>7.7. Surveillance must not be conducted in areas where individuals have a reasonable expectation of privacy.</p>
              <p>7.8. The Platform does not guarantee that CCTV or any other surveillance system will be available at a Host location.</p>
              <p>7.9. In the event of theft, violence, property damage, or suspected unlawful activity, the affected person may contact the appropriate law-enforcement authorities.</p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">8. BOOKING GAMING SESSIONS</h2>
            <div className="space-y-2 ml-4">
              <p>8.1. Players may browse available Hosts and Gaming Sessions through the Platform.</p>
              <p>8.2. A Booking becomes confirmed only after the booking process has been successfully completed and payment, where applicable, has been successfully processed.</p>
              <p>8.3. Players are responsible for checking the booking details before confirming a Booking.</p>
              <p>8.4. Booking details may include: host location, date, start time, end time, number of Players, price, gaming equipment, games, house rules, and other applicable conditions.</p>
              <p>8.5. Players must use the Gaming Session only during the booked time.</p>
              <p>8.6. The Host may refuse access where the Player materially violates the Booking conditions, applicable house rules, or these Terms.</p>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">9. SESSION EXTENSION</h2>
            <div className="space-y-2 ml-4">
              <p>9.1. A Player may request additional gaming time if the Host is available and willing to provide it.</p>
              <p>9.2. Additional time may require an additional payment.</p>
              <p>9.3. Where the Platform provides a session-extension feature, Players should use the Platform to extend their Booking.</p>
              <p>9.4. Players and Hosts must not intentionally use offline payments or arrangements to circumvent applicable Platform fees.</p>
              <p>9.5. An extension of a Gaming Session does not automatically form part of the original Booking unless it is recorded through the Platform or otherwise authorized by the Platform.</p>
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">10. CANCELLATIONS AND REFUNDS</h2>
            <div className="space-y-2 ml-4">
              <p>10.1. Cancellation and refund conditions applicable to a Booking will be displayed through the Platform or communicated at the time of Booking.</p>
              <p>10.2. Certain Bookings may be non-refundable or may be subject to cancellation charges.</p>
              <p>10.3. Where a Host cancels a confirmed Booking, the Player may be eligible for a refund or alternative arrangement according to the applicable cancellation policy.</p>
              <p>10.4. Refunds, where applicable, will be processed according to the Platform&apos;s refund policy and applicable payment-provider procedures.</p>
              <p>10.5. The Platform is not responsible for losses or expenses incurred by a Player due to their travel to or from a Host Premises, except where liability cannot legally be excluded.</p>
            </div>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">11. HOST PROPERTY AND PERSONAL BELONGINGS</h2>
            <div className="space-y-2 ml-4">
              <p>11.1. Players are responsible for their personal belongings while visiting Host Premises.</p>
              <p>11.2. The Platform does not take custody of Player belongings.</p>
              <p>11.3. To the maximum extent permitted by applicable law, the Platform is not responsible for loss, theft, or damage to personal belongings left at Host Premises.</p>
              <p>11.4. Hosts are responsible for taking reasonable precautions regarding their own property and gaming equipment.</p>
              <p>11.5. Players should avoid bringing unnecessary valuables to a Gaming Session.</p>
            </div>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">12. PERSONAL SAFETY</h2>
            <div className="space-y-2 ml-4">
              <p>12.1. Players understand that they are visiting privately operated Host Premises.</p>
              <p>12.2. Players should exercise reasonable care for their own safety while visiting a Host location.</p>
              <p>12.3. Hosts are responsible for maintaining their premises in accordance with applicable laws and reasonable safety requirements.</p>
              <p>12.4. The Platform does not control the physical condition of Host Premises and cannot guarantee that every Host Premises will be free from hazards.</p>
              <p>12.5. Nothing in these Terms excludes or limits liability that cannot legally be excluded under applicable law.</p>
            </div>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">13. PROHIBITED CONDUCT</h2>
            <div className="space-y-2 ml-4">
              <p>Users must not use the Platform or Host Premises to:</p>
              <p>1. Damage or intentionally misuse property; 2. Engage in violence; 3. Threaten or harass another person; 4. Engage in unlawful activity; 5. Provide false information; 6. Use another person&apos;s account; 7. Create multiple accounts to circumvent a ban; 8. Manipulate bookings or payments; 9. Circumvent Platform fees; 10. Conduct unauthorized offline bookings; 11. Attempt to manipulate ratings or reviews; 12. Attempt to gain unauthorized access to Platform systems; 13. Interfere with the operation of the Platform; 14. Upload unlawful or infringing content; 15. Violate the privacy or rights of another person; or 16. Violate applicable laws or regulations.</p>
            </div>
          </section>

          {/* Section 14 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">14. PAYMENTS AND PLATFORM FEES</h2>
            <div className="space-y-2 ml-4">
              <p>14.1. The Platform may charge Players and/or Hosts applicable service fees, booking fees, transaction fees, or other charges.</p>
              <p>14.2. Applicable charges will be displayed before the Booking is confirmed wherever reasonably practicable.</p>
              <p>14.3. Applicable taxes may be charged in accordance with Indian law.</p>
              <p>14.4. Users must not intentionally move transactions outside the Platform for the purpose of avoiding Platform fees.</p>
              <p>14.5. Where the Platform detects repeated attempts to circumvent its payment system, the relevant account may be permanently banned.</p>
            </div>
          </section>

          {/* Section 15 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">15. REVIEWS AND RATINGS</h2>
            <div className="space-y-2 ml-4">
              <p>15.1. Players and Hosts may be permitted to submit ratings, reviews, photographs, feedback, or other content.</p>
              <p>15.2. Reviews should represent the user&apos;s genuine experience.</p>
              <p>15.3. Users must not submit fake reviews, manipulate ratings, threaten another user to obtain a review, or use reviews to harass another person.</p>
              <p>15.4. We may remove reviews or other content that violate these Terms or applicable law.</p>
              <p>15.5. By submitting content to the Platform, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, display, and distribute such content for operating, improving, and promoting the Platform, subject to applicable law.</p>
            </div>
          </section>

          {/* Section 16 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">16. ACCOUNT SECURITY</h2>
            <div className="space-y-2 ml-4">
              <p>16.1. Users are responsible for maintaining the security of their account credentials.</p>
              <p>16.2. Users must not share their accounts with other persons.</p>
              <p>16.3. Users must immediately notify us if they believe that their account has been accessed without authorization.</p>
              <p>16.4. The Platform is not responsible for losses arising from a user&apos;s failure to maintain the security of their account, except where liability cannot legally be excluded.</p>
            </div>
          </section>

          {/* Section 17 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">17. PERMANENT ACCOUNT BAN</h2>
            <div className="space-y-2 ml-4">
              <p>17.1. We may permanently ban, block, or terminate a user&apos;s account where we reasonably believe that the user has violated these Terms or poses a safety, security, fraud, or legal risk.</p>
              <p>17.2. Circumstances that may result in a permanent ban include: intentionally or negligently damaging Host property; repeated misuse of gaming equipment; violence or threatening behaviour; harassment or abusive conduct; unlawful activity; fraud; providing false information; payment manipulation; attempting to bypass Platform fees; creating multiple accounts to avoid enforcement; manipulating bookings; manipulating ratings or reviews; serious violations of Host house rules; or any other serious or repeated violation of these Terms.</p>
              <p>17.3. A permanent ban means that the user will no longer be permitted to use the Platform through the banned account.</p>
              <p>17.4. We may take reasonable measures to prevent a permanently banned user from creating or using another account to circumvent the ban.</p>
              <p>17.5. Where necessary for safety, fraud prevention, or protection of users and Hosts, we may permanently ban an account without prior notice.</p>
              <p>17.6. A permanent account ban by the Platform does not determine whether a Host or Player is legally responsible for a separate dispute between them.</p>
              <p>17.7. A permanently banned user must not use another person&apos;s account to access the Platform.</p>
              <p>17.8. We may retain information reasonably necessary for security, fraud prevention, dispute handling, legal compliance, and enforcement of these Terms, subject to applicable law.</p>
            </div>
          </section>

          {/* Section 18 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">18. PLATFORM DISCLAIMER</h2>
            <div className="space-y-2 ml-4">
              <p>18.1. Hosts are independent providers and are responsible for their premises, equipment, listings, services, and conduct.</p>
              <p>18.2. The Platform does not guarantee: the condition of a Host&apos;s PlayStation console; the condition of controllers; the availability of particular games; internet speed or availability; the quality of the gaming experience; the safety or security of Host Premises; the accuracy of all Host-provided information; the conduct of a Host; the conduct of a Player; the availability of CCTV or surveillance; that a Host will provide every facility described in a listing; or that a Player will comply with every Host rule.</p>
              <p>18.3. The Platform is not responsible for physical damage to Host property caused by a Player, except to the extent liability cannot legally be excluded.</p>
              <p>18.4. The Platform is not responsible for personal injury, theft, property loss, or other incidents occurring at Host Premises except to the extent such liability cannot legally be excluded.</p>
              <p>18.5. The Platform does not guarantee that disputes between Hosts and Players will be resolved.</p>
            </div>
          </section>

          {/* Section 19 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">19. LIMITATION OF LIABILITY</h2>
            <div className="space-y-2 ml-4">
              <p>19.1. To the maximum extent permitted by applicable law, the Platform, its owners, directors, employees, affiliates, contractors, and service providers shall not be liable for indirect, incidental, special, consequential, or punitive damages arising from the use of the Platform or interactions between Hosts and Players.</p>
              <p>19.2. This may include claims relating to: damage to gaming equipment; damage to Host property; loss or theft of personal belongings; Host-Player disputes; conduct of other users; events occurring at Host Premises; equipment malfunction; internet failure; game availability; cancellation by a Host or Player; or temporary Platform unavailability.</p>
              <p>19.3. Nothing in these Terms excludes or limits liability that cannot legally be excluded or limited under applicable Indian law.</p>
            </div>
          </section>

          {/* Section 20 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">20. INDEMNIFICATION</h2>
            <div className="space-y-2 ml-4">
              <p>20.1. To the extent permitted by applicable law, you agree to indemnify and hold harmless the Platform, its owners, directors, employees, affiliates, contractors, and service providers from claims, losses, liabilities, damages, costs, and expenses arising from: your breach of these Terms; your unlawful conduct; damage caused by you to Host property; your violation of another person&apos;s rights; your misuse of the Platform; your violation of applicable law; or your conduct at a Host Premises.</p>
            </div>
          </section>

          {/* Section 21 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">21. LEGAL COMPLIANCE</h2>
            <div className="space-y-2 ml-4">
              <p>21.1. Users must comply with all applicable Indian laws and regulations.</p>
              <p>21.2. Hosts are responsible for ensuring that their gaming premises and activities comply with applicable local requirements.</p>
              <p>21.3. Hosts must obtain any permissions, registrations, licenses, or approvals required by law.</p>
              <p>21.4. Players must comply with applicable laws while using the Platform and visiting Host Premises.</p>
              <p>21.5. We may cooperate with law-enforcement authorities where required by applicable law or valid legal process.</p>
            </div>
          </section>

          {/* Section 22 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">22. PRIVACY</h2>
            <div className="space-y-2 ml-4">
              <p>22.1. Your use of the Platform is also subject to our Privacy Policy.</p>
              <p>22.2. We may collect and process information necessary to provide bookings, payments, account management, customer support, fraud prevention, security, and other Platform services.</p>
              <p>22.3. Hosts and Players must handle personal information obtained through the Platform responsibly and in accordance with applicable law.</p>
              <p>22.4. Any information collected through the Platform will be handled in accordance with our Privacy Policy and applicable law.</p>
            </div>
          </section>

          {/* Section 23 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">23. INTELLECTUAL PROPERTY</h2>
            <div className="space-y-2 ml-4">
              <p>23.1. All Platform software, trademarks, logos, designs, graphics, text, interfaces, and other content are owned by or licensed to us.</p>
              <p>23.2. Users may not copy, reproduce, modify, distribute, reverse engineer, sell, or commercially exploit Platform content without our prior written permission.</p>
            </div>
          </section>

          {/* Section 24 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">24. PLATFORM AVAILABILITY</h2>
            <div className="space-y-2 ml-4">
              <p>24.1. We do not guarantee that the Platform will always be available, uninterrupted, secure, or error-free.</p>
              <p>24.2. We may temporarily suspend or modify Platform services for maintenance, upgrades, security, technical issues, or other operational reasons.</p>
              <p>24.3. We are not responsible for interruptions caused by circumstances beyond our reasonable control.</p>
            </div>
          </section>

          {/* Section 25 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">25. MODIFICATION OF TERMS</h2>
            <div className="space-y-2 ml-4">
              <p>25.1. We may modify these Terms from time to time.</p>
              <p>25.2. Updated Terms may be published through the Platform.</p>
              <p>25.3. Continued use of the Platform after updated Terms become effective constitutes acceptance of the revised Terms to the extent permitted by applicable law.</p>
              <p>25.4. If you do not agree with revised Terms, you must stop using the Platform.</p>
            </div>
          </section>

          {/* Section 26 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">26. DISPUTE RESOLUTION</h2>
            <div className="space-y-2 ml-4">
              <p>26.1. Users are encouraged to contact the Platform&apos;s customer support team regarding booking-related issues before pursuing other remedies.</p>
              <p>26.2. The Platform may, at its discretion, assist Hosts and Players in communicating about disputes.</p>
              <p>26.3. Such assistance does not make the Platform a party to the underlying dispute between a Host and Player.</p>
              <p>26.4. These Terms shall be governed by the laws of India.</p>
              <p>26.5. Any arbitration or jurisdiction provisions applicable to disputes involving the Platform shall be subject to applicable Indian law and the jurisdiction of the courts applicable to the legal entity operating the Platform.</p>
            </div>
          </section>

          {/* Section 27 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">27. SEVERABILITY</h2>
            <div className="ml-4">
              <p>If any provision of these Terms is determined to be invalid, illegal, or unenforceable, the remaining provisions will continue to remain valid and enforceable to the maximum extent permitted by law.</p>
            </div>
          </section>

          {/* Section 28 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">28. ENTIRE AGREEMENT</h2>
            <div className="ml-4">
              <p>These Terms, together with the Privacy Policy, Cancellation and Refund Policy, Host Rules, and other policies displayed on the Platform, constitute the agreement governing your use of the Platform.</p>
            </div>
          </section>

          {/* Section 29 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">29. NO WAIVER</h2>
            <div className="ml-4">
              <p>Our failure to enforce any provision of these Terms does not constitute a waiver of our right to enforce that provision in the future.</p>
            </div>
          </section>

          {/* Section 30 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">30. CONTACT INFORMATION</h2>
            <div className="ml-4 space-y-1">
              <p>For questions, complaints, or support relating to the Platform, please contact:</p>
              <p><strong className="text-white">Platform:</strong> PlayConsole</p>
              <p><strong className="text-white">Email:</strong> support@playconsole.com</p>
              <p><strong className="text-white">Website:</strong> playconsole.com</p>
            </div>
          </section>

          {/* Section 31 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">31. ACCEPTANCE OF TERMS</h2>
            <div className="space-y-2 ml-4">
              <p>By registering an account, making a Booking, listing a Gaming Session, visiting a Host Premises through a Booking, or otherwise using the Platform, you acknowledge that:</p>
              <p>1. You have read these Terms; 2. You understand these Terms; 3. You agree to comply with these Terms; 4. You understand that Hosts operate their own premises and provide their own gaming equipment; 5. You understand that the Platform does not control Host Premises; 6. You understand that Hosts are responsible for their premises, equipment, supervision, and lawful surveillance; 7. You understand that Players are responsible for their conduct and damage they cause; and 8. You understand that violation of these Terms may result in the permanent banning of your Platform account.</p>
              <p className="text-white font-semibold mt-4">
                By continuing to use the Platform, you agree to these Terms and Conditions.
              </p>
            </div>
          </section>
        </div>
      </div>
    </HomeLayout>
  );
}
