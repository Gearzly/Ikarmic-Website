import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Ikarmic AI collects, uses, and protects your personal data — in accordance with UK GDPR and the Data Protection Act 2018.",
  alternates: { canonical: "https://ikarmic.com/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-24">
      <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Legal</p>
      <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
      <p className="text-sm text-neutral-500 mb-2">Effective date: 19 April 2026 · Last reviewed: 19 April 2026</p>
      <p className="text-neutral-400 mb-10 leading-relaxed">
        Ikarmic AI Services and Solutions (&ldquo;Ikarmic&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your personal data
        and respecting your privacy. This Privacy Policy explains how we collect, use, share, and safeguard information
        about you when you visit our website at{" "}
        <a href="https://ikarmic.com" className="text-indigo-400 hover:text-indigo-300">https://ikarmic.com</a>,
        or when you contact us or engage us to provide services.
      </p>
      <p className="text-neutral-400 mb-10 leading-relaxed">
        This policy is written in accordance with the UK General Data Protection Regulation (UK GDPR), the Data
        Protection Act 2018, and (where applicable) the EU General Data Protection Regulation (EU GDPR). Please read
        this policy carefully. If you do not agree with its terms, please discontinue use of our website.
      </p>

      <div className="space-y-12 text-neutral-400">

        {/* 1 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">1. Data Controller</h2>
          <p className="leading-relaxed">
            The data controller responsible for your personal data is Ikarmic AI Services and Solutions. For all
            privacy-related enquiries, please contact us at:
          </p>
          <div className="mt-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-sm space-y-1">
            <p className="text-white font-medium">Ikarmic AI Services and Solutions</p>
            <p>Email: <a href="mailto:hello@ikarmic.com" className="text-indigo-400 hover:text-indigo-300">hello@ikarmic.com</a></p>
            <p>Website: <a href="https://ikarmic.com" className="text-indigo-400 hover:text-indigo-300">https://ikarmic.com</a></p>
          </div>
        </section>

        {/* 2 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">2. Information We Collect</h2>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">2.1 Information you provide directly</h3>
          <p className="mb-3 leading-relaxed">When you interact with our website or contact us, we may collect:</p>
          <ul className="list-disc list-outside ml-5 space-y-2 mb-6">
            <li><span className="text-neutral-300 font-medium">Contact information</span> — your name, email address, phone number, and company or organisation name.</li>
            <li><span className="text-neutral-300 font-medium">Project and business information</span> — details about your AI project, business objectives, technical requirements, timeline, and budget that you include in a contact form or subsequent communications.</li>
            <li><span className="text-neutral-300 font-medium">Correspondence</span> — the content of emails, messages, and other communications you send us.</li>
            <li><span className="text-neutral-300 font-medium">Marketing preferences</span> — your consent or opt-out choices regarding receiving marketing communications from us.</li>
          </ul>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">2.2 Information collected automatically</h3>
          <p className="mb-3 leading-relaxed">When you visit our website, certain technical data is collected automatically, including:</p>
          <ul className="list-disc list-outside ml-5 space-y-2 mb-6">
            <li>Internet Protocol (IP) address (anonymised where required by applicable law).</li>
            <li>Browser type, version, and language.</li>
            <li>Operating system and device type (desktop, mobile, tablet).</li>
            <li>Pages visited, time spent on each page, and navigation paths through the site.</li>
            <li>Referring URLs (the address of the page that directed you to our website) and exit pages.</li>
            <li>Date, time, and duration of your visit.</li>
            <li>General geographic location (country and city level, derived from anonymised IP).</li>
          </ul>
          <p className="mb-6 leading-relaxed">This data is collected primarily through cookies and third-party analytics tools described in Section 9.</p>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">2.3 Sensitive personal data</h3>
          <p className="leading-relaxed">
            We do not intentionally collect any special categories of personal data (also referred to as &ldquo;sensitive&rdquo;
            data), such as health information, racial or ethnic origin, political opinions, religious or philosophical
            beliefs, trade union membership, genetic data, biometric data, or data relating to sexual orientation or
            criminal convictions. Please do not submit such data through our website or contact forms. If we receive
            such data inadvertently, we will delete it promptly.
          </p>
        </section>

        {/* 3 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">3. Legal Bases for Processing</h2>
          <p className="mb-4 leading-relaxed">Where we process personal data about you, we rely on one or more of the following legal bases under UK/EU GDPR Article 6:</p>
          <div className="space-y-4">
            {[
              { title: "Consent — Article 6(1)(a)", body: "Where you have given clear, informed, and freely given consent. For example, accepting analytics or marketing cookies through our cookie preference banner, or opting in to receive promotional communications. You may withdraw consent at any time without affecting the lawfulness of processing before withdrawal." },
              { title: "Contract Performance — Article 6(1)(b)", body: "Where processing is necessary to take pre-contractual steps at your request (such as preparing a project proposal) or to perform a contract to which you are party (such as delivering a consulting engagement or AI development project)." },
              { title: "Legal Obligation — Article 6(1)(c)", body: "Where we are required by law to process your data, for example to comply with tax, financial reporting, anti-money laundering, or other statutory obligations." },
              { title: "Legitimate Interests — Article 6(1)(f)", body: "Where processing is necessary for our legitimate business interests (or those of a third party), provided those interests are not overridden by your rights and freedoms. Our legitimate interests include: understanding how visitors use our website to improve content and performance; maintaining the security of our systems; preventing fraud; and pursuing or defending legal claims. We always carry out a legitimate interests assessment (LIA) before relying on this basis." },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                <p className="text-neutral-200 font-semibold mb-1">{item.title}</p>
                <p className="text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">4. How We Use Your Information</h2>
          <p className="mb-3 leading-relaxed">We use collected personal data for the following purposes:</p>
          <ul className="list-disc list-outside ml-5 space-y-2">
            <li>To respond to your enquiries, questions, and requests for information about our services.</li>
            <li>To prepare and deliver proposals, statements of work, project estimates, and related pre-engagement materials.</li>
            <li>To manage and deliver contracted AI consulting and development services, including project communications, progress reports, and deliverables.</li>
            <li>To process payments, raise invoices, and maintain financial and accounting records as required by law.</li>
            <li>To send service communications, such as important notices about changes to our policies, terms, or your engagement.</li>
            <li>To send marketing or promotional communications where you have consented, or where we have a legitimate interest (for example, to contact previous enquirers about relevant services) and you have not objected.</li>
            <li>To measure, analyse, and improve the performance and content of our website (only where analytics cookies are consented to).</li>
            <li>To detect, investigate, and prevent fraudulent transactions, security breaches, or other harmful or unlawful activity.</li>
            <li>To comply with applicable legal obligations and regulatory requirements.</li>
            <li>To establish, exercise, or defend legal claims.</li>
          </ul>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">5. Disclosure of Your Information</h2>
          <p className="mb-4 leading-relaxed">We do not sell, rent, or trade your personal data to anyone. We may disclose your data only in the following limited circumstances:</p>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">5.1 Service providers and sub-processors</h3>
          <p className="mb-3 leading-relaxed">We engage trusted third-party service providers to help operate our website and business. These parties act as data processors and process data only on our documented instructions. All sub-processors are subject to appropriate data processing agreements and technical and organisational security obligations. Our key sub-processors include:</p>
          <ul className="list-disc list-outside ml-5 space-y-2 mb-6">
            <li><span className="text-neutral-300 font-medium">Google LLC</span> — Google Analytics 4 (website analytics) and Google Workspace (business communications and document management). Data may be transferred to the United States under Standard Contractual Clauses.</li>
            <li><span className="text-neutral-300 font-medium">Sanity.io</span> — Headless content management system used to manage and deliver website content (blog, case studies). Personal data is not stored in the CMS, but server logs may capture IP addresses.</li>
            <li><span className="text-neutral-300 font-medium">Meta Platforms, Inc.</span> — Meta Pixel and advertising measurement tools (only activated when you explicitly consent to marketing cookies). Data may be transferred to the United States under Standard Contractual Clauses.</li>
            <li><span className="text-neutral-300 font-medium">Hostinger International Ltd.</span> — Website hosting and Node.js application infrastructure (Hostinger Business plan). Standard server access logs (including IP addresses) may be captured for security and performance purposes.</li>
            <li><span className="text-neutral-300 font-medium">CRM and project management tools</span> — We may store enquiry data and project communications in SaaS tools (such as CRM or project management platforms) under appropriate data processing agreements. We will disclose these upon request.</li>
          </ul>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">5.2 Legal and regulatory requirements</h3>
          <p className="mb-6 leading-relaxed">We may disclose personal data where required by applicable law, court order, subpoena, governmental authority, or regulatory body. We may also disclose data where we believe in good faith that disclosure is necessary to protect the rights, property, or safety of Ikarmic, our clients, or the public; to prevent fraud; or to enforce our agreements.</p>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">5.3 Business transfers</h3>
          <p className="mb-6 leading-relaxed">In the event of a merger, acquisition, financing, reorganisation, insolvency, or sale of all or part of our business or assets, personal data may be transferred to the acquiring entity as part of that transaction. We will take reasonable steps to notify you of any such change and the subsequent privacy policy that will govern your data.</p>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">5.4 Aggregated and anonymised data</h3>
          <p className="leading-relaxed">We may share aggregated or anonymised data (from which no individual can be identified) with third parties for industry analysis, benchmarking, or research purposes, without restriction.</p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">6. International Data Transfers</h2>
          <p className="mb-3 leading-relaxed">Some of our service providers are located outside the United Kingdom and the European Economic Area. When we transfer personal data to countries that do not provide an equivalent level of data protection, we ensure adequate safeguards are in place, including one or more of the following:</p>
          <ul className="list-disc list-outside ml-5 space-y-2 mb-4">
            <li>Standard Contractual Clauses (SCCs) approved by the European Commission or the UK Information Commissioner&apos;s Office (ICO).</li>
            <li>An adequacy decision by the UK Secretary of State or the European Commission confirming the destination country provides sufficient protection.</li>
            <li>Binding Corporate Rules, approved codes of conduct, or certification mechanisms (where applicable).</li>
            <li>Other legally recognised transfer mechanisms under the UK GDPR or EU GDPR.</li>
          </ul>
          <p className="leading-relaxed">You may obtain a copy of the specific safeguards we rely on for any given transfer by contacting us at <a href="mailto:hello@ikarmic.com" className="text-indigo-400 hover:text-indigo-300">hello@ikarmic.com</a>.</p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">7. Data Retention</h2>
          <p className="mb-3 leading-relaxed">We retain personal data only for as long as is necessary to fulfil the purposes for which it was collected, including satisfying any legal, accounting, or reporting obligations. Our standard retention periods are:</p>
          <ul className="list-disc list-outside ml-5 space-y-2 mb-4">
            <li><span className="text-neutral-300 font-medium">Enquiry and pre-engagement data</span> — retained for up to 24 months from the date of the initial enquiry, unless a longer period is required due to an ongoing business relationship or legal obligation.</li>
            <li><span className="text-neutral-300 font-medium">Client project and delivery data</span> — retained for the duration of the engagement and for at least 6 years following completion of the project, in line with statutory limitation periods for contractual claims under English law.</li>
            <li><span className="text-neutral-300 font-medium">Financial and accounting records</span> — retained for at least 6 years following the relevant financial year end, as required by HMRC and applicable tax regulations.</li>
            <li><span className="text-neutral-300 font-medium">Website analytics data</span> — retained according to the retention settings configured within Google Analytics (by default, up to 26 months), subject to your cookie consent preferences. Data is automatically deleted upon expiry of the set period.</li>
            <li><span className="text-neutral-300 font-medium">Marketing communications data</span> — retained until you opt out, withdraw consent, or we determine it is no longer relevant or proportionate to retain it. We review suppression lists regularly.</li>
            <li><span className="text-neutral-300 font-medium">Cookie consent records</span> — retained for up to 3 years as evidence of consent decisions.</li>
          </ul>
          <p className="leading-relaxed">When personal data is no longer required, it is securely deleted or anonymised in accordance with our data disposal procedures.</p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">8. Your Rights</h2>
          <p className="mb-4 leading-relaxed">Under UK GDPR and the Data Protection Act 2018 (and the equivalent EU GDPR provisions where applicable), you have the following rights with respect to your personal data:</p>
          <div className="space-y-3 mb-6">
            {[
              { right: "Right of Access", desc: "You have the right to request a copy of all personal data we hold about you (a Subject Access Request, or SAR). We will respond within one calendar month, with a possible extension of a further two months for complex or numerous requests." },
              { right: "Right to Rectification", desc: "You have the right to ask us to correct any inaccurate or incomplete personal data we hold about you. We will act promptly to rectify any errors." },
              { right: "Right to Erasure", desc: "Also known as the \"right to be forgotten\". You may request that we delete your personal data where there is no compelling legitimate reason for us to continue processing it, where you have withdrawn consent, or where we have processed data unlawfully." },
              { right: "Right to Restriction", desc: "You may request that we restrict processing of your personal data in certain circumstances, for example while the accuracy of data is being contested, or while we consider an objection to processing." },
              { right: "Right to Data Portability", desc: "Where processing is based on consent or contract and carried out by automated means, you may request that we provide your personal data in a structured, commonly used, machine-readable format, or transmit it directly to another controller where technically feasible." },
              { right: "Right to Object", desc: "You have the right to object at any time to processing of your personal data based on legitimate interests or for direct marketing purposes. We will cease processing unless we can demonstrate compelling legitimate grounds that override your interests." },
              { right: "Automated Decision-Making", desc: "You have the right not to be subject to decisions made solely through automated processing that produce legal or similarly significant effects. We do not currently engage in such processing. If this changes, we will notify you and provide appropriate safeguards." },
              { right: "Right to Withdraw Consent", desc: "Where we rely on your consent to process personal data, you may withdraw that consent at any time without affecting the lawfulness of processing carried out before withdrawal. You can withdraw cookie consent via our cookie preference banner." },
            ].map((item) => (
              <div key={item.right} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                <p className="text-neutral-200 font-semibold mb-1">{item.right}</p>
                <p className="text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="leading-relaxed">To exercise any of the above rights, please contact us at <a href="mailto:hello@ikarmic.com" className="text-indigo-400 hover:text-indigo-300">hello@ikarmic.com</a>. We may need to verify your identity before processing your request. We will not charge a fee unless requests are manifestly unfounded or excessive. You also have the right to lodge a complaint with the Information Commissioner&apos;s Office (ICO):</p>
          <div className="mt-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-sm space-y-1">
            <p className="text-white font-medium">Information Commissioner&apos;s Office (ICO)</p>
            <p>Website: <a href="https://ico.org.uk/make-a-complaint" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300">ico.org.uk/make-a-complaint</a></p>
            <p>Telephone: 0303 123 1113</p>
          </div>
        </section>

        {/* 9 */}
        <section id="cookies">
          <h2 className="text-xl font-bold text-white mb-4">9. Cookies and Tracking Technologies</h2>
          <p className="mb-4 leading-relaxed">Our website uses cookies and similar tracking technologies to recognise returning visitors, measure site performance, and support marketing activities. You can control which non-essential cookies are placed on your device using the cookie preference banner displayed when you first visit the site. You can update your preferences at any time by clearing your browser&apos;s stored cookies and revisiting our website.</p>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">9.1 What is a cookie?</h3>
          <p className="mb-6 leading-relaxed">A cookie is a small text file placed on your browser or device when you visit a website. Cookies allow the website to recognise your device on future visits, remember your preferences, and gather anonymous usage statistics. They do not run programmes or deliver viruses to your computer.</p>
          <h3 className="text-base font-semibold text-neutral-200 mb-3">9.2 Cookie categories we use</h3>
          <div className="space-y-3 mb-6">
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
              <div className="flex items-center justify-between mb-2">
                <p className="text-neutral-200 font-semibold">Essential cookies</p>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400">Always active</span>
              </div>
              <p className="text-sm leading-relaxed mb-2">These cookies are strictly necessary for the website to function and cannot be switched off. They are set in response to actions you take, such as setting your privacy preferences or loading page assets. They do not store personally identifiable information.</p>
              <p className="text-sm text-neutral-500"><code className="text-indigo-400">ikarmic-cookie-consent</code> — Stores your cookie consent preferences. Duration: 1 year.</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
              <div className="flex items-center justify-between mb-2">
                <p className="text-neutral-200 font-semibold">Analytics cookies</p>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-950/60 border border-indigo-800/40 text-indigo-400">Consent required</span>
              </div>
              <p className="text-sm leading-relaxed mb-2">We use Google Analytics 4 to understand how visitors use our website. Data collected is aggregated and anonymised; it cannot be used to identify you as an individual. Google operates as a separate data controller for its own analytics purposes. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300">Google&apos;s Privacy Policy</a>.</p>
              <ul className="text-sm text-neutral-500 space-y-1">
                <li><code className="text-indigo-400">_ga</code> — Distinguishes unique users. Duration: 2 years.</li>
                <li><code className="text-indigo-400">_ga_*</code> — Persists session state for the current measurement ID. Duration: 2 years.</li>
                <li><code className="text-indigo-400">_gid</code> — Distinguishes users (short-lived). Duration: 24 hours.</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
              <div className="flex items-center justify-between mb-2">
                <p className="text-neutral-200 font-semibold">Marketing cookies</p>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-950/60 border border-indigo-800/40 text-indigo-400">Consent required</span>
              </div>
              <p className="text-sm leading-relaxed mb-2">These cookies are placed by advertising partners (currently Meta Platforms, Inc.) to build a profile of your interests and show relevant advertisements on other platforms. These cookies are only activated when you explicitly enable marketing cookies. Meta operates as a separate data controller. See <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300">Meta&apos;s Privacy Policy</a>.</p>
              <ul className="text-sm text-neutral-500 space-y-1">
                <li><code className="text-indigo-400">_fbp</code> — Meta Pixel browser identifier. Duration: 90 days.</li>
                <li><code className="text-indigo-400">_fbc</code> — Meta click identifier (set when clicking a Facebook ad). Duration: 90 days.</li>
              </ul>
            </div>
          </div>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">9.3 Managing cookies in your browser</h3>
          <p className="mb-3 leading-relaxed">In addition to using our consent banner, you can manage cookies directly through your browser settings. Note that disabling certain cookies may affect website functionality.</p>
          <ul className="list-disc list-outside ml-5 space-y-1 text-sm">
            <li>Chrome: <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300">support.google.com</a></li>
            <li>Firefox: <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300">support.mozilla.org</a></li>
            <li>Safari: <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300">support.apple.com</a></li>
            <li>Edge: <a href="https://support.microsoft.com/en-gb/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300">support.microsoft.com</a></li>
          </ul>
        </section>

        {/* 10 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">10. Security</h2>
          <p className="mb-3 leading-relaxed">We implement appropriate technical and organisational measures to protect your personal data against accidental loss, destruction, alteration, unauthorised disclosure, or access. These measures include:</p>
          <ul className="list-disc list-outside ml-5 space-y-2 mb-4">
            <li>TLS/HTTPS encryption for all data transmitted between your browser and our website.</li>
            <li>Strict access controls ensuring only authorised personnel can access client and enquiry data on a need-to-know basis.</li>
            <li>Regular review and testing of our information security policies and procedures.</li>
            <li>Use of reputable, security-accredited third-party service providers with appropriate data processing agreements in place.</li>
          </ul>
          <p className="leading-relaxed">Whilst we take data security seriously, no method of transmission over the internet or electronic storage system is completely secure. We cannot guarantee absolute security, and you share personal data with us at your own risk. In the event of a personal data breach that is likely to result in a high risk to your rights and freedoms, we will notify affected individuals and the ICO as required by applicable law, usually within 72 hours of becoming aware of the breach.</p>
        </section>

        {/* 11 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">11. Children&apos;s Privacy</h2>
          <p className="leading-relaxed">Our website and services are directed at businesses and professionals. They are not intended for use by, and we do not knowingly collect personal data from, anyone under the age of 16. If you are a parent or guardian and believe that your child has provided personal data to us, please contact us at <a href="mailto:hello@ikarmic.com" className="text-indigo-400 hover:text-indigo-300">hello@ikarmic.com</a> and we will take prompt steps to delete that information.</p>
        </section>

        {/* 12 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">12. Third-Party Links</h2>
          <p className="leading-relaxed">Our website may contain links to third-party websites, products, or services — for example, links to resources, social media profiles, or partner organisations. These sites operate under their own privacy policies and we are not responsible for their content or data practices. We encourage you to review the privacy policy of any third-party site before submitting personal data.</p>
        </section>

        {/* 13 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">13. Do Not Track</h2>
          <p className="leading-relaxed">Certain browsers transmit &ldquo;Do Not Track&rdquo; (DNT) signals to websites. Our website does not currently respond to DNT signals at the browser level. Your cookie preferences managed through our consent banner are the primary mechanism by which you control which tracking technologies are active on our site.</p>
        </section>

        {/* 14 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">14. Changes to This Policy</h2>
          <p className="leading-relaxed">We may update this Privacy Policy from time to time to reflect changes in our processing activities, legal obligations, regulatory guidance, or applicable law. The revised policy will be posted on this page with an updated effective date. For material changes — those that significantly affect how we use your data or your rights — we will take reasonable steps to notify you proactively (for example, by displaying a notice on our website or sending an email to individuals with whom we have an active relationship). Your continued use of our website following the posting of changes constitutes your acknowledgement of the updated policy.</p>
        </section>

        {/* 15 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">15. How to Contact Us</h2>
          <p className="mb-4 leading-relaxed">If you have any questions, concerns, or complaints about this Privacy Policy or how we handle your personal data, or if you wish to exercise any of your data subject rights, please contact us:</p>
          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-sm space-y-1 mb-4">
            <p className="text-white font-medium">Ikarmic AI Services and Solutions</p>
            <p>Email: <a href="mailto:hello@ikarmic.com" className="text-indigo-400 hover:text-indigo-300">hello@ikarmic.com</a></p>
          </div>
          <p className="mb-4 leading-relaxed">We will respond to all legitimate requests within one calendar month. We may extend this period by a further two months where requests are complex or numerous; in such cases we will inform you of the extension within the initial one-month period.</p>
          <p className="mb-4 leading-relaxed">If you are dissatisfied with our response, you have the right to lodge a complaint with the supervisory authority. In the UK, this is the Information Commissioner&apos;s Office (ICO):</p>
          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-sm space-y-1">
            <p className="text-white font-medium">Information Commissioner&apos;s Office</p>
            <p>Make a complaint: <a href="https://ico.org.uk/make-a-complaint" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300">ico.org.uk/make-a-complaint</a></p>
            <p>Telephone: 0303 123 1113</p>
          </div>
        </section>

      </div>
    </article>
  );
}
