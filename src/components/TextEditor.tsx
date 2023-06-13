import React from 'react'
import dynamic from 'next/dynamic';
import ReactQuill from 'react-quill'

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
  defaultValue?: ReactQuill.Value;
  currentValue: ReactQuill.Value;
  // eslint-disable-next-line
  handleBodyChange: (arg: string) => void;
}

export const TextEditor: React.FC<ITextEditor> = ({
  className,
  handleBodyChange,
  defaultValue,
  currentValue,
}) => (
  <div>
    <QuillNoSSRWrapper
      className={`${className || ''}`}
      modules={modules}
      value={defaultValue || currentValue}
      onChange={(value) => handleBodyChange(value)}
      theme="snow"
    />
  </div>
);
