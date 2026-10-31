import React from 'react';

interface JsonLdProps {
  schema: Record<string, unknown> | null;
}

/**
 * Structured data, rendered into the server HTML so crawlers see it without running JavaScript.
 * `<` is escaped so text in the schema can never close the script tag.
 */
const JsonLd: React.FC<JsonLdProps> = ({ schema }) => {
  if (!schema) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
    />
  );
};

export default JsonLd;
