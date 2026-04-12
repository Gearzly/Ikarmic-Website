const Privacy = () => {
  return (
    <main className="relative pt-24 pb-20">
      <div className="w-full px-6 lg:px-12">
        <article className="max-w-4xl mx-auto glass-card rounded-3xl p-8 lg:p-12">
          <span className="micro-label block mb-6">LEGAL</span>
          <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-6">Privacy Policy</h1>
          <p className="text-[#A7B1D8] leading-relaxed mb-8">
            Effective date: April 12, 2026. Ikarmic AI Services and Solutions collects the information
            needed to respond to inquiries, deliver consulting services, and improve website performance.
          </p>

          <section className="space-y-5 text-[#A7B1D8] leading-relaxed">
            <p>
              <strong className="text-white">Information we collect:</strong> contact details, company
              details, project requirements, and website analytics data.
            </p>
            <p>
              <strong className="text-white">How we use data:</strong> to respond to requests, provide
              project estimates, deliver contracted services, and improve service quality.
            </p>
            <p>
              <strong className="text-white">Data sharing:</strong> we do not sell personal data. We only
              share data with essential service providers under confidentiality obligations.
            </p>
            <p>
              <strong className="text-white">Retention:</strong> inquiry records are retained for up to 24
              months unless a longer period is required by law or active contracts.
            </p>
            <p>
              <strong className="text-white">Contact:</strong> for privacy requests, email hello@ikarmic.ai.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
};

export default Privacy;
