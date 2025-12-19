import React, { useEffect, useCallback, useMemo } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  image?: string;
  lang?: string;
  schema?: Record<string, any> | Record<string, any>[];
  breadcrumbs?: { name: string; path: string }[];
  ogType?: 'website' | 'article' | 'product';
  noOrganization?: boolean;
}

// Organization schema - reused across pages
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://pdfcanada.ca/#organization",
  "name": "pdfcanada.ca",
  "url": "https://pdfcanada.ca",
  "logo": {
    "@type": "ImageObject",
    "url": "https://pdfcanada.ca/android-chrome-512x512.png",
    "width": 512,
    "height": 512
  },
  "sameAs": [
    "https://twitter.com/pdfcanada"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Toronto",
    "addressRegion": "Ontario",
    "addressCountry": "CA"
  },
  "foundingDate": "2024",
  "description": "Free, secure, and privacy-focused PDF tools built in Canada. All processing happens locally in your browser."
};

// WebSite schema for sitelinks search box
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://pdfcanada.ca/#website",
  "name": "pdfcanada.ca",
  "url": "https://pdfcanada.ca",
  "publisher": {
    "@id": "https://pdfcanada.ca/#organization",
    "name": "pdfcanada.ca",
    "logo": {
      "@type": "ImageObject",
      "url": "https://pdfcanada.ca/android-chrome-512x512.png"
    }
  },
  "inLanguage": ["en-CA", "fr-CA"],
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://pdfcanada.ca/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath = '/',
  image = 'https://pdfcanada.ca/og-image.png',
  lang = 'en',
  schema,
  breadcrumbs,
  ogType = 'website',
  noOrganization = false
}) => {
  // Memoize the setMeta helper function
  const setMeta = useCallback((attrName: string, attrValue: string, content: string) => {
    let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attrName, attrValue);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  }, []);

  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Update HTML Lang Attribute
    document.documentElement.lang = lang;

    // 3. Update Meta Description
    setMeta('name', 'description', description);

    // 4. Update Open Graph
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', `https://pdfcanada.ca${canonicalPath}`);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:type', 'image/png');
    setMeta('property', 'og:image:alt', title);
    setMeta('property', 'og:locale', lang === 'fr' ? 'fr_CA' : 'en_CA');
    setMeta('property', 'og:site_name', 'pdfcanada.ca');

    // 5. Update Twitter
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:url', `https://pdfcanada.ca${canonicalPath}`);
    setMeta('name', 'twitter:image', image);
    setMeta('name', 'twitter:image:alt', `${title} - pdfcanada.ca`);
    setMeta('name', 'twitter:creator', '@pdfcanada');

    // 6. Update Canonical Link
    let link = document.querySelector('link[rel="canonical"]');
    if (link) {
      link.setAttribute('href', `https://pdfcanada.ca${canonicalPath}`);
    } else {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', `https://pdfcanada.ca${canonicalPath}`);
      document.head.appendChild(link);
    }

    // 6b. Update hreflang links dynamically
    const updateHreflang = (hreflang: string, href: string) => {
      let hreflangLink = document.querySelector(`link[hreflang="${hreflang}"]`);
      if (hreflangLink) {
        hreflangLink.setAttribute('href', href);
      } else {
        hreflangLink = document.createElement('link');
        hreflangLink.setAttribute('rel', 'alternate');
        hreflangLink.setAttribute('hreflang', hreflang);
        hreflangLink.setAttribute('href', href);
        document.head.appendChild(hreflangLink);
      }
    };

    // Determine English and French paths
    const basePath = canonicalPath.startsWith('/fr/') ? canonicalPath.slice(3) : canonicalPath;
    const enPath = basePath === '' ? '/' : basePath;
    const frPath = basePath === '/' ? '/fr/' : `/fr${basePath}`;

    updateHreflang('en', `https://pdfcanada.ca${enPath}`);
    updateHreflang('fr', `https://pdfcanada.ca${frPath}`);
    updateHreflang('x-default', `https://pdfcanada.ca${enPath}`);

    // 7. Dynamic JSON-LD Structured Data
    // Remove existing dynamic schemas
    document.querySelectorAll('script[data-dynamic-schema]').forEach(el => el.remove());

    // Build combined schemas array
    const allSchemas: Record<string, any>[] = [];

    // Add Organization and WebSite schemas (unless explicitly disabled)
    if (!noOrganization) {
      allSchemas.push(organizationSchema);
      allSchemas.push(websiteSchema);
    }

    // Add Breadcrumbs schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      allSchemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": crumb.path.startsWith('http') ? crumb.path : `https://pdfcanada.ca${crumb.path}`
        }))
      });
    }

    // Add page-specific schemas
    if (schema) {
      const pageSchemas = Array.isArray(schema) ? schema : [schema];
      allSchemas.push(...pageSchemas);
    }

    // Inject all schemas
    allSchemas.forEach((schemaItem, index) => {
      const script = document.createElement('script');
      script.setAttribute('data-dynamic-schema', 'true');
      script.id = `dynamic-schema-${index}`;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schemaItem);
      document.head.appendChild(script);
    });

  }, [title, description, canonicalPath, image, lang, schema, ogType, setMeta, noOrganization]);

  return null;
};