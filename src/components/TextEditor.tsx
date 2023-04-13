import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: '3' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

interface ITextEditor {
  className?: string;
}

export const TextEditor: React.FC<ITextEditor> = ({ className }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    console.log(content);
  }, [content]);

  return (
    <div>
      <QuillNoSSRWrapper
        className={`${className ? className : ''}`}
        modules={modules}
        onChange={setContent}
        theme="snow"
      />
    </div>
  );
};
