"use client";

import React, { useEffect } from 'react';

interface JsonLdProps {
  schema: Record<string, unknown> | null;
}

const JsonLd: React.FC<JsonLdProps> = ({ schema }) => {
  useEffect(() => {
    const scriptId = 'jsonld-structured-data';
    if (!schema) {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
      return;
    }

    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(schema);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [schema]);

  return null;
};

export default JsonLd;
