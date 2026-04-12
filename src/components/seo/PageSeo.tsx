import { Helmet } from 'react-helmet-async';
import { DEFAULT_OG_IMAGE, SITE_NAME, buildCanonicalUrl, type PageSeoConfig } from '../../lib/seo';

type PageSeoProps = {
  config: PageSeoConfig;
};

const PageSeo = ({ config }: PageSeoProps) => {
  const canonicalUrl = buildCanonicalUrl(config.path);
  const title = `${config.title} | ${SITE_NAME}`;
  const schemaList = Array.isArray(config.schema)
    ? config.schema
    : config.schema
      ? [config.schema]
      : [];

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={config.description} />
      <meta name="keywords" content={config.keywords ?? 'AI consulting, machine learning solutions, AI automation, conversational AI, predictive analytics'} />
      <meta name="robots" content={config.noindex ? 'noindex, nofollow' : 'index, follow'} />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={config.type ?? 'website'} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={config.description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={buildCanonicalUrl(DEFAULT_OG_IMAGE)} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={config.description} />
      <meta name="twitter:image" content={buildCanonicalUrl(DEFAULT_OG_IMAGE)} />

      {schemaList.map((schemaItem, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schemaItem)}
        </script>
      ))}
    </Helmet>
  );
};

export default PageSeo;
