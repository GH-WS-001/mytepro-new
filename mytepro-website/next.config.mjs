import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.js');

const nextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);