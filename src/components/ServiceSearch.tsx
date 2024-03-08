import React, {useEffect, useState, useMemo} from 'react';
import {SearchResults, FeaturefulSearchInput} from './index';
import {IService} from '../types';

const ServiceSearch: React.FC = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [serviceSearchInputValue, setServiceSearchInputValue] =
    useState<string>('');

  const filteredServices = useMemo(() => {
    if (!serviceSearchInputValue.length) return [];
    return services.filter((s) => s.name.includes(serviceSearchInputValue));
  }, [services, serviceSearchInputValue]);

  const searchInputChangeHandler = (value: string) =>
    setServiceSearchInputValue(value);

  useEffect(() => {
    fetch('/api/services?zoneId=1').then((res) =>
      res.json().then((s: IService[]) => setServices(s))
    );
  }, []);

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-white z-[99999] cursor-default'>
      <div className='px-3 m-auto py-7 max-w-96'>
        <div className='relative flex items-center w-full rounded-md shadow-sm'>
          <div className='relative flex flex-col justify-center w-full'>
            <div className='flex items-center h-12 p-3 border border-gray-200 rounded-lg'>
              <FeaturefulSearchInput
                searchInputChangeHandler={searchInputChangeHandler}
                firstServiceSearchResults={filteredServices[0]?.name || ''}
              />
            </div>
            <span className='absolute left-0 self-center h-9 w-0 border-r-[1px] border-gray-200' />
          </div>
          <SearchResults results={filteredServices} />
        </div>
      </div>
    </div>
  );
};

export  {ServiceSearch};
