import React, {useLayoutEffect, useRef} from 'react';

interface FakeSpanProps {
  textValue: string;
  updateFakeSpanWidth: (width: string) => void;
}

const FakeSpan: React.FC<FakeSpanProps> = ({
  textValue,
  updateFakeSpanWidth,
}) => {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      const newWidth = getComputedStyle(ref.current).width;
      updateFakeSpanWidth(newWidth);
    }
  }, [textValue, updateFakeSpanWidth]);

  return (
    <span ref={ref} className='absolute invisible whitespace-pre'>
      {textValue}
    </span>
  );
};

export {FakeSpan};
