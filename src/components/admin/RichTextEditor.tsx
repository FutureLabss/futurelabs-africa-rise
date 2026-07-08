"use client";

import React, { useState, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Link as LinkIcon, 
  Undo, 
  Redo,
  Quote,
  Code,
  Type,
  RemoveFormatting,
  ExternalLink,
  Unlink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const ToolbarButton = ({ 
  onClick, isActive, children, title, disabled = false 
}: { 
  onClick: () => void; 
  isActive?: boolean; 
  children: React.ReactNode; 
  title: string;
  disabled?: boolean;
}) => (
  <Button
    type="button"
    variant="ghost"
    size="sm"
    className={cn(
      'h-8 w-8 p-0 transition-colors', 
      isActive ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'text-muted-foreground hover:bg-muted'
    )}
    onClick={onClick}
    title={title}
    disabled={disabled}
  >
    {children}
  </Button>
);

const RichTextEditor = ({ content, onChange, placeholder }: RichTextEditorProps) => {
  const [linkUrl, setLinkUrl] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { 
          class: 'text-primary underline underline-offset-4 font-medium transition-colors hover:text-primary/80',
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sm dark:prose-invert max-w-none p-4 min-h-[200px] focus:outline-none focus-visible:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    if (linkUrl === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
    }
    setLinkUrl('');
  }, [editor, linkUrl]);

  const onLinkPopoverOpen = () => {
    if (editor) {
      setLinkUrl(editor.getAttributes('link').href || '');
    }
  };

  if (!editor) return null;

  return (
    <div className="group border border-input rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-200">
      {/* Main Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border bg-muted/20 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-1 pr-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive('heading', { level: 1 })}
            title="Heading 1"
          >
            <Heading1 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
            title="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setParagraph().run()}
            isActive={editor.isActive('paragraph')}
            title="Normal Text"
          >
            <Type className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <Separator orientation="vertical" className="h-6 bg-border" />

        <div className="flex items-center gap-1 px-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            title="Underline"
          >
            <UnderlineIcon className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive('code')}
            title="Inline Code"
          >
            <Code className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <Separator orientation="vertical" className="h-6 bg-border" />

        <div className="flex items-center gap-1 px-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            title="Ordered List"
          >
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            title="Blockquote"
          >
            <Quote className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <Separator orientation="vertical" className="h-6 bg-border" />

        <div className="flex items-center gap-1 px-1">
          <Popover onOpenChange={(open) => open && onLinkPopoverOpen()}>
            <PopoverTrigger asChild>
              <ToolbarButton
                onClick={() => {}}
                isActive={editor.isActive('link')}
                title="Add Link"
              >
                <LinkIcon className="h-4 w-4" />
              </ToolbarButton>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-3" align="start">
              <div className="space-y-3">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium leading-none">Add Link</h4>
                  <p className="text-xs text-muted-foreground">Enter a URL to link selected text.</p>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="https://example.com"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && setLink()}
                    className="h-8 text-xs"
                  />
                  <Button size="sm" className="h-8 px-3" onClick={setLink}>
                    Apply
                  </Button>
                </div>
                {editor.isActive('link') && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full h-8 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      editor.chain().focus().unsetLink().run();
                    }}
                  >
                    <Unlink className="h-3 w-3 mr-2" />
                    Remove Link
                  </Button>
                )}
              </div>
            </PopoverContent>
          </Popover>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
            title="Clear Formatting"
          >
            <RemoveFormatting className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-1 pl-1 border-l border-border ml-1">
          <ToolbarButton 
            onClick={() => editor.chain().focus().undo().run()} 
            disabled={!editor.can().undo()}
            title="Undo"
          >
            <Undo className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton 
            onClick={() => editor.chain().focus().redo().run()} 
            disabled={!editor.can().redo()}
            title="Redo"
          >
            <Redo className="h-4 w-4" />
          </ToolbarButton>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="relative">
        {editor.isEmpty && placeholder && (
          <div className="absolute top-4 left-4 text-muted-foreground pointer-events-none text-sm italic opacity-50">
            {placeholder}
          </div>
        )}
        <EditorContent editor={editor} />
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between px-3 py-1.5 border-t border-border bg-muted/10 text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
        <div className="flex items-center gap-2">
          <span>Rich Text Mode</span>
          <span>·</span>
          <span>{editor.storage.characterCount?.characters?.() || 0} Characters</span>
        </div>
        <div className="flex items-center gap-2">
          <ExternalLink className="h-3 w-3" />
          <span>HTML Output</span>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
