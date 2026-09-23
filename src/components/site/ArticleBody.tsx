import React from 'react';
import ReactMarkdown from 'react-markdown';

/** Strips the common indentation that template-literal content picks up. */
function dedent(content: string): string {
  const lines = content.split('\n');
  const indents = lines.filter((l) => l.trim()).map((l) => l.match(/^(\s*)/)![1].length);
  const min = indents.length ? Math.min(...indents) : 0;
  return lines.map((l) => (l.length >= min ? l.slice(min) : l.trimStart())).join('\n').trim();
}

function textOf(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (React.isValidElement(node)) return textOf((node.props as { children?: React.ReactNode }).children);
  return '';
}

/**
 * Posts are written as plain paragraphs; a short line with no closing full stop
 * ("What We Are Looking For", "**Role Overview**") is a section heading.
 */
function isHeading(children: React.ReactNode) {
  const text = textOf(children).trim();
  if (!text || text.length > 64) return false;
  if (/[.,;:!]$/.test(text) || /^[^\w*]/.test(text)) return false;
  const kids = React.Children.toArray(children);
  // Either plain text, or a single bold run.
  return kids.every((k) => typeof k === 'string') || (kids.length === 1 && React.isValidElement(kids[0]) && kids[0].type === 'strong');
}

export default function ArticleBody({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) =>
          isHeading(children) ? (
            <h2 className="m-0 mt-[22px] border-t border-fl-paper/[.12] pt-[22px] text-[25px] font-semibold leading-[1.15] tracking-[-0.026em] [&_strong]:font-semibold">
              {children}
            </h2>
          ) : (
            <p className="m-0 text-[17px] leading-[1.72] text-fl-body sm:text-[17.5px]" style={{ textWrap: 'pretty' }}>
              {children}
            </p>
          ),
        h1: ({ children }) => <h2 className="m-0 mt-[22px] border-t border-fl-paper/[.12] pt-[22px] text-[25px] font-semibold leading-[1.15] tracking-[-0.026em]">{children}</h2>,
        h2: ({ children }) => <h2 className="m-0 mt-[22px] border-t border-fl-paper/[.12] pt-[22px] text-[25px] font-semibold leading-[1.15] tracking-[-0.026em]">{children}</h2>,
        h3: ({ children }) => <h3 className="m-0 mt-2 text-[20px] font-semibold tracking-[-0.02em]">{children}</h3>,
        ul: ({ children }) => (
          <ul className="m-0 flex list-none flex-col bg-fl-graphite p-0 shadow-[0_0_0_1px_rgba(242,240,234,.14)]">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="m-0 flex list-none flex-col bg-fl-graphite p-0 shadow-[0_0_0_1px_rgba(242,240,234,.14)]">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="flex items-baseline gap-3.5 border-b border-fl-paper/[.08] px-[18px] py-[15px] text-[15.5px] leading-[1.55] text-fl-body last:border-b-0">
            <span aria-hidden className="h-1.5 w-1.5 flex-none -translate-y-0.5 bg-fl-orange" />
            <span className="[&>p]:m-0">{children}</span>
          </li>
        ),
        strong: ({ children }) => <strong className="font-semibold text-fl-paper">{children}</strong>,
        em: ({ children }) => <em className="text-fl-soft">{children}</em>,
        a: ({ href = '', children }) => {
          const internal = href.startsWith('/');
          return (
            <a
              href={href}
              className="font-medium text-fl-orange underline decoration-fl-orange/40 underline-offset-4 hover:text-fl-paper"
              {...(internal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
            >
              {children}
            </a>
          );
        },
      }}
    >
      {dedent(content)}
    </ReactMarkdown>
  );
}
