import React, { useEffect, useCallback } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  image?: string;
  lang?: string;
  schema?: Record<string, any> | Record<string, any>[];
  ogType?: 'website' | 'article' | 'product';
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath = '/',
  image = 'https://pdfcanada.ca/og-image.png',
  lang = 'en',
  schema,
  ogType = 'website'
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
    setMeta('property', 'og:image:alt', title);
    setMeta('property', 'og:locale', lang === 'fr' ? 'fr_CA' : 'en_CA');
    setMeta('property', 'og:site_name', 'pdfcanada.ca');

    // 5. Update Twitter
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:url', `https://pdfcanada.ca${canonicalPath}`);
    setMeta('name', 'twitter:image', image);
    setMeta('name', 'twitter:image:alt', title);

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

    // 7. Dynamic JSON-LD Structured Data
    // Remove existing dynamic schemas
    document.querySelectorAll('script[data-dynamic-schema]').forEach(el => el.remove());

    if (schema) {
      const schemas = Array.isArray(schema) ? schema : [schema];
      schemas.forEach((schemaItem, index) => {
        const script = document.createElement('script');
        script.setAttribute('data-dynamic-schema', 'true');
        script.id = `dynamic-schema-${index}`;
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schemaItem);
        document.head.appendChild(script);
      });
    }

  }, [title, description, canonicalPath, image, lang, schema, ogType, setMeta]);

  return null;
};