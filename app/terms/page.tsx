import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing use of the Ikarmic website and engagement of Ikarmic AI Services and Solutions.",
  alternates: { canonical: "https://ikarmic.com/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-24">
      <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Legal</p>
      <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
      <p className="text-sm text-neutral-500 mb-2">Effective date: 19 April 2026 · Last reviewed: 19 April 2026</p>
      <p className="text-neutral-400 mb-6 leading-relaxed">
        Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully before using the website at{" "}
        <a href="https://ikarmic.com" className="text-indigo-400 hover:text-indigo-300">https://ikarmic.com</a>{" "}
        (the &ldquo;Website&rdquo;) or engaging Ikarmic AI Services and Solutions (&ldquo;Ikarmic&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) to provide AI consulting, design, development, or related services.
      </p>
      <p className="text-neutral-400 mb-10 leading-relaxed">
        By accessing or using the Website, or by instructing us to commence work on your behalf, you confirm that you have read, understood, and agree to be bound by these Terms and our{" "}
        <a href="/privacy" className="text-indigo-400 hover:text-indigo-300">Privacy Policy</a>. If you do not agree, please immediately discontinue use of our Website and do not engage our services. These Terms govern your use of the Website and your relationship with Ikarmic as a prospective or current client. For active client engagements, these Terms are supplemented by a signed Statement of Work or Master Services Agreement (&ldquo;SOW/MSA&rdquo;), which will prevail over these Terms to the extent of any conflict.
      </p>

      <div className="space-y-12 text-neutral-400">

        {/* 1 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">1. Definitions</h2>
          <p className="mb-4 leading-relaxed">In these Terms, the following definitions apply:</p>
          <div className="space-y-3">
            {[
              { term: "\"Services\"", def: "The AI consulting, design, development, implementation, and related professional services provided by Ikarmic to clients, as described on the Website and further scoped in a Statement of Work." },
              { term: "\"Deliverables\"", def: "All work product, software, models, reports, designs, documentation, and other outputs created by Ikarmic in the course of providing the Services." },
              { term: "\"Confidential Information\"", def: "Any information or data that is not generally known to the public and that is disclosed by either party in connection with these Terms or a Statement of Work, including (without limitation) business plans, financial information, technical specifications, client data, pricing, and know-how, whether disclosed orally, in writing, or in any other form." },
              { term: "\"Intellectual Property Rights\"", def: "All patents, utility models, rights to inventions, copyright and related rights, moral rights, trademarks and service marks, trade names and domain names, rights in get-up and trade dress, rights in goodwill and to sue for passing off, rights in designs, rights in computer software, database rights, rights to use and protect the confidentiality of trade secrets and know-how, and all other intellectual property rights, whether registered or unregistered, including all applications and rights to apply for and be granted renewals or extensions of, and rights to claim priority from, such rights, in any part of the world." },
              { term: "\"Personal Data\"", def: "Has the meaning given to it in the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018, as amended or replaced from time to time." },
              { term: "\"Statement of Work\" or \"SOW\"", def: "A written document (which may also be titled a proposal, engagement letter, or project brief) signed by both Ikarmic and the Client that describes the specific scope of work, Deliverables, timeline, fees, and any other terms applicable to a particular engagement." },
            ].map((item) => (
              <div key={item.term} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                <p className="text-neutral-200 font-semibold mb-1">{item.term}</p>
                <p className="text-sm leading-relaxed">{item.def}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 2 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">2. Our Services</h2>
          <p className="mb-3 leading-relaxed">Ikarmic provides AI strategy, consulting, design, development, and implementation services to business clients. The specific scope, deliverables, timelines, and commercial terms for each client engagement are defined in a mutually signed SOW.</p>
          <p className="mb-3 leading-relaxed">Information about Services described on this Website is provided for illustrative purposes only and does not constitute a binding offer or representation that any particular scope, technology, or outcome will be achievable in your specific context.</p>
          <p className="leading-relaxed">Ikarmic reserves the right to modify, suspend, or discontinue its service offerings described on the Website at any time without notice. Such changes will not affect any SOW already signed by both parties unless otherwise agreed in writing.</p>
        </section>

        {/* 3 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">3. Use of Our Website</h2>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">3.1 Permitted use</h3>
          <p className="mb-4 leading-relaxed">You may use the Website only for lawful purposes and in accordance with these Terms. You represent and warrant that you are at least 18 years of age and have the legal capacity to agree to these Terms in your own right or on behalf of an organisation you are authorised to represent.</p>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">3.2 Prohibited conduct</h3>
          <p className="mb-3 leading-relaxed">You must not:</p>
          <ul className="list-disc list-outside ml-5 space-y-2 mb-6">
            <li>Use the Website for any unlawful purpose or in violation of any applicable local, national, or international law or regulation.</li>
            <li>Use the Website to transmit, send, or upload unsolicited or unauthorised advertising or promotional material (&ldquo;spam&rdquo;).</li>
            <li>Introduce or upload any viruses, trojans, worms, malicious code, logic bombs, or other technically harmful material.</li>
            <li>Attempt to gain unauthorised access to the Website, any related server, computer system, or database.</li>
            <li>Conduct any denial of service attack or similar disruptive or harmful activity targeting the Website or its infrastructure.</li>
            <li>Systematically scrape, harvest, or extract any data or content from the Website without our express written consent.</li>
            <li>Misrepresent your identity or affiliation with any person or organisation in connection with the Website.</li>
            <li>Reproduce, duplicate, copy, sell, or resell any portion of the Website or its content without our express written permission.</li>
          </ul>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">3.3 Availability</h3>
          <p className="leading-relaxed">The Website is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. We do not guarantee that the Website will always be available, uninterrupted, timely, secure, or error-free. We reserve the right to suspend, restrict, withdraw, or discontinue access to all or any part of the Website, with or without notice, for business or operational reasons or where required by law.</p>
        </section>

        {/* 4 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">4. Intellectual Property</h2>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">4.1 Website content</h3>
          <p className="mb-4 leading-relaxed">The Website and all content, features, and functionality (including but not limited to text, graphics, logos, images, audio clips, data compilations, and software) are owned by or licensed to Ikarmic and are protected by applicable copyright, trademark, and other intellectual property laws. You must not reproduce, republish, modify, distribute, or create derivative works from any Website content without our express written permission.</p>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">4.2 Background IP</h3>
          <p className="mb-4 leading-relaxed">Ikarmic retains all rights, title, and interest in and to its pre-existing intellectual property, including all methodologies, frameworks, code libraries, templates, processes, software tools, and know-how developed independently of any client engagement (&ldquo;Background IP&rdquo;). To the extent that Background IP is embedded in or required to use any Deliverable, Ikarmic grants the Client a non-exclusive, royalty-free, perpetual licence to use that Background IP solely as incorporated into the Deliverable, subject to full payment of all applicable fees.</p>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">4.3 Client deliverables</h3>
          <p className="mb-4 leading-relaxed">Except for Background IP and any third-party or open-source components, Ikarmic assigns to the Client all Intellectual Property Rights in bespoke Deliverables created specifically for the Client under a SOW, upon receipt of full payment of all fees due under that SOW. Open-source components embedded in Deliverables are governed by their respective open-source licences, which the Client accepts by using those Deliverables.</p>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">4.4 Client materials</h3>
          <p className="mb-4 leading-relaxed">The Client grants Ikarmic a limited, non-exclusive, non-transferable, royalty-free licence to access and use any materials, data, content, systems, or information provided by the Client solely as necessary to perform the Services. The Client warrants that it has the right to grant such a licence and that use by Ikarmic will not infringe any third-party rights.</p>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">4.5 Portfolio rights</h3>
          <p className="leading-relaxed">Unless the Client expressly requests otherwise in writing (including in a SOW), Ikarmic may reference the Client&apos;s name and a general description of the type of engagement (without disclosing any Confidential Information) in its portfolio, website, marketing materials, case studies, and new business pitches.</p>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">5. Confidentiality</h2>
          <p className="mb-3 leading-relaxed">Each party (&ldquo;Receiving Party&rdquo;) agrees to hold the other party&apos;s (&ldquo;Disclosing Party&apos;s&rdquo;) Confidential Information in strict confidence and to apply the same degree of care to protect it as it uses to protect its own confidential information of similar nature — but in any event no less than a reasonable degree of care. The Receiving Party agrees not to use the Disclosing Party&apos;s Confidential Information for any purpose other than performing its obligations or exercising its rights under these Terms or an applicable SOW.</p>
          <p className="mb-3 leading-relaxed">Confidential Information may be disclosed on a need-to-know basis to employees, contractors, or advisors of the Receiving Party who are bound by confidentiality obligations at least as protective as those in these Terms, and to the extent strictly required by applicable law or a court of competent jurisdiction (in which case the Receiving Party will provide prompt advance notice to the Disclosing Party where legally permissible).</p>
          <p className="mb-3 leading-relaxed">The obligations in this section do not apply to information that: (a) is or becomes generally available to the public through no fault of the Receiving Party; (b) was already known to the Receiving Party prior to disclosure; (c) is independently developed by the Receiving Party without reference to the Disclosing Party&apos;s Confidential Information; or (d) is received from a third party with no obligation of confidentiality.</p>
          <p className="leading-relaxed">This confidentiality obligation survives termination or expiry of any engagement for a period of five (5) years with respect to Confidential Information generally, and indefinitely with respect to trade secrets.</p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">6. Data Protection</h2>
          <p className="mb-3 leading-relaxed">Each party shall comply with all applicable data protection and privacy legislation, including the UK GDPR and the Data Protection Act 2018 (and, where applicable, the EU GDPR), in connection with their respective activities under these Terms.</p>
          <p className="mb-3 leading-relaxed">Where Ikarmic processes Personal Data on behalf of the Client (as a data processor), the parties agree to enter into a separate Data Processing Agreement setting out the subject matter, duration, nature, and purpose of processing, the type of Personal Data, and the categories of data subjects.</p>
          <p className="leading-relaxed">Where Ikarmic processes Personal Data as a data controller (for example, contact information provided by Client representatives for account management purposes), processing is governed by our <a href="/privacy" className="text-indigo-400 hover:text-indigo-300">Privacy Policy</a>. The Client warrants that any Personal Data it provides to Ikarmic has been collected lawfully and that Ikarmic is permitted to process it for the purposes set out in these Terms.</p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">7. Fees, Invoicing, and Payment</h2>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">7.1 Fees</h3>
          <p className="mb-4 leading-relaxed">All fees are as set out in the applicable SOW. Unless stated otherwise, fees are exclusive of VAT and any other applicable taxes, which the Client is responsible for paying. Changes to the agreed scope will be captured in a written change order and may result in adjusted fees and timelines.</p>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">7.2 Invoicing</h3>
          <p className="mb-4 leading-relaxed">Ikarmic will invoice the Client in accordance with the payment schedule set out in the SOW. Where no schedule is specified, invoices are payable within 30 days of the invoice date.</p>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">7.3 Late payment</h3>
          <p className="mb-4 leading-relaxed">Without prejudice to any other rights, where any invoice remains unpaid beyond its due date, Ikarmic reserves the right to: (a) charge statutory interest at 8% per annum above the Bank of England base rate on the outstanding sum, accruing daily from the due date to the date of payment, in accordance with the Late Payment of Commercial Debts (Interest) Act 1998; (b) suspend performance of the Services until payment is received; and (c) terminate the engagement on written notice where payment remains outstanding after a reasonable cure period.</p>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">7.4 Expenses</h3>
          <p className="leading-relaxed">Pre-approved, reasonable out-of-pocket expenses incurred in connection with the Services (such as travel, accommodation, or third-party software licences) will be invoiced at cost and supported by receipts.</p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">8. Project Engagement</h2>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">8.1 Statement of Work</h3>
          <p className="mb-4 leading-relaxed">Each client engagement is governed by a mutually signed SOW, which forms part of these Terms and prevails over them in the event of any conflict.</p>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">8.2 Client responsibilities</h3>
          <p className="mb-4 leading-relaxed">The Client agrees to provide timely co-operation, access to relevant systems and data, input from appropriate personnel, and any other information or approvals reasonably required for Ikarmic to perform the Services. Ikarmic is not responsible for delays or failures arising from the Client&apos;s failure to meet these responsibilities.</p>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">8.3 Change requests</h3>
          <p className="mb-4 leading-relaxed">Any changes to the agreed scope, specification, timeline, or budget must be requested in writing and agreed by both parties in a signed change order before work commences on the changed scope. Ikarmic reserves the right to adjust timelines and fees to reflect the impact of approved change requests.</p>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">8.4 Acceptance</h3>
          <p className="mb-4 leading-relaxed">Acceptance criteria for Deliverables will be set out in the SOW. The Client agrees to review and either accept or provide written feedback within the acceptance period specified in the SOW (or 10 business days where no period is specified). Failure to respond within the acceptance period will be deemed acceptance. Ikarmic will use reasonable commercial endeavours to remedy any material non-conformances identified during acceptance testing within a reasonable timeframe.</p>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">8.5 AI-specific considerations</h3>
          <p className="leading-relaxed">The Client acknowledges the inherent technical limitations of AI and machine learning technologies, including (without limitation) the potential for unexpected outputs, model drift over time, sensitivity to input data quality and distribution, and variation in performance across different contexts or datasets. Ikarmic does not warrant that any AI Deliverable will be free from errors, biases, or unexpected behaviour, or that it will achieve any specific performance metric or business outcome. Ikarmic will document known limitations and recommended human oversight measures in all AI Deliverables. The Client is solely responsible for evaluating the suitability of AI Deliverables for their intended purpose prior to production deployment, including any required regulatory, ethical, or safety assessments.</p>
        </section>

        {/* 9 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">9. Warranties and Disclaimers</h2>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">9.1 Ikarmic&apos;s warranties</h3>
          <p className="mb-3 leading-relaxed">Ikarmic warrants that:</p>
          <ul className="list-disc list-outside ml-5 space-y-2 mb-6">
            <li>It has the right and authority to enter into these Terms and any SOW.</li>
            <li>It will assign appropriately skilled and experienced personnel to each engagement.</li>
            <li>Services will be performed with reasonable care and skill, consistent with good industry practice.</li>
            <li>Deliverables will materially conform to the specifications set out in the applicable SOW at the time of delivery.</li>
            <li>To the best of Ikarmic&apos;s knowledge at the time of delivery, Deliverables created by Ikarmic do not infringe the Intellectual Property Rights of any third party (excluding any infringement arising from Client materials or open-source components).</li>
          </ul>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">9.2 Disclaimer</h3>
          <p className="leading-relaxed">Except as expressly stated in Section 9.1 or in an applicable SOW, all Services are provided &ldquo;as is&rdquo; without warranty of any kind. To the fullest extent permitted by applicable law, Ikarmic expressly disclaims all implied warranties, including (without limitation) implied warranties of merchantability, fitness for a particular purpose, and non-infringement. Ikarmic does not warrant that: the Website will operate continuously, securely, or free of errors; AI outputs will be accurate, complete, unbiased, or suitable for any regulatory purpose without human review; or that results achieved in a proof-of-concept or pilot environment will be replicated at production scale. The Client is solely responsible for evaluating the suitability of Services and Deliverables before deploying them in any production or regulated environment.</p>
        </section>

        {/* 10 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">10. Limitation of Liability</h2>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">10.1 Liability cap</h3>
          <p className="mb-4 leading-relaxed">Subject to Section 10.3, Ikarmic&apos;s total aggregate liability to the Client under or in connection with these Terms or any SOW — whether arising in contract, tort (including negligence), breach of statutory duty, or otherwise — shall not exceed the total fees paid or payable by the Client to Ikarmic under the applicable SOW (or, if no SOW applies, all SOWs) in the twelve (12) months immediately preceding the event giving rise to the claim.</p>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">10.2 Excluded losses</h3>
          <p className="mb-4 leading-relaxed">Subject to Section 10.3, neither party shall be liable to the other for any indirect, special, consequential, or incidental loss, including (without limitation) loss of profits, revenue, business, anticipated savings, contracts, goodwill or reputation, loss of data, wasted expenditure, or any special, exemplary, or punitive damages, even if that party has been advised of the possibility of such losses.</p>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">10.3 Exceptions</h3>
          <p className="mb-4 leading-relaxed">Nothing in these Terms limits or excludes liability for: (a) death or personal injury caused by negligence; (b) fraud or fraudulent misrepresentation; or (c) any other liability that cannot be excluded or limited by applicable law.</p>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">10.4 Duty to mitigate</h3>
          <p className="leading-relaxed">The Client is under a duty to take all reasonable steps to mitigate any loss or damage suffered in connection with these Terms.</p>
        </section>

        {/* 11 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">11. Indemnification</h2>
          <p className="mb-3 leading-relaxed">The Client shall indemnify and hold harmless Ikarmic, its officers, directors, employees, and contractors from and against any claims, liabilities, damages, judgements, awards, costs, and expenses (including reasonable legal fees) arising out of or relating to:</p>
          <ul className="list-disc list-outside ml-5 space-y-2">
            <li>The Client&apos;s breach of these Terms or any SOW.</li>
            <li>Any allegation that Client materials provided to Ikarmic infringe the Intellectual Property Rights of any third party.</li>
            <li>The Client&apos;s use of Deliverables or AI systems beyond the scope sanctioned by Ikarmic or in production environments without appropriate human oversight.</li>
            <li>Third-party claims arising from the Client&apos;s own deployment, modification, or operation of AI systems developed or designed by Ikarmic.</li>
          </ul>
        </section>

        {/* 12 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">12. Force Majeure</h2>
          <p className="mb-3 leading-relaxed">Neither party shall be in breach of these Terms, nor liable for any failure or delay in the performance of its obligations, where such failure or delay arises from or is attributable to a Force Majeure Event. A &ldquo;Force Majeure Event&rdquo; means any event beyond a party&apos;s reasonable control, including (without limitation): acts of God; war, riot, or terrorism; pandemic or epidemic; governmental or regulatory actions; industrial action not involving the affected party&apos;s own workforce; failure of third-party internet or telecommunications infrastructure; or prolonged power outage.</p>
          <p className="mb-3 leading-relaxed">The affected party must notify the other party promptly of the Force Majeure Event and take all reasonable steps to mitigate the impact and resume performance as soon as practicable.</p>
          <p className="leading-relaxed">If a Force Majeure Event continues for 60 or more consecutive days, either party may terminate the relevant SOW (or these Terms in their entirety) without liability to the other, save for payment by the Client of fees for all Services completed or accepted as at the date of termination.</p>
        </section>

        {/* 13 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">13. Term and Termination</h2>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">13.1 Engagement term</h3>
          <p className="mb-4 leading-relaxed">These Terms come into effect upon your first use of the Website or signature of a SOW, whichever is earlier. Each SOW will remain in effect until the specified end date or until all Services have been delivered and all fees paid, unless earlier terminated in accordance with these Terms.</p>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">13.2 Termination for convenience</h3>
          <p className="mb-4 leading-relaxed">Either party may terminate a SOW for convenience by giving the other party 30 days&apos; written notice. In the event of such termination, the Client shall pay all fees for Services performed up to and including the termination date, together with any reasonable costs and non-cancellable commitments already incurred by Ikarmic in connection with the engagement.</p>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">13.3 Termination for cause</h3>
          <p className="mb-4 leading-relaxed">Either party may terminate a SOW or these Terms immediately by written notice if: (a) the other party commits a material breach and (where the breach is capable of remedy) fails to remedy it within 20 business days of receiving written notice; (b) the other party becomes insolvent, is placed into administration or liquidation, makes a voluntary arrangement with its creditors, or ceases or threatens to cease trading.</p>
          <h3 className="text-base font-semibold text-neutral-200 mb-2">13.4 Consequences of termination</h3>
          <p className="leading-relaxed">Upon expiry or termination of any SOW or these Terms: each party shall promptly return or (where agreed) securely destroy the other&apos;s Confidential Information; all outstanding fees become immediately due and payable; and the following provisions survive termination: confidentiality (Section 5), intellectual property (Section 4), limitation of liability (Section 10), indemnification (Section 11), governing law (Section 15), and any other provisions which by their nature should survive. Termination does not affect any accrued rights or liabilities of either party.</p>
        </section>

        {/* 14 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">14. Dispute Resolution</h2>
          <p className="mb-3 leading-relaxed">If a dispute arises between the parties relating to these Terms or any SOW, the parties shall first seek to resolve the dispute through good-faith negotiations between senior representatives. Either party may formally initiate this process by sending a written notice of dispute to the other; the parties shall then meet (in person or virtually) within 30 days of such notice to attempt to resolve the dispute.</p>
          <p className="mb-3 leading-relaxed">If the dispute is not resolved through negotiation within 30 days (or such extended period as the parties may agree), either party may refer the dispute to CEDR (Centre for Effective Dispute Resolution) or a mutually agreed mediator for mediation, before commencing any court or tribunal proceedings. Participation in mediation is a condition precedent to commencing proceedings, except where urgent injunctive or other equitable relief is required to protect a party&apos;s position.</p>
          <p className="leading-relaxed">Nothing in this section prevents either party from seeking urgent injunctive or equitable relief from a court of competent jurisdiction without first complying with the above procedure.</p>
        </section>

        {/* 15 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">15. Governing Law and Jurisdiction</h2>
          <p className="leading-relaxed">These Terms and any SOW, and all non-contractual obligations arising from or in connection with them, are governed by and shall be construed in accordance with the laws of England and Wales. The courts of England and Wales shall have exclusive jurisdiction to settle any disputes arising out of or in connection with these Terms or any SOW, subject always to the dispute resolution procedure set out in Section 14.</p>
        </section>

        {/* 16 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">16. General Provisions</h2>
          <div className="space-y-4">
            {[
              { title: "Entire agreement", body: "These Terms, together with any applicable SOW, MSA, or engagement letter, constitute the entire agreement between the parties in relation to the subject matter and supersede all prior agreements, representations, negotiations, and understandings, whether oral or written." },
              { title: "Amendments", body: "Ikarmic may amend these Terms from time to time by posting a revised version on the Website with an updated effective date. Changes will not apply retroactively to any existing signed engagements without the Client's written consent. Continued use of the Website after amendments are posted constitutes acceptance of the revised Terms." },
              { title: "Waiver", body: "No failure or delay by either party in exercising any right or remedy under these Terms shall constitute a waiver of that right or remedy. Any waiver must be in writing and signed by the waiving party to be effective." },
              { title: "Severability", body: "If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, that provision shall be severed, and the remaining provisions shall continue in full force and effect." },
              { title: "Assignment", body: "The Client may not assign, transfer, or sub-contract any of its rights or obligations under these Terms or any SOW without Ikarmic's prior written consent. Ikarmic may assign its rights and obligations to an affiliate or to a successor entity in connection with a merger, acquisition, or sale of substantially all of its assets, on written notice to the Client." },
              { title: "No partnership or agency", body: "Nothing in these Terms creates or implies a partnership, joint venture, employment relationship, or agency between the parties." },
              { title: "Third-party rights", body: "These Terms do not confer any rights on any third party pursuant to the Contracts (Rights of Third Parties) Act 1999 or otherwise, except that any direct affiliate of Ikarmic may enforce any right or obligation under these Terms that is expressed to apply for its benefit." },
              { title: "Notices", body: "All notices under these Terms must be in writing and delivered by email (with acknowledgement of receipt) or by recorded postal delivery to the addresses specified in the applicable SOW, or to the contact details available on the Website." },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                <p className="text-neutral-200 font-semibold mb-1 capitalize">{item.title}</p>
                <p className="text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 17 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">17. Contact</h2>
          <p className="mb-4 leading-relaxed">If you have any questions or concerns about these Terms, or to provide a notice under them, please contact us:</p>
          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-sm space-y-1">
            <p className="text-white font-medium">Ikarmic AI Services and Solutions</p>
            <p>Email: <a href="mailto:hello@ikarmic.com" className="text-indigo-400 hover:text-indigo-300">hello@ikarmic.com</a></p>
            <p>Website: <a href="https://ikarmic.com" className="text-indigo-400 hover:text-indigo-300">https://ikarmic.com</a></p>
          </div>
        </section>

      </div>
    </article>
  );
}
