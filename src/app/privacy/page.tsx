"use client";

import Link from "next/link";
import { HomeLayout } from "@/components/layout/HomeLayout";

export default function PrivacyPage() {
  return (
    <HomeLayout>
      <div className="px-4 md:px-8 py-8 pt-24 pb-24 md:pb-8 max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6b7280] hover:text-white tracking-widest mb-6 transition-colors">
          ← BACK HOME
        </Link>

        <h1 className="font-heading text-2xl md:text-4xl font-extrabold text-white tracking-wide mb-2">
          PRIVACY POLICY
        </h1>
        <p className="text-[#6b7280] text-xs mb-8">Last Updated: August 2026</p>

        <div className="space-y-6 text-sm text-[#a0aec0] leading-relaxed">
          <p>
            Welcome to <strong className="text-white">PlayConsole</strong> (&quot;PlayConsole&quot;, &quot;Platform&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
          </p>
          <p>
            PlayConsole is a digital platform that connects Players with Hosts who provide PlayStation gaming facilities at their physical premises. Players can discover Hosts, view available gaming sessions, make bookings, and use the gaming facilities provided by Hosts.
          </p>
          <p>
            This Privacy Policy explains how PlayConsole collects, uses, stores, processes, and shares information when you use our website, mobile application, and related services.
          </p>
          <p>
            By registering for an account, making a booking, listing a gaming location, or otherwise using PlayConsole, you acknowledge that you have read and understood this Privacy Policy.
          </p>

          {/* Section 1 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">1. INFORMATION WE COLLECT</h2>
            <p className="ml-4 mb-3">We may collect information that you provide directly to us when you use PlayConsole.</p>

            <h3 className="font-heading text-sm font-bold text-white mb-2 ml-4 mt-4">1.1 Account Information</h3>
            <p className="ml-4 mb-2">When creating an account, we may collect:</p>
            <ul className="list-disc ml-10 space-y-1">
              <li>Full name</li>
              <li>Mobile phone number</li>
              <li>Email address</li>
              <li>Date of birth or age information, where required</li>
              <li>Profile photograph, where applicable</li>
              <li>Login credentials or authentication information</li>
              <li>Other information required to create and maintain your account</li>
            </ul>

            <h3 className="font-heading text-sm font-bold text-white mb-2 ml-4 mt-4">1.2 Host Information</h3>
            <p className="ml-4 mb-2">If you register as a Host, we may additionally collect:</p>
            <ul className="list-disc ml-10 space-y-1">
              <li>Host name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Gaming location</li>
              <li>Address or location details</li>
              <li>Information about the PlayStation setup</li>
              <li>Console and controller information</li>
              <li>Gaming facilities</li>
              <li>Session pricing and availability</li>
              <li>House rules</li>
              <li>Bank or payment information required for payouts</li>
              <li>Other information necessary to operate the Host listing</li>
            </ul>

            <h3 className="font-heading text-sm font-bold text-white mb-2 ml-4 mt-4">1.3 Booking Information</h3>
            <p className="ml-4 mb-2">When you make or receive a Booking, we may collect:</p>
            <ul className="list-disc ml-10 space-y-1">
              <li>Booking date, time, and session duration</li>
              <li>Number of Players</li>
              <li>Host information and gaming location</li>
              <li>Booking amount and payment status</li>
              <li>Cancellation and session extension information</li>
              <li>Booking history</li>
            </ul>

            <h3 className="font-heading text-sm font-bold text-white mb-2 ml-4 mt-4">1.4 Payment Information</h3>
            <p className="ml-4 mb-2">Payments may be processed through third-party payment providers. Depending on the payment method used, we may receive information such as:</p>
            <ul className="list-disc ml-10 space-y-1">
              <li>Transaction ID, payment status, and amount paid</li>
              <li>Refund information and payment method type</li>
              <li>Other transaction-related information</li>
            </ul>
            <p className="ml-4 mt-2">We may not directly store complete card, banking, or other sensitive payment credentials where payment processing is handled by a third-party payment provider.</p>

            <h3 className="font-heading text-sm font-bold text-white mb-2 ml-4 mt-4">1.5 Device and Technical Information</h3>
            <p className="ml-4 mb-2">When you access PlayConsole, we may automatically collect certain technical information, including:</p>
            <ul className="list-disc ml-10 space-y-1">
              <li>IP address, device type, operating system, browser type</li>
              <li>Application version and device identifiers</li>
              <li>Language and regional settings</li>
              <li>Date and time of access</li>
              <li>Crash information, performance information, and other technical information</li>
            </ul>

            <h3 className="font-heading text-sm font-bold text-white mb-2 ml-4 mt-4">1.6 Location Information</h3>
            <p className="ml-4 mb-2">Where permitted and where necessary for Platform functionality, we may collect approximate or precise location information to show nearby Hosts, display gaming locations, improve search results, and facilitate Bookings. You may be able to control location permissions through your device settings.</p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">2. HOW WE USE YOUR INFORMATION</h2>

            <h3 className="font-heading text-sm font-bold text-white mb-2 ml-4">2.1 Providing Our Services</h3>
            <p className="ml-4 mb-2">We use information to create and manage accounts, allow Players to discover Hosts, allow Hosts to create gaming listings, process Bookings, confirm sessions, facilitate session extensions, process payments and refunds, provide customer support, and operate and maintain PlayConsole.</p>

            <h3 className="font-heading text-sm font-bold text-white mb-2 ml-4">2.2 Communication</h3>
            <p className="ml-4 mb-2">We may use your information to send booking confirmations, reminders, cancellation notifications, session updates, account-related notifications, security alerts, customer support communications, important changes to our services, and other service-related communications.</p>

            <h3 className="font-heading text-sm font-bold text-white mb-2 ml-4">2.3 Security and Fraud Prevention</h3>
            <p className="ml-4 mb-2">We may process information to detect suspicious activity, prevent fraudulent Bookings and payment abuse, detect account misuse, investigate violations of our Terms, prevent users from circumventing permanent account bans, protect Hosts and Players, and maintain Platform security.</p>

            <h3 className="font-heading text-sm font-bold text-white mb-2 ml-4">2.4 Enforcement of Platform Rules</h3>
            <p className="ml-4 mb-2">Where necessary, we may use information to investigate violations of our Terms and Conditions, including property damage, abuse or harassment, fraud, payment manipulation, unauthorized account use, bypassing Platform fees, multiple accounts, false information, or other prohibited conduct.</p>

            <h3 className="font-heading text-sm font-bold text-white mb-2 ml-4">2.5 Improving PlayConsole</h3>
            <p className="ml-4 mb-2">We may analyze usage information to improve Platform functionality, develop new features, understand user behaviour, improve search and discovery, improve Host and Player experiences, identify technical problems, and improve the performance and security of our services.</p>

            <h3 className="font-heading text-sm font-bold text-white mb-2 ml-4">2.6 Marketing</h3>
            <p className="ml-4">Where permitted by applicable law and subject to any required consent or preferences, we may use your information to send information about new features, promotions, offers, gaming sessions, Platform updates, and other PlayConsole services. You may be able to opt out of certain marketing communications.</p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">3. INFORMATION SHARED WITH HOSTS AND PLAYERS</h2>
            <p className="ml-4">
              PlayConsole may share information between Hosts and Players when necessary to facilitate a Booking. A Host may receive information necessary to provide a booked Gaming Session, and a Player may receive information necessary to locate and access the Host Premises. We aim to limit the information shared to what is reasonably necessary for the relevant Platform service. Users must not misuse information obtained through PlayConsole or use it for purposes unrelated to the Booking.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">4. INFORMATION SHARED WITH SERVICE PROVIDERS</h2>
            <p className="ml-4 mb-2">
              We may use third-party service providers to help operate PlayConsole, including providers involved in payment processing, cloud hosting, database services, authentication, SMS and email delivery, push notifications, analytics, customer support, fraud prevention, security, maps and location services, and other technical infrastructure.
            </p>
            <p className="ml-4">These providers may process information on our behalf as necessary to provide their services.</p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">5. LEGAL AND REGULATORY DISCLOSURES</h2>
            <p className="ml-4">
              We may disclose information where reasonably necessary or legally required to comply with applicable laws, respond to lawful requests from government authorities, investigate suspected unlawful activity, protect the rights, property, or safety of PlayConsole, protect Hosts or Players, prevent fraud or abuse, enforce our Terms and Conditions, or comply with legal proceedings or valid legal processes.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">6. BUSINESS TRANSFERS</h2>
            <p className="ml-4">
              If PlayConsole or substantially all of its assets are acquired, merged, reorganized, or transferred to another entity, information associated with the Platform may be transferred as part of that transaction, subject to applicable law. Where required by law, we will provide appropriate notice regarding such changes.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">7. DATA SECURITY</h2>
            <p className="ml-4 mb-2">
              We take reasonable technical and organizational measures designed to protect personal information against unauthorized access, misuse, alteration, disclosure, loss, or destruction. These measures may include access controls, authentication mechanisms, encryption where appropriate, secure hosting, monitoring, security controls, and internal access restrictions.
            </p>
            <p className="ml-4">
              However, no electronic transmission or storage system can be guaranteed to be completely secure. Accordingly, we cannot guarantee absolute security of your information.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">8. COOKIES AND TRACKING TECHNOLOGIES</h2>
            <p className="ml-4 mb-2">
              PlayConsole may use cookies, SDKs, pixels, local storage, and similar technologies to keep users logged in, remember preferences, maintain sessions, understand how users interact with the Platform, improve performance, analyze usage, detect security issues, and improve Platform functionality.
            </p>
            <p className="ml-4">
              Third-party services integrated into PlayConsole may also use their own cookies or similar technologies. You may be able to manage cookies through your browser or device settings. Disabling certain cookies or tracking technologies may affect some Platform functionality.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">9. LOCATION DATA</h2>
            <p className="ml-4">
              Location information may be used to provide location-based functionality, including discovering Hosts near a Player. Where applicable, location permissions are controlled through the user&apos;s device. You may disable location permissions through your device settings, although certain location-based features may not function properly as a result.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">10. HOST PREMISES AND CCTV</h2>
            <p className="ml-4 mb-2">
              PlayConsole is a booking platform and does not generally operate or control Host Premises. Hosts may independently use CCTV cameras or other surveillance systems at their premises for security purposes.
            </p>
            <p className="ml-4 mb-2">Where CCTV is used:</p>
            <ul className="list-disc ml-10 space-y-1">
              <li>The Host is responsible for operating the surveillance system</li>
              <li>The Host is responsible for complying with applicable law</li>
              <li>The Host is responsible for providing any required notices</li>
              <li>The Host is responsible for determining how long recordings are retained</li>
              <li>The Host is responsible for handling CCTV recordings appropriately</li>
            </ul>
            <p className="ml-4 mt-2">
              PlayConsole does not automatically receive or control CCTV recordings from Host Premises. Where a Host lawfully provides CCTV footage to PlayConsole in connection with an incident, dispute, security matter, or investigation, PlayConsole may process that information for the relevant purpose, subject to applicable law.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">11. PHOTOGRAPHS AND VIDEOS</h2>
            <p className="ml-4 mb-2">
              PlayConsole may provide features that allow users or Hosts to upload photographs, videos, profile images, gaming-location images, or other content. By uploading content to PlayConsole, you confirm that you have the necessary rights or permissions to provide that content.
            </p>
            <p className="ml-4 mb-2">
              You grant PlayConsole a non-exclusive, worldwide, royalty-free license to use, reproduce, display, store, modify, and distribute content you upload where reasonably necessary to operate, improve, or promote the Platform, subject to applicable law.
            </p>
            <p className="ml-4 mb-2">
              Hosts are responsible for ensuring that photographs or videos uploaded by them do not unlawfully capture or disclose another person&apos;s private information.
            </p>
            <p className="ml-4">
              PlayConsole may remove content that violates our Terms, Privacy Policy, applicable law, or the rights of another person.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">12. USER CONTENT</h2>
            <p className="ml-4 mb-2">
              Users may submit reviews, ratings, comments, photos, videos, feedback, suggestions, and other content. You remain responsible for content that you submit.
            </p>
            <p className="ml-4 mb-2">You must not submit content that is:</p>
            <ul className="list-disc ml-10 space-y-1">
              <li>Unlawful or fraudulent</li>
              <li>Threatening or abusive</li>
              <li>Violating another person&apos;s privacy</li>
              <li>Infringing intellectual property rights</li>
              <li>Containing malicious software</li>
              <li>Violating our Terms</li>
            </ul>
            <p className="ml-4 mt-2">We may remove or restrict content that violates these requirements.</p>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">13. DATA RETENTION</h2>
            <p className="ml-4 mb-2">
              We retain personal information for as long as reasonably necessary for the purposes described in this Privacy Policy, including providing our services, maintaining accounts, processing transactions, handling disputes, preventing fraud, enforcing our Terms, maintaining security, complying with legal obligations, and resolving complaints.
            </p>
            <p className="ml-4 mb-2">
              When information is no longer reasonably required, we may delete, anonymize, or otherwise dispose of it in accordance with applicable law and our internal retention practices.
            </p>
            <p className="ml-4">
              Information relating to permanently banned accounts may be retained where reasonably necessary for security, fraud prevention, legal compliance, dispute handling, or enforcement of our Terms.
            </p>
          </section>

          {/* Section 14 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">14. YOUR RIGHTS AND CHOICES</h2>
            <p className="ml-4 mb-2">
              Subject to applicable law, you may have rights regarding your personal information, which may include rights to:
            </p>
            <ul className="list-disc ml-10 space-y-1">
              <li>Request access to certain personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of certain information</li>
              <li>Withdraw consent where processing is based on consent</li>
              <li>Raise concerns regarding processing of your information</li>
              <li>Exercise other rights available under applicable law</li>
            </ul>
            <p className="ml-4 mt-2">
              Some requests may be subject to legal or operational limitations. To exercise applicable rights or raise a privacy concern, contact us using the details provided below.
            </p>
          </section>

          {/* Section 15 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">15. ACCOUNT DELETION</h2>
            <p className="ml-4 mb-2">
              You may request deletion of your PlayConsole account through the available account settings or by contacting us. Upon receiving an account deletion request, we may delete or anonymize information that we are not required or permitted to retain.
            </p>
            <p className="ml-4 mb-2">Certain information may need to be retained where necessary for legal compliance, fraud prevention, security, financial or transaction records, dispute resolution, enforcement of our Terms, or other legitimate or legally permitted purposes.</p>
            <p className="ml-4">
              Deleting your account may prevent you from accessing Bookings, account history, or other Platform features.
            </p>
          </section>

          {/* Section 16 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">16. CHILDREN AND MINORS</h2>
            <p className="ml-4 mb-2">
              PlayConsole is not intended for individuals who are not legally permitted to use the Platform under applicable law. We do not knowingly collect personal information from children in violation of applicable law.
            </p>
            <p className="ml-4">
              If we become aware that information has been collected from a child in circumstances where such collection was not permitted, we may take reasonable steps to delete that information. Hosts may impose additional age restrictions at their gaming locations.
            </p>
          </section>

          {/* Section 17 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">17. THIRD-PARTY SERVICES AND LINKS</h2>
            <p className="ml-4 mb-2">
              PlayConsole may integrate with or contain links to third-party websites, applications, payment services, maps, analytics services, social-media platforms, or other services. We are not responsible for the privacy practices of independent third parties.
            </p>
            <p className="ml-4">
              Your use of third-party services may be governed by their own privacy policies and terms. We encourage you to review the privacy policies of third-party services before providing information to them.
            </p>
          </section>

          {/* Section 18 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">18. INTERNATIONAL DATA PROCESSING</h2>
            <p className="ml-4">
              Some service providers used by PlayConsole may process or store information outside your state or country. Where personal information is transferred or processed across jurisdictions, we will take reasonable steps to comply with applicable data-protection requirements.
            </p>
          </section>

          {/* Section 19 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">19. DATA BREACHES AND SECURITY INCIDENTS</h2>
            <p className="ml-4">
              If we become aware of a security incident involving personal information, we may take reasonable steps to investigate, contain, and remediate the incident. Where required by applicable law, we may notify affected users, regulators, or other relevant parties.
            </p>
          </section>

          {/* Section 20 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">20. FRAUD, SECURITY AND PERMANENT ACCOUNT BANS</h2>
            <p className="ml-4 mb-2">
              We may process information relating to account activity, Bookings, payments, device information, and other relevant information to detect fraud, abuse, and violations of our Terms.
            </p>
            <p className="ml-4 mb-2">
              Where we reasonably believe that a user has seriously or repeatedly violated our Terms, we may permanently ban the user&apos;s account.
            </p>
            <p className="ml-4">
              We may retain limited information necessary to prevent a permanently banned user from creating another account for the purpose of circumventing the ban, subject to applicable law.
            </p>
          </section>

          {/* Section 21 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">21. COMMUNICATIONS</h2>
            <p className="ml-4 mb-2">
              By creating an account or making a Booking, you may receive service-related communications from PlayConsole. These may include OTPs, account verification messages, booking confirmations, booking reminders, payment confirmations, cancellation notifications, session updates, security alerts, and customer-support communications.
            </p>
            <p className="ml-4">
              Service-related communications may continue even if you opt out of promotional communications.
            </p>
          </section>

          {/* Section 22 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">22. CHANGES TO THIS PRIVACY POLICY</h2>
            <p className="ml-4 mb-2">
              We may update this Privacy Policy from time to time. When we make changes, we may update the &quot;Last Updated&quot; date displayed at the beginning of this Privacy Policy. Where required by applicable law, we may provide additional notice regarding material changes.
            </p>
            <p className="ml-4">
              Your continued use of PlayConsole after an updated Privacy Policy becomes effective may constitute acceptance of the updated policy to the extent permitted by law.
            </p>
          </section>

          {/* Section 23 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">23. CONTACT US</h2>
            <div className="ml-4 space-y-1">
              <p>If you have questions, requests, complaints, or concerns regarding this Privacy Policy or the handling of your personal information, you may contact us at:</p>
              <p><strong className="text-white">Platform:</strong> PlayConsole</p>
              <p><strong className="text-white">Email:</strong> support@playconsole.com</p>
              <p><strong className="text-white">Website:</strong> playconsole.com</p>
            </div>
          </section>

          {/* Section 24 */}
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3 tracking-wide border-l-4 border-purple-500 pl-3">24. CONSENT</h2>
            <p className="ml-4 mb-2">
              By registering for an account, making a Booking, creating a Host listing, or otherwise using PlayConsole, you acknowledge that you have read and understood this Privacy Policy.
            </p>
            <p className="ml-4 mb-2">
              Where consent is required under applicable law, we will obtain consent through appropriate mechanisms.
            </p>
            <p className="ml-4">
              You may withdraw consent where permitted by applicable law; however, withdrawal of consent may affect our ability to provide certain Platform services.
            </p>
          </section>
        </div>
      </div>
    </HomeLayout>
  );
}
