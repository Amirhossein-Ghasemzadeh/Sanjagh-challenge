import React, {useEffect, useState, useRef} from 'react';
import {FakeSpan} from './index';

interface FeaturefulSearchInputProps {
  searchInputChangeHandler: (value: string) => void;
  firstServiceSearchResults: string;
}

const FeaturefulSearchInput: React.FC<FeaturefulSearchInputProps> = ({
  searchInputChangeHandler,
  firstServiceSearchResults,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputValue = inputRef.current?.value || '';

  const [fakeSpanDomWidth, setFakeSpanDomWidth] = useState<string>('100%');
  const [suggestionInputPlaceholder, setSuggestionInputPlaceholder] =
    useState<string>('');

  const updateFakeSpanWidth = (value: string) => setFakeSpanDomWidth(value);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.currentTarget;
    searchInputChangeHandler(value);
  };

  useEffect(() => {
    const isInputValueSubstringOfFirstSearchItem =
      inputValue === firstServiceSearchResults.substring(0, inputValue?.length);
    setSuggestionInputPlaceholder(
      isInputValueSubstringOfFirstSearchItem ? firstServiceSearchResults : ''
    );
  }, [inputValue, firstServiceSearchResults]);

  const shouldInputExpand =
    fakeSpanDomWidth === '0px' || !suggestionInputPlaceholder.length;

  return (
    <div className='flex w-full'>
      <div className='relative flex items-center justify-between w-full overflow-hidden'>
        <input
          ref={inputRef}
          className='absolute text-gray-700 outline-none'
          style={{width: shouldInputExpand ? '100%' : fakeSpanDomWidth}}
          value={inputValue}
          onChange={handleSearchInputChange}
          placeholder='به چه خدمتی نیاز دارید؟'
        />
        <FakeSpan
          textValue={inputValue}
          updateFakeSpanWidth={updateFakeSpanWidth}
        />
        <input
          placeholder={suggestionInputPlaceholder}
          className='w-full outline-none'
        />
      </div>
    </div>
  );
};

export {FeaturefulSearchInput};
