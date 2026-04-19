import type { ReactNode } from 'react';

/* ── Shared layout helpers ─────────────────────────────────────────────── */

function Sec({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="space-y-4 scroll-mt-28">
      <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2">{title}</h2>
      <div className="text-[#A7B1D8] leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

function Sub({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="text-base font-medium text-white/90">{title}</h3>
      <div className="text-[#A7B1D8] leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

function Ul({ children }: { children: ReactNode }) {
  return (
    <ul className="list-disc list-outside ml-5 space-y-1.5 text-[#A7B1D8]">{children}</ul>
  );
}

function InfoBox({ children }: { children: ReactNode }) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-[#A7B1D8] space-y-0.5">
      {children}
    </div>
  );
}

function Right({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
      <p className="text-sm font-semibold text-white mb-1">{title}</p>
      <p className="text-sm text-[#A7B1D8] leading-relaxed">{children}</p>
    </div>
  );
}

function CookieBadge({ label }: { label: string }) {
  return (
    <code className="text-indigo-300 text-xs bg-white/5 px-1.5 py-0.5 rounded font-mono">
      {label}
    </code>
  );
}

/* ── Privacy Policy page ───────────────────────────────────────────────── */

const EFFECTIVE_DATE = '19 April 2026';
const COMPANY = 'Ikarmic AI Services and Solutions';
const SITE_URL = 'https://ikarmic.com';
const EMAIL = 'hello@ikarmic.com';

const Privacy = () => {
  return (
    <main className="relative pt-24 pb-20">
      <div className="w-full px-6 lg:px-12">
        <article className="max-w-4xl mx-auto glass-card rounded-3xl p-8 lg:p-12 space-y-10">

          {/* Header */}
          <header>
            <span className="micro-label block mb-4">LEGAL</span>
            <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-3">Privacy Policy</h1>
            <p className="text-[#A7B1D8] text-sm">
              Effective date: {EFFECTIVE_DATE} &nbsp;·&nbsp; Last reviewed: {EFFECTIVE_DATE}
            </p>
          </header>

          {/* Intro */}
          <section className="text-[#A7B1D8] leading-relaxed space-y-3">
            <p>
              {COMPANY} ("Ikarmic", "we", "us", or "our") is committed to protecting your personal data
              and respecting your privacy. This Privacy Policy explains how we collect, use, share, and
              safeguard information about you when you visit our website at{' '}
              <a href={SITE_URL} className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">{SITE_URL}</a>,
              or when you contact us or engage us to provide services.
            </p>
            <p>
              This policy is written in accordance with the UK General Data Protection Regulation
              (UK GDPR), the Data Protection Act 2018, and (where applicable) the EU General Data
              Protection Regulation (EU GDPR). Please read this policy carefully. If you do not agree
              with its terms, please discontinue use of our website.
            </p>
          </section>

          {/* 1 */}
          <Sec id="controller" title="1. Data Controller">
            <p>
              The data controller responsible for your personal data is {COMPANY}.
              For all privacy-related enquiries, please contact us at:
            </p>
            <InfoBox>
              <p className="font-semibold text-white">{COMPANY}</p>
              <p>
                Email:{' '}
                <a href={`mailto:${EMAIL}`} className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">
                  {EMAIL}
                </a>
              </p>
              <p>
                Website:{' '}
                <a href={SITE_URL} className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">
                  {SITE_URL}
                </a>
              </p>
            </InfoBox>
          </Sec>

          {/* 2 */}
          <Sec id="data-collected" title="2. Information We Collect">
            <Sub title="2.1 Information you provide directly">
              <p>When you interact with our website or contact us, we may collect:</p>
              <Ul>
                <li><strong className="text-white">Contact information</strong> — your name, email address, phone number, and company or organisation name.</li>
                <li><strong className="text-white">Project and business information</strong> — details about your AI project, business objectives, technical requirements, timeline, and budget that you include in a contact form or subsequent communications.</li>
                <li><strong className="text-white">Correspondence</strong> — the content of emails, messages, and other communications you send us.</li>
                <li><strong className="text-white">Marketing preferences</strong> — your consent or opt-out choices regarding receiving marketing communications from us.</li>
              </Ul>
            </Sub>
            <Sub title="2.2 Information collected automatically">
              <p>When you visit our website, certain technical data is collected automatically, including:</p>
              <Ul>
                <li>Internet Protocol (IP) address (anonymised where required by applicable law).</li>
                <li>Browser type, version, and language.</li>
                <li>Operating system and device type (desktop, mobile, tablet).</li>
                <li>Pages visited, time spent on each page, and navigation paths through the site.</li>
                <li>Referring URLs (the address of the page that directed you to our website) and exit pages.</li>
                <li>Date, time, and duration of your visit.</li>
                <li>General geographic location (country and city level, derived from anonymised IP).</li>
              </Ul>
              <p>
                This data is collected primarily through cookies and third-party analytics tools described
                in Section 9.
              </p>
            </Sub>
            <Sub title="2.3 Sensitive personal data">
              <p>
                We do not intentionally collect any special categories of personal data (also referred to
                as "sensitive" data), such as health information, racial or ethnic origin, political opinions,
                religious or philosophical beliefs, trade union membership, genetic data, biometric data,
                or data relating to sexual orientation or criminal convictions. Please do not submit such
                data through our website or contact forms. If we receive such data inadvertently, we will
                delete it promptly.
              </p>
            </Sub>
          </Sec>

          {/* 3 */}
          <Sec id="legal-bases" title="3. Legal Bases for Processing">
            <p>
              Where we process personal data about you, we rely on one or more of the following legal
              bases under UK/EU GDPR Article 6:
            </p>
            <div className="space-y-3 mt-2">
              <Right title="Consent — Article 6(1)(a)">
                Where you have given clear, informed, and freely given consent. For example, accepting
                analytics or marketing cookies through our cookie preference banner, or opting in to
                receive promotional communications. You may withdraw consent at any time without
                affecting the lawfulness of processing before withdrawal.
              </Right>
              <Right title="Contract Performance — Article 6(1)(b)">
                Where processing is necessary to take pre-contractual steps at your request (such as
                preparing a project proposal) or to perform a contract to which you are party (such as
                delivering a consulting engagement or AI development project).
              </Right>
              <Right title="Legal Obligation — Article 6(1)(c)">
                Where we are required by law to process your data, for example to comply with tax,
                financial reporting, anti-money laundering, or other statutory obligations.
              </Right>
              <Right title="Legitimate Interests — Article 6(1)(f)">
                Where processing is necessary for our legitimate business interests (or those of a third
                party), provided those interests are not overridden by your rights and freedoms. Our
                legitimate interests include: understanding how visitors use our website to improve
                content and performance; maintaining the security of our systems; preventing fraud;
                and pursuing or defending legal claims. We always carry out a legitimate interests
                assessment (LIA) before relying on this basis.
              </Right>
            </div>
          </Sec>

          {/* 4 */}
          <Sec id="use" title="4. How We Use Your Information">
            <p>We use collected personal data for the following purposes:</p>
            <Ul>
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
            </Ul>
          </Sec>

          {/* 5 */}
          <Sec id="disclosure" title="5. Disclosure of Your Information">
            <p>
              We do not sell, rent, or trade your personal data to anyone. We may disclose your data
              only in the following limited circumstances:
            </p>
            <Sub title="5.1 Service providers and sub-processors">
              <p>
                We engage trusted third-party service providers to help operate our website and business.
                These parties act as data processors and process data only on our documented instructions.
                All sub-processors are subject to appropriate data processing agreements and technical and
                organisational security obligations. Our key sub-processors include:
              </p>
              <Ul>
                <li><strong className="text-white">Google LLC</strong> — Google Analytics 4 (website analytics) and Google Workspace (business communications and document management). Data may be transferred to the United States under Standard Contractual Clauses.</li>
                <li><strong className="text-white">Sanity.io</strong> — Headless content management system used to manage and deliver website content (blog, case studies). Personal data is not stored in the CMS, but server logs may capture IP addresses.</li>
                <li><strong className="text-white">Meta Platforms, Inc.</strong> — Meta Pixel and advertising measurement tools (only activated when you explicitly consent to marketing cookies). Data may be transferred to the United States under Standard Contractual Clauses.</li>
                <li><strong className="text-white">Hostinger International Ltd.</strong> — Website hosting and Node.js application infrastructure (Hostinger Business plan). Standard server access logs (including IP addresses) may be captured for security and performance purposes.</li>
                <li><strong className="text-white">CRM and project management tools</strong> — We may store enquiry data and project communications in SaaS tools (such as CRM or project management platforms) under appropriate data processing agreements. We will disclose these upon request.</li>
              </Ul>
            </Sub>
            <Sub title="5.2 Legal and regulatory requirements">
              <p>
                We may disclose personal data where required by applicable law, court order, subpoena,
                governmental authority, or regulatory body. We may also disclose data where we believe
                in good faith that disclosure is necessary to protect the rights, property, or safety of
                Ikarmic, our clients, or the public; to prevent fraud; or to enforce our agreements.
              </p>
            </Sub>
            <Sub title="5.3 Business transfers">
              <p>
                In the event of a merger, acquisition, financing, reorganisation, insolvency, or sale
                of all or part of our business or assets, personal data may be transferred to the acquiring
                entity as part of that transaction. We will take reasonable steps to notify you of any
                such change and the subsequent privacy policy that will govern your data.
              </p>
            </Sub>
            <Sub title="5.4 Aggregated and anonymised data">
              <p>
                We may share aggregated or anonymised data (from which no individual can be identified)
                with third parties for industry analysis, benchmarking, or research purposes, without
                restriction.
              </p>
            </Sub>
          </Sec>

          {/* 6 */}
          <Sec id="transfers" title="6. International Data Transfers">
            <p>
              Some of our service providers are located outside the United Kingdom and the European
              Economic Area. When we transfer personal data to countries that do not provide an
              equivalent level of data protection, we ensure adequate safeguards are in place, including
              one or more of the following:
            </p>
            <Ul>
              <li>Standard Contractual Clauses (SCCs) approved by the European Commission or the UK Information Commissioner's Office (ICO).</li>
              <li>An adequacy decision by the UK Secretary of State or the European Commission confirming the destination country provides sufficient protection.</li>
              <li>Binding Corporate Rules, approved codes of conduct, or certification mechanisms (where applicable).</li>
              <li>Other legally recognised transfer mechanisms under the UK GDPR or EU GDPR.</li>
            </Ul>
            <p>
              You may obtain a copy of the specific safeguards we rely on for any given transfer by
              contacting us at{' '}
              <a href={`mailto:${EMAIL}`} className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">{EMAIL}</a>.
            </p>
          </Sec>

          {/* 7 */}
          <Sec id="retention" title="7. Data Retention">
            <p>
              We retain personal data only for as long as is necessary to fulfil the purposes for which
              it was collected, including satisfying any legal, accounting, or reporting obligations.
              Our standard retention periods are:
            </p>
            <Ul>
              <li><strong className="text-white">Enquiry and pre-engagement data</strong> — retained for up to 24 months from the date of the initial enquiry, unless a longer period is required due to an ongoing business relationship or legal obligation.</li>
              <li><strong className="text-white">Client project and delivery data</strong> — retained for the duration of the engagement and for at least 6 years following completion of the project, in line with statutory limitation periods for contractual claims under English law.</li>
              <li><strong className="text-white">Financial and accounting records</strong> — retained for at least 6 years following the relevant financial year end, as required by HMRC and applicable tax regulations.</li>
              <li><strong className="text-white">Website analytics data</strong> — retained according to the retention settings configured within Google Analytics (by default, up to 26 months), subject to your cookie consent preferences. Data is automatically deleted upon expiry of the set period.</li>
              <li><strong className="text-white">Marketing communications data</strong> — retained until you opt out, withdraw consent, or we determine it is no longer relevant or proportionate to retain it. We review suppression lists regularly.</li>
              <li><strong className="text-white">Cookie consent records</strong> — retained for up to 3 years as evidence of consent decisions.</li>
            </Ul>
            <p>
              When personal data is no longer required, it is securely deleted or anonymised in accordance
              with our data disposal procedures.
            </p>
          </Sec>

          {/* 8 */}
          <Sec id="rights" title="8. Your Rights">
            <p>
              Under UK GDPR and the Data Protection Act 2018 (and the equivalent EU GDPR provisions where
              applicable), you have the following rights with respect to your personal data:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mt-2">
              <Right title="Right of Access">
                You have the right to request a copy of all personal data we hold about you (a Subject
                Access Request, or SAR). We will respond within one calendar month, with a possible
                extension of a further two months for complex or numerous requests.
              </Right>
              <Right title="Right to Rectification">
                You have the right to ask us to correct any inaccurate or incomplete personal data we hold
                about you. We will act promptly to rectify any errors.
              </Right>
              <Right title="Right to Erasure">
                Also known as the "right to be forgotten". You may request that we delete your personal
                data where there is no compelling legitimate reason for us to continue processing it,
                where you have withdrawn consent, or where we have processed data unlawfully.
              </Right>
              <Right title="Right to Restriction">
                You may request that we restrict processing of your personal data in certain circumstances,
                for example while the accuracy of data is being contested, or while we consider an
                objection to processing.
              </Right>
              <Right title="Right to Data Portability">
                Where processing is based on consent or contract and carried out by automated means, you
                may request that we provide your personal data in a structured, commonly used,
                machine-readable format, or transmit it directly to another controller where technically
                feasible.
              </Right>
              <Right title="Right to Object">
                You have the right to object at any time to processing of your personal data based on
                legitimate interests or for direct marketing purposes. We will cease processing unless
                we can demonstrate compelling legitimate grounds that override your interests.
              </Right>
              <Right title="Automated Decision-Making">
                You have the right not to be subject to decisions made solely through automated
                processing that produce legal or similarly significant effects. We do not currently
                engage in such processing. If this changes, we will notify you and provide appropriate
                safeguards.
              </Right>
              <Right title="Right to Withdraw Consent">
                Where we rely on your consent to process personal data, you may withdraw that consent at
                any time without affecting the lawfulness of processing carried out before withdrawal.
                You can withdraw cookie consent via our cookie preference banner.
              </Right>
            </div>
            <p>
              To exercise any of the above rights, please contact us at{' '}
              <a href={`mailto:${EMAIL}`} className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">
                {EMAIL}
              </a>
              . We may need to verify your identity before processing your request. We will not charge a
              fee unless requests are manifestly unfounded or excessive. You also have the right to lodge
              a complaint with the{' '}
              <strong className="text-white">Information Commissioner's Office (ICO)</strong>:
            </p>
            <InfoBox>
              <p className="font-semibold text-white">Information Commissioner's Office (ICO)</p>
              <p>
                Website:{' '}
                <a href="https://ico.org.uk/make-a-complaint" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">
                  ico.org.uk/make-a-complaint
                </a>
              </p>
              <p>Telephone: 0303 123 1113</p>
            </InfoBox>
          </Sec>

          {/* 9 */}
          <Sec id="cookies" title="9. Cookies and Tracking Technologies">
            <p>
              Our website uses cookies and similar tracking technologies to recognise returning visitors,
              measure site performance, and support marketing activities. You can control which non-essential
              cookies are placed on your device using the cookie preference banner displayed when you
              first visit the site. You can update your preferences at any time by clearing your
              browser's stored cookies and revisiting our website.
            </p>
            <Sub title="9.1 What is a cookie?">
              <p>
                A cookie is a small text file placed on your browser or device when you visit a website.
                Cookies allow the website to recognise your device on future visits, remember your
                preferences, and gather anonymous usage statistics. They do not run programmes or
                deliver viruses to your computer.
              </p>
            </Sub>
            <Sub title="9.2 Cookie categories we use">
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-white">Essential cookies</span>
                    <span className="text-xs text-indigo-400 font-medium px-2 py-0.5 rounded-full border border-indigo-500/30 bg-indigo-500/10">
                      Always active
                    </span>
                  </div>
                  <p className="text-sm text-[#A7B1D8] leading-relaxed mb-2">
                    These cookies are strictly necessary for the website to function and cannot be
                    switched off. They are set in response to actions you take, such as setting your
                    privacy preferences or loading page assets. They do not store personally identifiable
                    information.
                  </p>
                  <Ul>
                    <li><CookieBadge label="ikarmic-cookie-consent" /> — Stores your cookie consent preferences. Duration: 1 year.</li>
                  </Ul>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-white">Analytics cookies</span>
                    <span className="text-xs text-amber-400 font-medium px-2 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10">
                      Consent required
                    </span>
                  </div>
                  <p className="text-sm text-[#A7B1D8] leading-relaxed mb-2">
                    We use <strong className="text-white">Google Analytics 4</strong> to understand how
                    visitors use our website. Data collected is aggregated and anonymised; it cannot
                    be used to identify you as an individual. Google operates as a separate data controller
                    for its own analytics purposes. See{' '}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">
                      Google's Privacy Policy
                    </a>.
                  </p>
                  <Ul>
                    <li><CookieBadge label="_ga" /> — Distinguishes unique users. Duration: 2 years.</li>
                    <li><CookieBadge label="_ga_*" /> — Persists session state for the current measurement ID. Duration: 2 years.</li>
                    <li><CookieBadge label="_gid" /> — Distinguishes users (short-lived). Duration: 24 hours.</li>
                  </Ul>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-white">Marketing cookies</span>
                    <span className="text-xs text-amber-400 font-medium px-2 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10">
                      Consent required
                    </span>
                  </div>
                  <p className="text-sm text-[#A7B1D8] leading-relaxed mb-2">
                    These cookies are placed by advertising partners (currently <strong className="text-white">Meta Platforms, Inc.</strong>)
                    to build a profile of your interests and show relevant advertisements on other platforms.
                    They do this by uniquely tracking your browser across websites. These cookies are only
                    activated when you explicitly enable marketing cookies. Meta operates as a separate data
                    controller. See{' '}
                    <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">
                      Meta's Privacy Policy
                    </a>.
                  </p>
                  <Ul>
                    <li><CookieBadge label="_fbp" /> — Meta Pixel browser identifier. Duration: 90 days.</li>
                    <li><CookieBadge label="_fbc" /> — Meta click identifier (set when clicking a Facebook ad). Duration: 90 days.</li>
                  </Ul>
                </div>
              </div>
            </Sub>
            <Sub title="9.3 Managing cookies in your browser">
              <p>
                In addition to using our consent banner, you can manage cookies directly through your
                browser settings. Note that disabling certain cookies may affect website functionality.
              </p>
              <Ul>
                <li>
                  <strong className="text-white">Chrome: </strong>
                  <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">support.google.com</a>
                </li>
                <li>
                  <strong className="text-white">Firefox: </strong>
                  <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">support.mozilla.org</a>
                </li>
                <li>
                  <strong className="text-white">Safari: </strong>
                  <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">support.apple.com</a>
                </li>
                <li>
                  <strong className="text-white">Edge: </strong>
                  <a href="https://support.microsoft.com/en-gb/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">support.microsoft.com</a>
                </li>
              </Ul>
            </Sub>
          </Sec>

          {/* 10 */}
          <Sec id="security" title="10. Security">
            <p>
              We implement appropriate technical and organisational measures to protect your personal
              data against accidental loss, destruction, alteration, unauthorised disclosure, or access.
              These measures include:
            </p>
            <Ul>
              <li>TLS/HTTPS encryption for all data transmitted between your browser and our website.</li>
              <li>Strict access controls ensuring only authorised personnel can access client and enquiry data on a need-to-know basis.</li>
              <li>Regular review and testing of our information security policies and procedures.</li>
              <li>Use of reputable, security-accredited third-party service providers with appropriate data processing agreements in place.</li>
            </Ul>
            <p>
              Whilst we take data security seriously, no method of transmission over the internet or
              electronic storage system is completely secure. We cannot guarantee absolute security, and
              you share personal data with us at your own risk. In the event of a personal data breach
              that is likely to result in a high risk to your rights and freedoms, we will notify affected
              individuals and the ICO as required by applicable law, usually within 72 hours of becoming
              aware of the breach.
            </p>
          </Sec>

          {/* 11 */}
          <Sec id="children" title="11. Children's Privacy">
            <p>
              Our website and services are directed at businesses and professionals. They are not intended
              for use by, and we do not knowingly collect personal data from, anyone under the age of 16.
              If you are a parent or guardian and believe that your child has provided personal data to us,
              please contact us at{' '}
              <a href={`mailto:${EMAIL}`} className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">{EMAIL}</a>{' '}
              and we will take prompt steps to delete that information.
            </p>
          </Sec>

          {/* 12 */}
          <Sec id="third-party" title="12. Third-Party Links">
            <p>
              Our website may contain links to third-party websites, products, or services — for example,
              links to resources, social media profiles, or partner organisations. These sites operate
              under their own privacy policies and we are not responsible for their content or data
              practices. We encourage you to review the privacy policy of any third-party site before
              submitting personal data.
            </p>
          </Sec>

          {/* 13 */}
          <Sec id="do-not-track" title="13. Do Not Track">
            <p>
              Certain browsers transmit "Do Not Track" (DNT) signals to websites. Our website does not
              currently respond to DNT signals at the browser level. Your cookie preferences managed
              through our consent banner are the primary mechanism by which you control which tracking
              technologies are active on our site.
            </p>
          </Sec>

          {/* 14 */}
          <Sec id="changes" title="14. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our processing
              activities, legal obligations, regulatory guidance, or applicable law. The revised policy
              will be posted on this page with an updated effective date. For material changes — those
              that significantly affect how we use your data or your rights — we will take reasonable
              steps to notify you proactively (for example, by displaying a notice on our website or
              sending an email to individuals with whom we have an active relationship). Your continued
              use of our website following the posting of changes constitutes your acknowledgement of
              the updated policy.
            </p>
          </Sec>

          {/* 15 */}
          <Sec id="contact" title="15. How to Contact Us">
            <p>
              If you have any questions, concerns, or complaints about this Privacy Policy or how we
              handle your personal data, or if you wish to exercise any of your data subject rights,
              please contact us:
            </p>
            <InfoBox>
              <p className="font-semibold text-white">{COMPANY}</p>
              <p>
                Email:{' '}
                <a href={`mailto:${EMAIL}`} className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">
                  {EMAIL}
                </a>
              </p>
            </InfoBox>
            <p>
              We will respond to all legitimate requests within one calendar month. We may extend this
              period by a further two months where requests are complex or numerous; in such cases we
              will inform you of the extension within the initial one-month period.
            </p>
            <p>
              If you are dissatisfied with our response, you have the right to lodge a complaint with
              the supervisory authority. In the UK, this is the{' '}
              <strong className="text-white">Information Commissioner's Office (ICO)</strong>:
            </p>
            <InfoBox>
              <p className="font-semibold text-white">Information Commissioner's Office</p>
              <p>
                Make a complaint:{' '}
                <a href="https://ico.org.uk/make-a-complaint" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">
                  ico.org.uk/make-a-complaint
                </a>
              </p>
              <p>Telephone: 0303 123 1113</p>
            </InfoBox>
          </Sec>

        </article>
      </div>
    </main>
  );
};

export default Privacy;
