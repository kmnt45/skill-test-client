import { FC } from 'react';

import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

import 'highlight.js/styles/github-dark.css';
import styles from 'shared/ui/Markdown/ui/Markdown.module.scss';

type MarkdownProps = {
  content: string;
};

export const Markdown: FC<MarkdownProps> = ({ content }) => {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
