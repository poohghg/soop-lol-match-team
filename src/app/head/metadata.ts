import type { Metadata } from 'next';

const TITLE = 'soop-lol-match-finder';

const DESCRIPTION = 'soop-lol-match-finder';

const KEYWORDS = 'soop-lol-match-finder';

interface Props {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
}

export default function getMetadata(
  { title = TITLE, description = DESCRIPTION, keywords = KEYWORDS, url }: Props = {
    title: TITLE,
    description: DESCRIPTION,
    keywords: KEYWORDS,
  }
): Metadata {
  return {
    title: `${title} ${process.env.ENV ? ` | (${process.env.COMPONENT_VERSION})` : ''}`,
    description,
    keywords,
    formatDetection: { telephone: false },
    applicationName: '',
    openGraph: {
      type: 'website',
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: '',
      site: '',
      creator: '',
    },
    appleWebApp: {
      title: TITLE,
      capable: false,
    },
  };
}
