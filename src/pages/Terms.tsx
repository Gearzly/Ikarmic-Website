const Terms = () => {
  return (
    <main className="relative pt-24 pb-20">
      <div className="w-full px-6 lg:px-12">
        <article className="max-w-4xl mx-auto glass-card rounded-3xl p-8 lg:p-12">
          <span className="micro-label block mb-6">LEGAL</span>
          <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-6">Terms of Service</h1>
          <p className="text-[#A7B1D8] leading-relaxed mb-8">
            Effective date: April 12, 2026. By using this website and requesting services, you agree to
            these terms.
          </p>

          <section className="space-y-5 text-[#A7B1D8] leading-relaxed">
            <p>
              <strong className="text-white">Scope:</strong> all proposals, statements of work, and project
              contracts define final deliverables, timelines, and commercial terms.
            </p>
            <p>
              <strong className="text-white">Intellectual property:</strong> ownership and licensing of code,
              models, and documentation are specified per contract.
            </p>
            <p>
              <strong className="text-white">Confidentiality:</strong> both parties agree to protect
              confidential and proprietary information.
            </p>
            <p>
              <strong className="text-white">Warranties and liability:</strong> services are provided on a
              best-effort basis, with liability limits defined in signed agreements.
            </p>
            <p>
              <strong className="text-white">Contact:</strong> questions about these terms can be sent to
              hello@ikarmic.ai.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
};

export default Terms;
