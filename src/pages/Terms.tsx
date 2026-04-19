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

function Clause({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
      <p className="text-sm font-semibold text-white mb-1">{title}</p>
      <p className="text-sm text-[#A7B1D8] leading-relaxed">{children}</p>
    </div>
  );
}

/* ── Terms of Service page ─────────────────────────────────────────────── */

const EFFECTIVE_DATE = '19 April 2026';
const COMPANY = 'Ikarmic AI Services and Solutions';
const EMAIL = 'hello@ikarmic.com';
const SITE_URL = 'https://ikarmic.com';

const Terms = () => {
  return (
    <main className="relative pt-24 pb-20">
      <div className="w-full px-6 lg:px-12">
        <article className="max-w-4xl mx-auto glass-card rounded-3xl p-8 lg:p-12 space-y-10">

          {/* Header */}
          <header>
            <span className="micro-label block mb-4">LEGAL</span>
            <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-3">Terms of Service</h1>
            <p className="text-[#A7B1D8] text-sm">
              Effective date: {EFFECTIVE_DATE} &nbsp;·&nbsp; Last reviewed: {EFFECTIVE_DATE}
            </p>
          </header>

          {/* Intro */}
          <section className="text-[#A7B1D8] leading-relaxed space-y-3">
            <p>
              Please read these Terms of Service ("Terms") carefully before using the website at{' '}
              <a href={SITE_URL} className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">{SITE_URL}</a>{' '}
              (the "Website") or engaging {COMPANY} ("Ikarmic", "we", "us", or "our") to provide
              any services.
            </p>
            <p>
              By accessing or using the Website, or by requesting, accepting, or receiving services
              from Ikarmic, you ("Client", "you", or "your") confirm that you have read, understood,
              and agree to be bound by these Terms and our{' '}
              <a href="/privacy" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">Privacy Policy</a>.
              If you do not agree, you must not use the Website or engage our services.
            </p>
            <p>
              These Terms govern access to and use of our Website and apply to all visitors. For
              professional consulting and development services, these Terms form the baseline agreement
              and are supplemented by a mutually signed Statement of Work ("SOW") or Master Services
              Agreement ("MSA"), which will prevail in the event of any conflict.
            </p>
          </section>

          {/* 1 */}
          <Sec id="definitions" title="1. Definitions">
            <p>In these Terms, the following words have the following meanings:</p>
            <Ul>
              <li><strong className="text-white">"Services"</strong> — any AI consulting, AI development, automation, analytics, or related professional services provided by Ikarmic, whether described on the Website or in a separate SOW or engagement letter.</li>
              <li><strong className="text-white">"Deliverables"</strong> — any work product, software, model, documentation, report, or other output created by Ikarmic specifically for the Client as specified in the relevant SOW.</li>
              <li><strong className="text-white">"Confidential Information"</strong> — any non-public information disclosed by one party to the other, whether in writing, orally, or by demonstration, that is identified as confidential or that a reasonable person would understand to be confidential in the circumstances.</li>
              <li><strong className="text-white">"Intellectual Property Rights"</strong> — patents, utility models, rights to inventions, copyright and related rights, trademarks and service marks, trade names, domain names, rights in get-up, goodwill, rights in designs, rights in software, database rights, and all other intellectual property rights, in each case whether registered or unregistered, and including all applications and rights to apply for and be granted such rights.</li>
              <li><strong className="text-white">"Personal Data"</strong> — has the meaning given in applicable data protection legislation, including UK GDPR.</li>
              <li><strong className="text-white">"Statement of Work" or "SOW"</strong> — a written document, mutually agreed and signed by both parties, describing the scope, deliverables, timeline, pricing, and acceptance criteria for a specific engagement.</li>
            </Ul>
          </Sec>

          {/* 2 */}
          <Sec id="services" title="2. Our Services">
            <p>
              Ikarmic provides AI consulting, design, development, and implementation services. These
              may include, but are not limited to: conversational AI and chatbot development; intelligent
              automation and document processing; predictive analytics and AI modelling; generative AI
              implementation; custom AI product and platform development; and strategic AI advisory.
            </p>
            <p>
              The scope of any specific engagement is defined in a separate SOW, proposal, or engagement
              letter agreed in writing between Ikarmic and the Client before work commences. Information
              on the Website about our services is for illustrative purposes only and does not constitute
              a binding offer.
            </p>
            <p>
              Ikarmic reserves the right to modify, suspend, or discontinue any service offering described
              on the Website at any time without notice. This does not affect engagements already governed
              by a signed SOW.
            </p>
          </Sec>

          {/* 3 */}
          <Sec id="website-use" title="3. Use of Our Website">
            <Sub title="3.1 Permitted use">
              <p>
                You may access and use the Website for lawful purposes only and in accordance with these
                Terms. You represent and warrant that you are at least 18 years of age and have the legal
                capacity to enter into these Terms.
              </p>
            </Sub>
            <Sub title="3.2 Prohibited conduct">
              <p>You must not:</p>
              <Ul>
                <li>Use the Website in any way that breaches any applicable local, national, or international law or regulation.</li>
                <li>Use the Website to transmit any unsolicited or unauthorised advertising or promotional material (spam).</li>
                <li>Knowingly transmit any data, send or upload any material that contains viruses, Trojan horses, worms, time-bombs, keystroke loggers, spyware, adware, or any other harmful software or similar computer code designed to adversely affect the operation of any computer hardware or software.</li>
                <li>Attempt to gain unauthorised access to any part of the Website, the server on which the Website is stored, or any server, computer, or database connected to the Website.</li>
                <li>Attack the Website via a denial-of-service attack or a distributed denial-of-service attack.</li>
                <li>Scrape, crawl, or extract data from the Website without our prior written consent.</li>
                <li>Use the Website to misrepresent your identity or affiliation with Ikarmic.</li>
                <li>Reproduce, duplicate, copy, sell, resell, or exploit any part of the Website without our express written permission.</li>
              </Ul>
            </Sub>
            <Sub title="3.3 Website availability">
              <p>
                Access to the Website is provided on an "as is" and "as available" basis. We do not
                guarantee that the Website will be uninterrupted, error-free, or free from viruses. We
                reserve the right to suspend, restrict, or terminate access to the Website at any time
                without notice for maintenance, security, or any other reason.
              </p>
            </Sub>
          </Sec>

          {/* 4 */}
          <Sec id="ip" title="4. Intellectual Property">
            <Sub title="4.1 Our intellectual property">
              <p>
                The Website and all its content — including design, text, graphics, logos, images, code,
                data compilations, and software — are owned by or licensed to Ikarmic and are protected
                by copyright, trademark, and other applicable intellectual property laws. You may not
                reproduce, distribute, modify, create derivative works from, publicly display, or exploit
                any part of the Website content without our prior written consent.
              </p>
            </Sub>
            <Sub title="4.2 Ikarmic pre-existing IP and tooling">
              <p>
                Ikarmic retains all Intellectual Property Rights in its pre-existing methodologies,
                frameworks, libraries, templates, processes, know-how, and reusable components
                ("Background IP") that are used or developed in the course of delivering services.
                Nothing in these Terms or any SOW transfers ownership of Background IP to the Client.
                We grant the Client a non-exclusive, royalty-free licence to use Background IP only
                to the extent embedded in Deliverables and necessary for the Client's use of those
                Deliverables.
              </p>
            </Sub>
            <Sub title="4.3 Client deliverables and ownership transfer">
              <p>
                Subject to payment of all fees due under the relevant SOW and to the extent specified
                in that SOW, Ikarmic assigns to the Client all Intellectual Property Rights in the
                bespoke Deliverables created specifically for the Client under that engagement. Such
                assignment takes effect upon receipt of full and cleared payment of all invoices
                relating to the relevant SOW.
              </p>
              <p>
                Where Deliverables incorporate third-party open-source components, the Client's rights
                in those components are governed by the applicable open-source licence terms, and
                Ikarmic shall disclose such components in the Deliverables documentation.
              </p>
            </Sub>
            <Sub title="4.4 Client-provided materials">
              <p>
                The Client grants Ikarmic a limited, non-exclusive, non-transferable licence to use any
                data, materials, software, or other content provided by the Client solely to the extent
                necessary to perform the Services. The Client warrants that it has the right to grant
                this licence and that use of the Client materials by Ikarmic will not infringe any third
                party's rights.
              </p>
            </Sub>
            <Sub title="4.5 Portfolio and references">
              <p>
                Unless the Client expressly requests otherwise in a SOW, Ikarmic reserves the right to
                use the Client's name and a general description of the services delivered (without
                disclosing Confidential Information) in Ikarmic's portfolio, case studies, pitches, and
                marketing materials.
              </p>
            </Sub>
          </Sec>

          {/* 5 */}
          <Sec id="confidentiality" title="5. Confidentiality">
            <p>
              Each party agrees to hold the other party's Confidential Information in strict confidence
              using at least the same level of care it uses to protect its own confidential information,
              but no less than reasonable care. Neither party shall disclose the other party's
              Confidential Information to any third party without prior written consent, except:
            </p>
            <Ul>
              <li>To its own employees, contractors, or professional advisors who have a legitimate need to know for the purpose of the engagement and are bound by confidentiality obligations no less protective than those in these Terms.</li>
              <li>As required by applicable law, court order, or regulatory authority, provided the disclosing party gives the other party prompt written notice (to the extent lawfully permitted) and reasonable opportunity to seek a protective order.</li>
            </Ul>
            <p>
              Confidential Information does not include information that: (a) is or becomes publicly
              available through no fault of the receiving party; (b) was already known to the receiving
              party prior to disclosure; (c) is independently developed by the receiving party without
              use of or reference to the Confidential Information; or (d) is received from a third party
              free of any obligation of confidentiality.
            </p>
            <p>
              Confidentiality obligations under this section survive termination of the engagement for a
              period of five (5) years, except in respect of trade secrets, for which obligations
              survive indefinitely.
            </p>
          </Sec>

          {/* 6 */}
          <Sec id="data-protection" title="6. Data Protection">
            <p>
              Each party shall comply with its respective obligations under applicable data protection
              legislation, including UK GDPR and the Data Protection Act 2018.
            </p>
            <p>
              Where Ikarmic processes Personal Data on behalf of the Client in the course of delivering
              Services, the parties shall enter into a Data Processing Agreement (DPA) as required by
              applicable law. The DPA will form part of the relevant SOW or MSA.
            </p>
            <p>
              Where Ikarmic processes Personal Data as a data controller (for example, Client contact
              information for project management and communication), such processing is governed by our{' '}
              <a href="/privacy" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">
                Privacy Policy
              </a>.
            </p>
            <p>
              The Client warrants that all Personal Data it provides to Ikarmic has been obtained and
              may be processed lawfully, and that its use by Ikarmic in performing the Services will not
              breach any applicable data protection law or any third party's rights.
            </p>
          </Sec>

          {/* 7 */}
          <Sec id="fees" title="7. Fees, Invoicing, and Payment">
            <Sub title="7.1 Fees">
              <p>
                Fees for Services are specified in the applicable SOW, proposal, or engagement letter.
                Unless otherwise stated, all fees are exclusive of applicable taxes (including Value Added
                Tax), which will be charged at the prevailing rate. Any additional work outside the agreed
                scope requires a separate written change order agreed by both parties.
              </p>
            </Sub>
            <Sub title="7.2 Invoicing">
              <p>
                Ikarmic will invoice the Client in accordance with the payment schedule set out in the
                applicable SOW. Unless otherwise agreed, invoices are payable within 30 days of the
                invoice date.
              </p>
            </Sub>
            <Sub title="7.3 Late payment">
              <p>
                Without prejudice to our other rights and remedies, if the Client fails to pay any invoice
                by the due date, Ikarmic reserves the right to: (a) charge interest on the overdue amount
                at the rate of 8% per annum above the Bank of England base rate from the due date until
                the date of actual payment, as permitted under the Late Payment of Commercial Debts
                (Interest) Act 1998; (b) suspend provision of the Services until all outstanding amounts
                are paid in full; and (c) terminate the engagement on written notice.
              </p>
            </Sub>
            <Sub title="7.4 Expenses">
              <p>
                Unless otherwise agreed in writing, any reasonable, pre-approved out-of-pocket expenses
                (such as travel, accommodation, or third-party tools required for the engagement) will be
                invoiced to the Client at cost, with receipts provided on request.
              </p>
            </Sub>
          </Sec>

          {/* 8 */}
          <Sec id="engagement" title="8. Project Engagement">
            <Sub title="8.1 Statements of Work">
              <p>
                Each engagement will be governed by a mutually signed SOW setting out the scope,
                deliverables, timelines, acceptance criteria, and commercial terms. In the event of any
                conflict between these Terms and a SOW, the SOW shall prevail to the extent of the
                inconsistency.
              </p>
            </Sub>
            <Sub title="8.2 Client responsibilities">
              <p>
                The Client acknowledges that successful delivery of the Services depends on the Client's
                timely co-operation, including providing access to relevant systems, data, personnel, and
                information as reasonably requested by Ikarmic. Ikarmic shall not be liable for delays or
                deficiencies in delivery caused by the Client's failure to meet its obligations.
              </p>
            </Sub>
            <Sub title="8.3 Change requests">
              <p>
                Any changes to the agreed scope of Services must be requested in writing and agreed in a
                separate written change order signed by both parties before work on the changes commences.
                Ikarmic is entitled to adjust timelines and fees accordingly in respect of agreed changes.
              </p>
            </Sub>
            <Sub title="8.4 Acceptance">
              <p>
                Where an SOW specifies acceptance criteria, the Client shall review and either accept or
                provide written details of any non-conformance within the review period specified in the
                SOW (or, if not specified, within 10 business days of delivery). If the Client does not
                respond within this period, the Deliverables shall be deemed accepted. Ikarmic will use
                reasonable commercial endeavours to remedy confirmed non-conformances within an agreed
                timescale.
              </p>
            </Sub>
            <Sub title="8.5 AI-specific considerations">
              <p>
                The Client acknowledges that AI systems (including large language models, machine learning
                models, and automated decision systems) have inherent limitations. These may include
                unexpected outputs, model drift over time, sensitivity to input quality, and performance
                variation across use cases. Ikarmic does not warrant that any AI system will be free from
                errors, biases, or unexpected behaviours, or that any predicted performance metrics will
                be achieved in all circumstances. Ikarmic will document known limitations and recommended
                human oversight measures in all Deliverables involving AI components.
              </p>
            </Sub>
          </Sec>

          {/* 9 */}
          <Sec id="warranties" title="9. Warranties and Disclaimers">
            <Sub title="9.1 Ikarmic warranties">
              <p>Ikarmic warrants that:</p>
              <Ul>
                <li>It has the right to enter into these Terms and any applicable SOW.</li>
                <li>Services will be performed by appropriately skilled and qualified personnel.</li>
                <li>Services will be performed with reasonable care and skill in accordance with good industry practice.</li>
                <li>Deliverables will materially conform to the specifications set out in the applicable SOW at the time of delivery.</li>
                <li>To the best of its knowledge, the Deliverables (excluding Client-provided materials and third-party open-source components) will not infringe the Intellectual Property Rights of any third party.</li>
              </Ul>
            </Sub>
            <Sub title="9.2 Disclaimer of warranties">
              <p>
                Except as expressly stated in these Terms or in an applicable SOW, all Services and
                Deliverables are provided "as is" without warranty of any kind. To the maximum extent
                permitted by applicable law, Ikarmic expressly disclaims all implied warranties, including
                implied warranties of merchantability, fitness for a particular purpose, and
                non-infringement.
              </p>
              <p>
                Ikarmic does not warrant that: (a) the Website will be continuously available, secure,
                or error-free; (b) any AI models or automated outputs produced under an engagement will
                be accurate, complete, or suitable for any specific regulatory or compliance purpose
                without human review; or (c) results achieved in a proof-of-concept or pilot environment
                will replicate in production at scale.
              </p>
              <p>
                The Client is solely responsible for evaluating the suitability of any Deliverable or
                AI system before deploying it in production, making decisions based on its outputs, or
                relying on it for any purpose that may have legal, financial, safety, or other significant
                consequences.
              </p>
            </Sub>
          </Sec>

          {/* 10 */}
          <Sec id="liability" title="10. Limitation of Liability">
            <div className="space-y-3">
              <Clause title="10.1 Cap on liability">
                To the maximum extent permitted by applicable law, Ikarmic's total aggregate liability
                to the Client (whether in contract, tort including negligence, breach of statutory duty,
                or otherwise) arising out of or in connection with these Terms or any SOW shall not
                exceed the total fees paid or payable by the Client to Ikarmic in the twelve (12) months
                immediately preceding the event or circumstances giving rise to the claim.
              </Clause>
              <Clause title="10.2 Exclusion of consequential loss">
                To the maximum extent permitted by applicable law, Ikarmic shall not be liable for any:
                indirect or consequential loss; loss of profits or revenue; loss of business or contracts;
                loss of anticipated savings; loss of data or corruption of data; loss of goodwill or reputation;
                wasted expenditure; or any special, exemplary, or punitive damages, even if Ikarmic has
                been advised of the possibility of such damages.
              </Clause>
              <Clause title="10.3 Exceptions">
                Nothing in these Terms limits or excludes either party's liability for: (a) death or personal
                injury caused by negligence; (b) fraud or fraudulent misrepresentation; (c) any other liability
                that cannot be limited or excluded by applicable law.
              </Clause>
              <Clause title="10.4 Client's duty to mitigate">
                The Client must take all reasonable steps to mitigate any loss or damage it suffers. Ikarmic's
                liability will be reduced to the extent that the Client fails to take such reasonable steps.
              </Clause>
            </div>
          </Sec>

          {/* 11 */}
          <Sec id="indemnification" title="11. Indemnification">
            <p>
              The Client agrees to indemnify, defend, and hold harmless Ikarmic, its directors, employees,
              contractors, and agents from and against any claims, liabilities, damages, costs, and
              expenses (including reasonable legal fees) arising from or relating to:
            </p>
            <Ul>
              <li>The Client's use of the Website or Services in breach of these Terms.</li>
              <li>Any content, data, or materials provided by the Client to Ikarmic that infringe any third party's rights (including Intellectual Property Rights or data protection rights) or violate any applicable law.</li>
              <li>The Client's use of Deliverables or AI systems in production in a manner not sanctioned or recommended by Ikarmic.</li>
              <li>Any claim by a third party arising from the Client's deployment, modification, or operation of any AI system designed or developed by Ikarmic.</li>
            </Ul>
          </Sec>

          {/* 12 */}
          <Sec id="force-majeure" title="12. Force Majeure">
            <p>
              Neither party will be liable or responsible to the other for any failure or delay in
              performing its obligations under these Terms to the extent caused by events beyond its
              reasonable control ("Force Majeure Events"), including but not limited to: acts of God;
              war, riot, or terrorism; pandemic or epidemic; governmental actions or embargoes;
              strikes, lockouts, or industrial action; failure of third-party internet or
              telecommunications infrastructure; or prolonged power outage.
            </p>
            <p>
              The party affected by a Force Majeure Event must notify the other party promptly in writing
              and use reasonable endeavours to mitigate the effect. If a Force Majeure Event continues
              for more than 60 consecutive days, either party may terminate the affected engagement on
              written notice without liability to the other (save for fees due for work already completed
              and accepted).
            </p>
          </Sec>

          {/* 13 */}
          <Sec id="termination" title="13. Term and Termination">
            <Sub title="13.1 Engagement term">
              <p>
                Each engagement commences on the date specified in the applicable SOW and continues until
                delivery of all Deliverables and payment of all fees, unless terminated earlier in
                accordance with these Terms.
              </p>
            </Sub>
            <Sub title="13.2 Termination for convenience">
              <p>
                Either party may terminate an engagement for convenience on 30 days' prior written
                notice. In such case, the Client shall pay Ikarmic for all Services rendered up to the
                termination date, including any reasonable costs and non-cancellable commitments incurred
                in connection with the engagement up to the date of the termination notice.
              </p>
            </Sub>
            <Sub title="13.3 Termination for cause">
              <p>
                Either party may terminate an engagement immediately on written notice if:
              </p>
              <Ul>
                <li>The other party commits a material breach of these Terms or the SOW that, if capable of remedy, is not remedied within 20 business days of receipt of written notice specifying the breach.</li>
                <li>The other party becomes insolvent, enters administration or liquidation, is wound up, or makes any arrangement with its creditors generally.</li>
                <li>The other party ceases or threatens to cease carrying on its business.</li>
              </Ul>
            </Sub>
            <Sub title="13.4 Consequences of termination">
              <p>
                On termination for any reason: (a) each party shall promptly return or, at the other
                party's election, destroy the other's Confidential Information; (b) the Client shall
                pay all outstanding fees for Services performed; (c) accrued rights and remedies of
                either party are unaffected; and (d) provisions that by their nature should survive
                termination (including confidentiality, IP ownership, liability, indemnification, and
                governing law) shall survive.
              </p>
            </Sub>
          </Sec>

          {/* 14 */}
          <Sec id="dispute" title="14. Dispute Resolution">
            <p>
              In the event of any dispute, controversy, or claim arising out of or in connection with
              these Terms or any SOW, the parties shall first attempt to resolve the matter through
              good-faith negotiation. Either party may initiate negotiations by providing written notice
              to the other describing the dispute in reasonable detail.
            </p>
            <p>
              If the dispute cannot be resolved through negotiation within 30 days of the initial
              written notice (or such longer period as the parties agree in writing), either party may
              refer the dispute to mediation administered by a mutually agreed mediator or, failing
              agreement, by the Centre for Effective Dispute Resolution (CEDR) before commencing court
              proceedings.
            </p>
            <p>
              Nothing in this section prevents either party from seeking urgent injunctive or other
              equitable relief from a court of competent jurisdiction to prevent irreparable harm,
              including to protect Confidential Information or Intellectual Property Rights.
            </p>
          </Sec>

          {/* 15 */}
          <Sec id="governing-law" title="15. Governing Law and Jurisdiction">
            <p>
              These Terms and any dispute or claim (including non-contractual disputes or claims) arising
              out of or in connection with them or their subject matter or formation shall be governed by
              and construed in accordance with the laws of England and Wales.
            </p>
            <p>
              Subject to the dispute resolution provisions in Section 14, each party irrevocably agrees
              that the courts of England and Wales shall have exclusive jurisdiction to settle any
              dispute or claim arising out of or in connection with these Terms.
            </p>
          </Sec>

          {/* 16 */}
          <Sec id="general" title="16. General Provisions">
            <div className="space-y-3">
              <Clause title="Entire agreement">
                These Terms, together with any applicable SOW, MSA, or engagement letter, constitute the
                entire agreement between the parties in relation to the subject matter hereof and supersede
                all prior agreements, representations, warranties, negotiations, and understandings,
                whether oral or written.
              </Clause>
              <Clause title="Amendments">
                Ikarmic reserves the right to amend these Terms at any time by posting a revised version
                on the Website. For existing engagements, changes will not apply retroactively without
                the Client's written consent. Continued use of the Website following the posting of
                changes constitutes acceptance of the updated Terms.
              </Clause>
              <Clause title="Waiver">
                No failure or delay by either party in exercising any right, power, or remedy shall
                operate as a waiver. A single or partial exercise of any right, power, or remedy does
                not preclude any further or other exercise. No waiver shall be effective unless in writing
                signed by the waiving party.
              </Clause>
              <Clause title="Severability">
                If any provision of these Terms is found by a court or competent authority to be invalid,
                unlawful, void, or unenforceable, that provision shall be deemed severed; the remaining
                provisions shall continue in full force and effect.
              </Clause>
              <Clause title="Assignment">
                The Client may not assign, sub-license, sub-contract, or otherwise transfer any of its
                rights or obligations under these Terms without Ikarmic's prior written consent. Ikarmic
                may freely assign its rights and obligations to any affiliate or acquirer of its business.
              </Clause>
              <Clause title="No partnership or agency">
                Nothing in these Terms creates a partnership, joint venture, employment, or agency
                relationship between the parties. Neither party has authority to bind the other.
              </Clause>
              <Clause title="Third-party rights">
                These Terms do not confer any rights on any third party under the Contracts (Rights of
                Third Parties) Act 1999 or otherwise.
              </Clause>
              <Clause title="Notices">
                All formal notices under these Terms shall be in writing and delivered by email (with
                read receipt or acknowledgement) or by recorded post to the addresses specified in the
                applicable SOW or, in default, to the contact details published on the Website.
              </Clause>
            </div>
          </Sec>

          {/* 17 */}
          <Sec id="contact" title="17. Contact">
            <p>
              If you have questions about these Terms or wish to discuss an engagement, please contact us:
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

        </article>
      </div>
    </main>
  );
};

export default Terms;
