import React from 'react';
import {IService} from '../types';

interface SearchResultsProps {
  results: IService[];
}

const SearchResults: React.FC<SearchResultsProps> = ({results}) => {
  return (
    <ul className='bg-white overflow-auto z-10 mt-12 top-0 max-h-72 absolute w-full border border-[#EAECED] rounded-b-md shadow-sm scrollbar-minimal'>
      {results.map(({name, id}) => (
        <li
          key={id}
          className='border-b border-b-[#F5F5F5] p-3 cursor-pointer hover:bg-[#E5F1FF] list-none select-none'>
          {name}
        </li>
      ))}
    </ul>
  );
};

export  {SearchResults};
