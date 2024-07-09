import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelectedItem } from './SelectedItemContext';
const { handleCollection } = require('../utils/utils')
const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { selectedItem, desktopinputRef, mobileInputRef, setSearchBarVisible, isSearchBarVisible } = useSelectedItem();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setDropdownOpen(false);
        setSearchBarVisible(false)
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handleClick = () => {
    setSearchBarVisible(true);
    if (window.innerWidth >= 640 && desktopinputRef) {
      desktopinputRef.current.focus();
    } else if (mobileInputRef.current) {
      mobileInputRef.current.focus();
    }
  };

  return (
    <div className='main'>
      <div className='fixed w-full z-20'>
        <div className='title bg-red-700 text-white text-center p-1 font-bold' style={{ backgroundColor: selectedItem ? selectedItem?.backgroundColor : "" }}>
          EVERY OUTFIT HAS A LOVE STORY - LET'S CREATE YOURS TOGETHER!
        </div>
        <div className='flex sm:hidden text-white justify-between items-center h-14 px-3' style={{ backgroundColor: selectedItem ? selectedItem?.headerBackground : "black" }}>
          <div className='flex items-center'>
            <button  data-testid="drop-down" onClick={() => setDropdownOpen(!isDropdownOpen)}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
          {!isSearchBarVisible ? (
            <Link to={"/"} >
              <div className='text-xl italic font-normal'>
                <p>Swiftly Styled</p>
              </div>
            </Link>
          ) : (
            <div className='border relative flex justify-center items-center rounded-full bg-white text-black w-11/12 h-10 mx-3'>
              <div className='w-full flex h-8 items-center pl-3'>
                <input
                  type="text"
                  placeholder='Search for AI-powered inspiration...'
                  className='outline-none w-full h-full px-3 text-xs md:text-sm'
                  id='searchInput'
                  ref={mobileInputRef}
                />
              </div>
              <div className='flex items-center gap-2 md:gap-2.5 px-3 text-gray-600'>
                <div>|</div>
                <i data-testid="microphone-icon" className="fas fa-microphone"></i>
                <i className="far fa-image"></i>
                <i  className="fas fa-search"></i>
              </div>
            </div>
          )}

          <div className='flex items-center'>
            <button  data-testid="searchVisible" onClick={() => setSearchBarVisible(!isSearchBarVisible)}>
              {isSearchBarVisible ? <i className="fa-solid fa-xmark"></i> : <i className="fas fa-search"></i>}
            </button>
            <button className='ml-4'>
              <i className="far fa-user"></i>
            </button>
          </div>
        </div>
        {isDropdownOpen && (
          <div className='bg-gray-200 text-gray-600 font-semibold p-4 sm:hidden' onClick={() => {
            handleCollection(true);
            setDropdownOpen(false);
          }}>
            Collections
          </div>
        )}

        <div className='sm:flex justify-around hidden items-center md:px-16 h-14' style={{ backgroundColor: selectedItem ? selectedItem?.headerBackground : "black" }}>
          <Link to={"/"} >
            <div className='text-white italic font-normal text-lg lg:text-2xl'>
              Swiftly Styled
            </div>
          </Link>
          <div className='border relative flex justify-center items-center rounded-full bg-white md:w-3/6 h-10'>
            <div className='w-full flex h-full items-center pl-3'>
              <input
                type="text"
                placeholder='Search for AI-powered inspiration...'
                className='outline-none w-full h-8 px-3 text-xs md:text-sm'
                id='searchInput'
                ref={desktopinputRef}
              />
            </div>
            <div className='flex items-center gap-2 md:gap-2.5 px-3 text-gray-600'>
              <div>|</div>
              <i className="fas fa-microphone"></i>
              <i className="far fa-image"></i>
              <i className="fas fa-search" data-testid="search" onClick={handleClick}></i>
            </div>
          </div>
          <div className='text-white font-bold text-xs'  data-testid="collection" onClick={handleCollection}>
            COLLECTIONS
          </div>
          <div className='text-white'>
            <i className="far fa-user"></i>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Header;
