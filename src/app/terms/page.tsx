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
            PlayConsole is a digital marketplace and technology platform that connects individuals who wish to play PlayStation 5 (PS5), PlayStation 4 (PS4), and other supported gaming consoles and games (&quot;Players&quot;, &quot;Guests&quot;, or &quot;Users&quot;) with independent individuals or businesses offering gaming facilities at their premises (&quot;Hosts&quot;).
          </p>
          <p>
            Hosts may provide PlayStation consoles, controllers, televisions or monitors, games (digital or physical), internet connectivity, seating, refreshments, and other gaming-related facilities at their own premises.
          </p>
          <p>
            By accessing, registering on, browsing, booking through, hosting through, or otherwise using the Platform, you acknowledge that you have read, understood, and agreed to these Terms and Conditions (&quot;Terms&quot;) and our Privacy Policy, Cancellation and Refund Policy, and Community Guidelines, all incorporated herein by reference.
          </p>
          <p className="text-white font-semibold">
            If you do not agree with these Terms, you must not use the Platform.
          </p>
          <p className="text-white font-semibold">
            IMPORTANT NOTICE: These Terms constitute a legally binding agreement. Users are advised to read them carefully before accessing or using the Platform. By using PlayConsole, every user confirms they have read, understood, and agreed to be bound by these Terms.
          </p>

          {/* Section 1 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">1. DEFINITIONS</h2>
            <div className="space-y-2 ml-4">
              <p><strong className="text-white">&quot;Platform&quot;</strong> means the PlayConsole website, mobile application, software, APIs, and related services operated by us.</p>
              <p><strong className="text-white">&quot;Host&quot;</strong> means an individual or business that lists a gaming location and provides access to gaming equipment and facilities through the Platform.</p>
              <p><strong className="text-white">&quot;Player&quot; or &quot;Guest&quot;</strong> means an individual who books or uses a gaming session through the Platform.</p>
              <p><strong className="text-white">&quot;Gaming Session&quot; or &quot;Session&quot;</strong> means the period of time booked by a Player to use gaming facilities provided by a Host.</p>
              <p><strong className="text-white">&quot;Booking&quot;</strong> means a confirmed reservation made by a Player through the Platform.</p>
              <p><strong className="text-white">&quot;Host Premises&quot;</strong> means the physical location provided by the Host where the Gaming Session takes place.</p>
              <p><strong className="text-white">&quot;Platform Fee&quot; or &quot;Service Fee&quot;</strong> means the commission, booking fee, or service charge retained by PlayConsole for facilitating the transaction, as displayed at checkout.</p>
              <p><strong className="text-white">&quot;Session Price&quot;</strong> means the gross amount charged for the Gaming Session before deduction of Platform Fees and applicable taxes.</p>
              <p><strong className="text-white">&quot;Total Price&quot;</strong> means the final amount payable by the Player, inclusive of the Session Price, Platform Fee, and applicable taxes.</p>
              <p><strong className="text-white">&quot;Host Payout&quot;</strong> means the net amount remitted to the Host after deduction of Platform Fees, applicable taxes, payment processing charges, and any other agreed deductions.</p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">2. ELIGIBILITY AND ACCOUNT REGISTRATION</h2>
            <div className="space-y-2 ml-4">
              <p>2.1. You must be at least eighteen (18) years of age and legally capable of entering into a binding contract under applicable Indian law to use the Platform.</p>
              <p>2.2. The Platform may impose additional age restrictions for particular Hosts, games (e.g., age-rated titles), locations, or services.</p>
              <p>2.3. Hosts may impose additional age restrictions or government-issued identification requirements for their premises.</p>
              <p>2.4. Users are responsible for providing true, complete, accurate, and updated information during registration and booking. Any false, misleading, incomplete, or fraudulent information may result in immediate suspension or permanent termination.</p>
              <p>2.5. We reserve the right to request reasonable verification information—including mobile verification, email verification, government ID, or payment verification—where required for security, fraud prevention, or compliance.</p>
              <p>2.6. Users shall maintain confidentiality of login credentials and remain solely responsible for all activities conducted through their account. Any unauthorized access or breach must be immediately notified to PlayConsole.</p>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">3. ROLE OF THE PLATFORM</h2>
            <div className="space-y-2 ml-4">
              <p>3.1. PlayConsole operates strictly as a technology and booking intermediary connecting Players with Hosts. We do not own, possess, operate, or control the PlayStation consoles, controllers, televisions, furniture, internet connections, gaming rooms, or other equipment provided by Hosts.</p>
              <p>3.2. Hosts are independent providers and remain solely responsible for their premises, equipment, listings, house rules, pricing, and operations.</p>
              <p>3.3. A Host&apos;s listing on the Platform does not mean that PlayConsole owns, operates, manages, supervises, or endorses that Host&apos;s premises, equipment, or conduct.</p>
              <p>3.4. PlayConsole facilitates: discovery of Hosts, booking of Gaming Sessions, payment processing, transparent fee disclosure, booking confirmations, communication between Hosts and Players, reviews and ratings, customer support, dispute facilitation, and other technology-related services.</p>
              <p>3.5. The actual Gaming Session occurs at the Host Premises and involves a direct interaction between the Host and Player. PlayConsole is not present at, and does not supervise, individual Gaming Sessions unless expressly stated otherwise.</p>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">4. BOOKINGS, SESSION PRICING, PLATFORM FEES, AND PAYMENTS</h2>
            <div className="space-y-2 ml-4">
              <p>4.1. Players may browse available Hosts and Gaming Sessions through the Platform. All Session Prices are set by Hosts, subject to Platform guidelines and minimum pricing thresholds.</p>
              <p>4.2. <strong className="text-white">PLATFORM FEE TRANSPARENCY:</strong> Before a Booking is confirmed, the Platform shall display a clear, itemized price breakdown including: (a) Session Price (Host&apos;s listed price); (b) Platform Fee (Service Fee / Commission); (c) Applicable taxes (GST and other statutory levies); (d) Payment processing charges, if any; and (e) Total Price payable by the Player.</p>
              <p>4.3. The Platform Fee is charged by PlayConsole for the use of the Platform&apos;s technology, payment infrastructure, discovery services, customer support, and trust &amp; safety mechanisms. The Platform Fee is non-refundable except where the entire Booking is cancelled in accordance with the Cancellation and Refund Policy.</p>
              <p>4.4. <strong className="text-white">HOST PAYOUT STRUCTURE:</strong> The Host Payout shall be the Session Price less the Platform Fee (commission), applicable payment processing charges, and any tax withholdings required by law. The Host Payout structure and commission percentage shall be communicated to Hosts upon onboarding and may be updated with reasonable notice.</p>
              <p>4.5. All payments are processed through third-party payment gateways and banking channels. Users authorize PlayConsole and its payment partners to process transactions and store payment-related information in accordance with applicable laws.</p>
              <p>4.6. A Booking becomes confirmed only after the booking process has been successfully completed and the Total Price has been successfully processed.</p>
              <p>4.7. Players are responsible for reviewing the itemized price breakdown, booking details (host location, date, time, duration, number of Players, console model, games, house rules), and cancellation policy before confirming a Booking.</p>
              <p>4.8. Players must use the Gaming Session only during the booked time slot. Late arrivals do not entitle the Player to an extension unless agreed by the Host.</p>
              <p>4.9. PlayConsole reserves the right to withhold, delay, reverse, suspend, or cancel payouts or transactions in cases involving disputes, suspicious activity, fraud detection, chargebacks, policy violations, legal complaints, or investigation requirements.</p>
              <p>4.10. <strong className="text-white">NON-CIRCUMVENTION:</strong> Users shall not intentionally move transactions outside the Platform or solicit direct payments for the purpose of avoiding Platform Fees. Where the Platform detects repeated attempts to circumvent its payment system, the relevant account may be permanently banned, and PlayConsole reserves the right to recover damages.</p>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">5. CANCELLATIONS AND REFUNDS</h2>
            <div className="space-y-2 ml-4">
              <p>5.1. Cancellation and refund conditions applicable to a Booking will be displayed through the Platform or communicated at the time of Booking.</p>
              <p>5.2. Certain Bookings may be non-refundable or may be subject to cancellation charges as determined by the Host&apos;s policy and Platform standards.</p>
              <p>5.3. Where a Host cancels a confirmed Booking, the Player may be eligible for a full refund or alternative arrangement according to the applicable cancellation policy.</p>
              <p>5.4. Where a Player cancels a confirmed Booking, refund eligibility shall depend on the cancellation window, Host policy, and Platform standards. The Platform Fee may be retained by PlayConsole in partial cancellation scenarios.</p>
              <p>5.5. Refunds, where applicable, will be processed according to the Platform&apos;s refund policy and applicable payment-provider procedures. Refund timelines may vary depending upon banking channels and financial institutions.</p>
              <p>5.6. The Platform is not responsible for losses or expenses incurred by a Player due to their travel to or from Host Premises, except where liability cannot legally be excluded.</p>
              <p>5.7. No refunds shall be granted where Players fail to attend, arrive late, violate house rules, are removed for misconduct, fail verification requirements, or voluntarily cancel beyond the permitted cancellation period.</p>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">6. HOST RESPONSIBILITIES</h2>
            <div className="space-y-2 ml-4">
              <p>6.1. Hosts are solely responsible for the accuracy of their listings and the gaming facilities they provide.</p>
              <p>6.2. Hosts must provide accurate information regarding: exact location, available console(s) (PS5, PS4, etc.), console model, firmware status, number and type of controllers, games available (digital library or physical discs), gaming setup (TV/monitor size, resolution, refresh rate), session duration, per-session or per-hour pricing, maximum number of Players permitted, facilities (WiFi, refreshments, parking), house rules, age restrictions, and any relevant restrictions.</p>
              <p>6.3. Hosts are responsible for ensuring that the gaming equipment listed by them is reasonably functional, clean, and available during confirmed bookings. Equipment must be in good working order at the start of each Session.</p>
              <p>6.4. Hosts are responsible for maintaining their premises, equipment, and reasonable safety and security measures.</p>
              <p>6.5. Hosts are responsible for supervising Players at their premises to the extent they consider reasonably necessary.</p>
              <p>6.6. Hosts are responsible for any CCTV or surveillance systems installed at their premises and must use such systems in accordance with applicable law. Surveillance equipment must not be installed in private areas such as bathrooms or changing areas.</p>
              <p>6.7. Where required by applicable law, Hosts are responsible for informing Players about CCTV or other surveillance being used at the premises through their listing or house rules.</p>
              <p>6.8. Hosts are responsible for obtaining any licenses, permissions, registrations, or approvals required to legally operate their gaming premises or provide their services, including but not limited to municipal permissions, police intimation (where required), fire safety compliance, and housing society no-objection certificates.</p>
              <p>6.9. Hosts shall not permit illegal substances, narcotic drugs, gambling, violence, exploitation, non-consensual conduct, hate speech, obscenity, public nuisance, or any unlawful activities at the premises.</p>
              <p>6.10. Hosts shall indemnify and keep indemnified PlayConsole against all claims, liabilities, damages, penalties, losses, complaints, and costs arising out of or related to their listing, conduct, omissions, equipment failure, or breach of law.</p>
              <p>6.11. Hosts shall not collect payments, booking fees, or entry fees outside the Platform where the Player was introduced through PlayConsole. Hosts shall not distribute promotional materials, QR codes, or business cards intended to divert future bookings away from the Platform.</p>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">7. PLAYER RESPONSIBILITIES</h2>
            <div className="space-y-2 ml-4">
              <p>7.1. Players must use the Host Premises and gaming equipment responsibly and in accordance with the Host&apos;s reasonable house rules.</p>
              <p>7.2. Players must arrive at the location within the permitted booking period. Late arrivals may result in forfeiture of time without refund.</p>
              <p>7.3. Players must not permit additional persons to use the gaming facilities where the booking does not permit additional Players.</p>
              <p>7.4. Players must not: (a) intentionally damage a PlayStation console, controller, television, monitor, or accessory; (b) throw, hit, bend, break, or intentionally damage controllers or equipment; (c) tamper with cables, electrical equipment, or network settings; (d) open, modify, jailbreak, hack, or attempt to modify a console; (e) install unauthorized software, games, or accounts on Host equipment; (f) attempt to access another person&apos;s account, saved data, or personal information; (g) engage in violence, threatening behaviour, or harassment; (h) engage in unlawful activity or cause unreasonable disturbance; (i) bring unauthorized persons to the premises; (j) attempt to bypass the Platform&apos;s booking or payment system; (k) record or livestream gameplay or other Players without consent where prohibited by Host rules or applicable law.</p>
              <p>7.5. Players are responsible for their own conduct while visiting Host Premises and for any damage caused intentionally or through negligence.</p>
              <p>7.6. Players shall comply with all directions issued by Hosts, venue representatives, and security personnel.</p>
              <p>7.7. Any Player found intoxicated beyond acceptable limits, creating a nuisance, threatening safety, or violating these Terms may be removed from the premises without refund.</p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">8. DAMAGE TO PLAYSTATION, CONTROLLERS, AND HOST PROPERTY</h2>
            <div className="space-y-2 ml-4">
              <p>8.1. PlayStation consoles, controllers, televisions, monitors, furniture, accessories, and other gaming equipment provided at a Host Premises are generally the property or responsibility of the Host.</p>
              <p>8.2. If a Player intentionally or negligently causes physical damage to the Host&apos;s property, the Player may be responsible for the reasonable cost of repair or replacement to the extent permitted by applicable law.</p>
              <p>8.3. Examples of potentially chargeable damage include: broken or sticky controllers; damaged analog sticks or triggers; damaged PlayStation consoles; damaged HDMI, power, or charging cables; broken television or monitor screens; damaged gaming headsets or accessories; damaged furniture; or other physical property damage caused by the Player.</p>
              <p>8.4. The Host may provide evidence relating to alleged damage, including photographs, videos, CCTV footage where lawfully obtained, repair estimates, invoices, or other relevant information.</p>
              <p>8.5. PlayConsole may facilitate communication between the Host and Player regarding a reported damage incident but does not guarantee recovery of any damage amount on behalf of a Host.</p>
              <p>8.6. Normal wear and tear, pre-existing damage, equipment malfunction, or technical failure shall not automatically be treated as damage caused by a Player.</p>
              <p>8.7. Any dispute concerning responsibility for physical damage is primarily between the Host and Player, subject to applicable law. PlayConsole may, at its discretion, assist in dispute resolution but is not a party to the underlying dispute.</p>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">9. SURVEILLANCE AND SECURITY</h2>
            <div className="space-y-2 ml-4">
              <p>9.1. Gaming Sessions take place at Host-controlled premises.</p>
              <p>9.2. Hosts are responsible for determining appropriate supervision and security measures at their premises.</p>
              <p>9.3. PlayConsole does not continuously supervise or monitor Host Premises.</p>
              <p>9.4. PlayConsole is not responsible for providing security personnel, CCTV, guards, or physical supervision at Host Premises unless expressly stated otherwise.</p>
              <p>9.5. Hosts may use CCTV or other lawful surveillance systems for security purposes, subject to applicable law and privacy obligations.</p>
              <p>9.6. Where legally required, Hosts must provide appropriate notice regarding CCTV or other surveillance.</p>
              <p>9.7. Surveillance must not be conducted in areas where individuals have a reasonable expectation of privacy.</p>
              <p>9.8. PlayConsole does not guarantee that CCTV or any other surveillance system will be available at a Host location.</p>
              <p>9.9. In the event of theft, violence, property damage, or suspected unlawful activity, the affected person should immediately contact the appropriate law-enforcement authorities.</p>
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">10. SESSION EXTENSION AND OFFLINE PAYMENTS</h2>
            <div className="space-y-2 ml-4">
              <p>10.1. A Player may request additional gaming time if the Host is available and willing to provide it.</p>
              <p>10.2. Additional time may require an additional payment, which should be processed through the Platform where a session-extension feature is available.</p>
              <p>10.3. Players and Hosts must not intentionally use offline payments, cash transactions, UPI transfers, or other arrangements to circumvent applicable Platform Fees.</p>
              <p>10.4. An extension of a Gaming Session does not automatically form part of the original Booking unless it is recorded through the Platform or otherwise authorized by PlayConsole.</p>
            </div>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">11. HOST PROPERTY AND PERSONAL BELONGINGS</h2>
            <div className="space-y-2 ml-4">
              <p>11.1. Players are responsible for their personal belongings while visiting Host Premises.</p>
              <p>11.2. PlayConsole does not take custody of Player belongings.</p>
              <p>11.3. To the maximum extent permitted by applicable law, PlayConsole is not responsible for loss, theft, or damage to personal belongings left at Host Premises.</p>
              <p>11.4. Hosts are responsible for taking reasonable precautions regarding their own property and gaming equipment.</p>
              <p>11.5. Players should avoid bringing unnecessary valuables to a Gaming Session.</p>
            </div>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">12. PERSONAL SAFETY AND MEDICAL INCIDENTS</h2>
            <div className="space-y-2 ml-4">
              <p>12.1. Players understand that they are visiting privately operated Host Premises.</p>
              <p>12.2. Players should exercise reasonable care for their own safety while visiting a Host location.</p>
              <p>12.3. Hosts are responsible for maintaining their premises in accordance with applicable laws and reasonable safety requirements, including adequate ventilation, electrical safety, and fire safety measures.</p>
              <p>12.4. PlayConsole does not control the physical condition of Host Premises and cannot guarantee that every Host Premises will be free from hazards.</p>
              <p>12.5. Users acknowledge that gaming sessions may involve extended screen time, repetitive motion, loud audio, and competitive interaction, which may carry health risks for certain individuals. Every attendee shall remain personally responsible for evaluating their own physical condition and comfort before attending any Session.</p>
              <p>12.6. PlayConsole shall not be liable for any medical condition, allergic reaction, panic attack, repetitive strain injury, eye strain, motion sickness, emotional distress, or health incident occurring during participation in any Gaming Session, except where liability cannot legally be excluded.</p>
              <p>12.7. Users expressly consent that in emergency situations, Hosts or PlayConsole may contact emergency services or medical personnel where reasonably necessary.</p>
            </div>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">13. PROHIBITED CONDUCT</h2>
            <div className="space-y-2 ml-4">
              <p>Users must not use the Platform or Host Premises to:</p>
              <p>13.1. Damage or intentionally misuse property;</p>
              <p>13.2. Engage in violence or threatening behaviour;</p>
              <p>13.3. Threaten or harass another person, including sexual harassment, stalking, or intimidation;</p>
              <p>13.4. Engage in unlawful activity, including possession or distribution of illegal drugs or narcotics;</p>
              <p>13.5. Provide false information or impersonate another person;</p>
              <p>13.6. Use another person&apos;s account;</p>
              <p>13.7. Create multiple accounts to circumvent a ban;</p>
              <p>13.8. Manipulate bookings, payments, or Platform systems;</p>
              <p>13.9. Circumvent Platform fees through offline transactions;</p>
              <p>13.10. Conduct unauthorized offline bookings;</p>
              <p>13.11. Attempt to manipulate ratings or reviews;</p>
              <p>13.12. Attempt to gain unauthorized access to Platform systems or Host equipment;</p>
              <p>13.13. Interfere with the operation of the Platform;</p>
              <p>13.14. Upload unlawful, infringing, obscene, or extremist content;</p>
              <p>13.15. Violate the privacy or rights of another person, including recording without consent;</p>
              <p>13.16. Violate applicable laws or regulations, including state-specific gaming, gambling, or excise laws.</p>
            </div>
          </section>

          {/* Section 14 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">14. CHARGEBACKS, PAYMENT REVERSALS, AND FRAUD PREVENTION</h2>
            <div className="space-y-2 ml-4">
              <p>14.1. Users shall not initiate fraudulent chargebacks, payment disputes, or unauthorized reversal claims after valid participation, booking utilization, or authorized transactions.</p>
              <p>14.2. Where any chargeback, reversal, or payment dispute is initiated, PlayConsole reserves the right to suspend accounts, recover dues, withhold payouts, initiate recovery proceedings, or report suspicious conduct.</p>
              <p>14.3. PlayConsole may use fraud detection systems, risk assessment tools, verification mechanisms, and behavioral analytics to identify suspicious activities.</p>
            </div>
          </section>

          {/* Section 15 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">15. PERMANENT ACCOUNT BAN AND ENFORCEMENT</h2>
            <div className="space-y-2 ml-4">
              <p>15.1. PlayConsole may permanently ban, block, suspend, or terminate a user&apos;s account where we reasonably believe that the user has violated these Terms or poses a safety, security, fraud, or legal risk.</p>
              <p>15.2. Circumstances that may result in a permanent ban include: intentionally or negligently damaging Host property; repeated misuse of gaming equipment; violence or threatening behaviour; harassment, sexual misconduct, or abusive conduct; unlawful activity; fraud; providing false information; payment manipulation; attempting to bypass Platform fees; creating multiple accounts to avoid enforcement; manipulating bookings or ratings; serious violations of Host house rules; or any other serious or repeated violation of these Terms.</p>
              <p>15.3. A permanent ban means that the user will no longer be permitted to use the Platform through the banned account.</p>
              <p>15.4. We may take reasonable measures to prevent a permanently banned user from creating or using another account to circumvent the ban.</p>
              <p>15.5. Where necessary for safety, fraud prevention, or protection of users and Hosts, we may permanently ban an account without prior notice.</p>
              <p>15.6. A permanently banned user must not use another person&apos;s account to access the Platform.</p>
              <p>15.7. We may retain information reasonably necessary for security, fraud prevention, dispute handling, legal compliance, and enforcement of these Terms, subject to applicable law.</p>
            </div>
          </section>

          {/* Section 16 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">16. REVIEWS, RATINGS, AND USER GENERATED CONTENT</h2>
            <div className="space-y-2 ml-4">
              <p>16.1. Players and Hosts may submit ratings, reviews, photographs, feedback, or other content relating to their experiences on the Platform.</p>
              <p>16.2. Reviews should represent the user&apos;s genuine experience and must not be fake, defamatory, misleading, or harassing.</p>
              <p>16.3. Users must not submit fake reviews, manipulate ratings, threaten another user to obtain a review, or use reviews to harass another person.</p>
              <p>16.4. By submitting content to the Platform, you grant PlayConsole a non-exclusive, worldwide, perpetual, royalty-free, transferable, and sub-licensable license to use, reproduce, modify, display, and distribute such content for operating, improving, promoting, and marketing the Platform, subject to applicable law.</p>
              <p>16.5. PlayConsole reserves the right to moderate, edit, remove, restrict, or refuse publication of any user-generated content that violates these Terms or applicable law.</p>
              <p>16.6. Reviews and ratings are subjective opinions of independent users and PlayConsole does not guarantee their accuracy or authenticity.</p>
            </div>
          </section>

          {/* Section 17 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">17. SOCIAL MEDIA, RECORDING, AND MEDIA RELEASE</h2>
            <div className="space-y-2 ml-4">
              <p>17.1. Users acknowledge that photographs, audio recordings, video recordings, livestreams, and other visual or audio content may be created during Gaming Sessions hosted through the Platform.</p>
              <p>17.2. By attending a Gaming Session where recording is permitted, each User voluntarily grants PlayConsole, the Host, and their authorized representatives permission to capture, record, and use the User&apos;s image, likeness, appearance, voice, and participation, provided they are in compliance with applicable law. Such consent extends to incidental and group photography.</p>
              <p>17.3. Users who do not wish to be photographed or recorded must notify the Host before entering the Session. While reasonable efforts will be made to accommodate such requests, PlayConsole cannot guarantee that Users will not appear incidentally in crowd photographs or background footage.</p>
              <p>17.4. Users who voluntarily upload photographs or videos to the Platform or tag PlayConsole on social media grant PlayConsole a worldwide, perpetual, irrevocable, non-exclusive, transferable, sub-licensable, and royalty-free license to reproduce, publish, edit, display, and distribute such content for advertising, marketing, promotional, and business purposes.</p>
            </div>
          </section>

          {/* Section 18 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">18. ACCOUNT SECURITY</h2>
            <div className="space-y-2 ml-4">
              <p>18.1. Users are responsible for maintaining the security of their account credentials.</p>
              <p>18.2. Users must not share their accounts with other persons.</p>
              <p>18.3. Users must immediately notify us if they believe that their account has been accessed without authorization.</p>
              <p>18.4. PlayConsole is not responsible for losses arising from a user&apos;s failure to maintain the security of their account, except where liability cannot legally be excluded.</p>
            </div>
          </section>

          {/* Section 19 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">19. INTELLECTUAL PROPERTY</h2>
            <div className="space-y-2 ml-4">
              <p>19.1. All Platform software, trademarks, logos, designs, graphics, text, interfaces, algorithms, and other content are owned by or licensed to PlayConsole.</p>
              <p>19.2. Users may not copy, reproduce, modify, distribute, reverse engineer, sell, scrape, or commercially exploit Platform content without prior written permission.</p>
              <p>19.3. PlayStation, PS5, PS4, DualSense, and related marks are trademarks of Sony Interactive Entertainment Inc. PlayConsole is not affiliated with, endorsed by, or sponsored by Sony Interactive Entertainment unless expressly stated otherwise.</p>
            </div>
          </section>

          {/* Section 20 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">20. PRIVACY AND DATA PROTECTION</h2>
            <div className="space-y-2 ml-4">
              <p>20.1. Your use of the Platform is subject to our Privacy Policy.</p>
              <p>20.2. We may collect and process information necessary to provide bookings, payments, account management, customer support, fraud prevention, security, and other Platform services.</p>
              <p>20.3. Information collected may include name, contact details, government identification, profile photographs, device information, IP address, geolocation data, booking history, payment information, communication records, and behavioral data.</p>
              <p>20.4. Hosts and Players must handle personal information obtained through the Platform responsibly and in accordance with applicable law, including the Digital Personal Data Protection Act, 2023.</p>
              <p>20.5. Users shall not misuse, exploit, circulate, disclose, sell, publish, or commercially use the personal information or contact details of any other user without their explicit consent.</p>
              <p>20.6. Users shall not engage in repeated unsolicited communication, spamming, stalking, intimidation, or harassment using information obtained through the Platform.</p>
            </div>
          </section>

          {/* Section 21 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">21. PLATFORM DISCLAIMER</h2>
            <div className="space-y-2 ml-4">
              <p>21.1. Hosts are independent providers and are responsible for their premises, equipment, listings, services, and conduct.</p>
              <p>21.2. PlayConsole does not guarantee: the condition of a Host&apos;s PlayStation console; the condition of controllers; the availability of particular games; internet speed or availability; the quality of the gaming experience; the safety or security of Host Premises; the accuracy of all Host-provided information; the conduct of a Host; the conduct of a Player; the availability of CCTV or surveillance; that a Host will provide every facility described in a listing; or that a Player will comply with every Host rule.</p>
              <p>21.3. PlayConsole is not responsible for physical damage to Host property caused by a Player, except to the extent liability cannot legally be excluded.</p>
              <p>21.4. PlayConsole is not responsible for personal injury, theft, property loss, or other incidents occurring at Host Premises except to the extent such liability cannot legally be excluded under applicable Indian law.</p>
              <p>21.5. PlayConsole does not guarantee that disputes between Hosts and Players will be resolved.</p>
            </div>
          </section>

          {/* Section 22 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">22. LIMITATION OF LIABILITY</h2>
            <div className="space-y-2 ml-4">
              <p>22.1. To the maximum extent permitted by applicable law, PlayConsole, its owners, directors, employees, affiliates, contractors, and service providers shall not be liable for indirect, incidental, special, consequential, or punitive damages arising from the use of the Platform or interactions between Hosts and Players.</p>
              <p>22.2. This includes claims relating to: damage to gaming equipment; damage to Host property; loss or theft of personal belongings; Host-Player disputes; conduct of other users; events occurring at Host Premises; equipment malfunction; internet failure; game availability; cancellation by a Host or Player; or temporary Platform unavailability.</p>
              <p>22.3. In no event shall the aggregate liability of PlayConsole exceed the amount actually received by PlayConsole from the concerned user in relation to the disputed transaction.</p>
              <p>22.4. Nothing in these Terms excludes or limits liability that cannot legally be excluded or limited under applicable Indian law.</p>
            </div>
          </section>

          {/* Section 23 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">23. INDEMNIFICATION</h2>
            <div className="space-y-2 ml-4">
              <p>23.1. To the extent permitted by applicable law, you agree to indemnify and hold harmless PlayConsole, its owners, directors, employees, affiliates, contractors, and service providers from claims, losses, liabilities, damages, costs, and expenses arising from: your breach of these Terms; your unlawful conduct; damage caused by you to Host property; your violation of another person&apos;s rights; your misuse of the Platform; your violation of applicable law; or your conduct at a Host Premises.</p>
            </div>
          </section>

          {/* Section 24 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">24. LEGAL COMPLIANCE</h2>
            <div className="space-y-2 ml-4">
              <p>24.1. Users must comply with all applicable Indian laws and regulations.</p>
              <p>24.2. Hosts are responsible for ensuring that their gaming premises and activities comply with applicable local requirements, including municipal laws, police regulations, housing society rules, fire safety requirements, and zoning regulations.</p>
              <p>24.3. Hosts must obtain any permissions, registrations, licenses, or approvals required by law to operate a commercial or semi-commercial gaming facility.</p>
              <p>24.4. Players must comply with applicable laws while using the Platform and visiting Host Premises.</p>
              <p>24.5. We may cooperate with law-enforcement authorities where required by applicable law or valid legal process.</p>
            </div>
          </section>

          {/* Section 25 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">25. TAXATION AND FINANCIAL COMPLIANCE</h2>
            <div className="space-y-2 ml-4">
              <p>25.1. Hosts, vendors, and independent service providers shall remain solely responsible for determining and complying with all applicable taxation obligations including GST, income tax, professional tax, or other statutory levies.</p>
              <p>25.2. PlayConsole may issue invoices, transaction summaries, payout statements, or tax-related documentation electronically.</p>
              <p>25.3. PlayConsole may deduct commissions, platform fees, taxes, or processing charges wherever applicable under law before remitting Host Payouts.</p>
            </div>
          </section>

          {/* Section 26 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">26. PLATFORM AVAILABILITY AND TECHNICAL INTERRUPTIONS</h2>
            <div className="space-y-2 ml-4">
              <p>26.1. We do not guarantee that the Platform will always be available, uninterrupted, secure, or error-free.</p>
              <p>26.2. We may temporarily suspend or modify Platform services for maintenance, upgrades, security, technical issues, or other operational reasons.</p>
              <p>26.3. We are not responsible for interruptions caused by circumstances beyond our reasonable control, including acts of God, pandemics, governmental actions, internet failures, cyberattacks, natural disasters, riots, strikes, or technical disruptions.</p>
            </div>
          </section>

          {/* Section 27 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">27. MODIFICATION OF TERMS</h2>
            <div className="space-y-2 ml-4">
              <p>27.1. We may modify these Terms from time to time.</p>
              <p>27.2. Updated Terms may be published through the Platform.</p>
              <p>27.3. Continued use of the Platform after updated Terms become effective constitutes acceptance of the revised Terms to the extent permitted by applicable law.</p>
              <p>27.4. If you do not agree with revised Terms, you must stop using the Platform.</p>
            </div>
          </section>

          {/* Section 28 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">28. DISPUTE RESOLUTION</h2>
            <div className="space-y-2 ml-4">
              <p>28.1. Users are encouraged to contact PlayConsole&apos;s customer support team regarding booking-related issues before pursuing other remedies.</p>
              <p>28.2. PlayConsole may, at its discretion, assist Hosts and Players in communicating about disputes. Such assistance does not make PlayConsole a party to the underlying dispute between a Host and Player.</p>
              <p>28.3. These Terms shall be governed by and construed in accordance with the laws of India.</p>
              <p>28.4. Any dispute arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the competent courts at Mumbai, Maharashtra.</p>
            </div>
          </section>

          {/* Section 29 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">29. SEVERABILITY</h2>
            <div className="ml-4">
              <p>29.1. If any provision of these Terms is determined to be invalid, illegal, or unenforceable, the remaining provisions will continue to remain valid and enforceable to the maximum extent permitted by law.</p>
            </div>
          </section>

          {/* Section 30 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">30. ENTIRE AGREEMENT</h2>
            <div className="ml-4">
              <p>30.1. These Terms, together with the Privacy Policy, Cancellation and Refund Policy, Host Rules, Community Guidelines, and other policies displayed on the Platform, constitute the complete and entire agreement governing your use of the Platform and supersede all prior understandings, representations, or communications.</p>
            </div>
          </section>

          {/* Section 31 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">31. NO WAIVER</h2>
            <div className="ml-4">
              <p>31.1. Our failure to enforce any provision of these Terms does not constitute a waiver of our right to enforce that provision in the future.</p>
            </div>
          </section>

          {/* Section 32 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">32. SURVIVAL OF RIGHTS AND OBLIGATIONS</h2>
            <div className="ml-4">
              <p>32.1. All provisions relating to indemnity, limitation of liability, intellectual property, dispute resolution, payment recovery, confidentiality, privacy obligations, governing law, and survival clauses shall continue to remain valid and enforceable notwithstanding suspension, termination, or discontinuation of Platform usage.</p>
            </div>
          </section>

          {/* Section 33 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">33. CONTACT INFORMATION</h2>
            <div className="ml-4 space-y-1">
              <p>For questions, complaints, support, or legal communication relating to the Platform, please contact:</p>
              <p><strong className="text-white">Platform:</strong> PlayConsole</p>
              <p><strong className="text-white">Email:</strong> support@playconsole.com</p>
              <p><strong className="text-white">Website:</strong> playconsole.com</p>
            </div>
          </section>

          {/* Section 34 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">34. ACCEPTANCE OF TERMS</h2>
            <div className="space-y-2 ml-4">
              <p>By registering an account, making a Booking, listing a Gaming Session, visiting a Host Premises through a Booking, or otherwise using the Platform, you acknowledge that:</p>
              <p>34.1. You have read, understood, and agree to comply with these Terms;</p>
              <p>34.2. You understand that Hosts operate their own premises and provide their own gaming equipment;</p>
              <p>34.3. You understand that PlayConsole does not control Host Premises or equipment;</p>
              <p>34.4. You understand that Hosts are responsible for their premises, equipment, supervision, and lawful surveillance;</p>
              <p>34.5. You understand that Players are responsible for their conduct and damage they cause;</p>
              <p>34.6. You understand that Platform Fees will be clearly disclosed before each Booking is confirmed;</p>
              <p>34.7. You understand that Host Payouts are subject to deduction of Platform Fees and applicable charges;</p>
              <p>34.8. You understand that violation of these Terms may result in the permanent banning of your Platform account; and</p>
              <p>34.9. You voluntarily assume all risks associated with attending or hosting Gaming Sessions facilitated through the Platform.</p>
              <p className="text-white font-semibold mt-4">
                By continuing to use the Platform, you agree to these Terms and Conditions in their entirety.
              </p>
            </div>
          </section>
        </div>
      </div>
    </HomeLayout>
  );
}
