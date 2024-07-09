import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { cardItems } from '../constants/home';
import { collection } from '../constants/collectionpage';
import qrCode from "../images/qrcode.webp";
import { useSelectedItem } from './SelectedItemContext';
import { ReactComponent as OpenInNewTabIcon } from "../images/opennewtab.svg";
const CollectionPage = () => {
  const { setSelectedItem } = useSelectedItem();
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const { text } = useParams();
  const selectedItem = cardItems.find((item) => item.text[0] == text);
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedItem(selectedItem);
  }, []);
  return (
    <>
      <div style={{ backgroundColor: selectedItem ? selectedItem.bannerbackground : "" }} >
        <div className='mx-0 sm:mx-auto container'>
          {selectedItem && (
            <div style={{ fontFamily: selectedItem.fontFamily }}>
              <h3 className='text-center text-base md:text-2xl py-5' style={{ color: selectedItem.headerBackground || "black" }}>{selectedItem.text}</h3>
            </div>
          )}
          <div className='flex items-center justify-between max-w-xs sm:max-w-3xl md:max-w-4xl w-full mx-auto'>
            <div className='gap-2 flex items-center'>
              {selectedItem && (
                <div
                  style={{ backgroundColor: selectedItem.backgroundColor }}
                  className='flex items-center justify-center rounded-full w-20 h-20 sm:h-24 sm:w-24 md:h-28 md:w-28'
                >
                  <img
                    src={selectedItem.icon}
                    alt={selectedItem.alt}
                    className='opacity-30 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16'
                  />
                </div>
              )}
              <div className='w-4/6 sm:w-5/6 flex flex-col mb-2 gap-2'>
                <div className='text-xs sm:text-lg uppercase font-medium'>
                  {collection.collection_name}
                </div>
                <div className='text-xs sm:text-sm text-ellipsis line-clamp-2 md:line-clamp-3'>
                  {collection.description}
                </div>
              </div>
            </div>
            <div className='w-96 ml-2 sm:w-52 relative'>
              <img
                src={qrCode}
                alt='collection'
                className='w-full h-full object-contain'
                loading='lazy'
              />
            </div>
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-3 gap-2.5 md:gap-4 py-2 justify-center items-center max-w-80 sm:max-w-4xl xl:max-w-4xl mx-auto'>
            <div className='col-span-2 sm:col-span-2 sm:row-span-2 flex-grow'>
              <img
                className='object-cover rounded-xl sm:h-[423px] sm:w-[425px] md:h-[528px] md:w-[528px] lg:h-[592px] lg:w-[592px]'
                alt='coverimg'
                src={collection.cover_image}
              />
            </div>
            {collection?.product_lists.map((el) => (
              <div
                key={el.id}
                id="product_card"
                className='relative collection_card rounded-xl overflow-hidden'
                data-testid="collection"
                onMouseOver={() => setHoveredItemId(el.id)}
                onMouseLeave={() => setHoveredItemId(null)}
                style={
                  hoveredItemId === el.id
                    ? { '--hover-bg-color': selectedItem.headerBackground }
                    : {}
                }
              >
                <div className='border rounded-xl'>
                  <img
                    src={el.image}
                    alt="collection_image"
                    data-testid="colletionImage"
                    className='object-cover w-60 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72'
                  />
                </div>
                <div
                  className='flex absolute top-0 overflow-hidden px-4 h-16 w-full product_card_head'
                  title={collection.collection_name}
                >
                  <div
                    className={`inline-block text-ellipsis whitespace-nowrap w-64 text-white font-bold pt-2 overflow-hidden m-0 cursor-pointer z-10 sm:z-1 
                        ${hoveredItemId === el.id ? 'hovered' : ''}
                        `
                    }
                  >
                    {collection.collection_name}
                  </div>
                </div>
                <div className='flex justify-center items-center text-center absolute text-white text-lg top-0 bottom-0 h-overflow-hidden px-4 mx-auto w-full z-10'>
                  {hoveredItemId === el.id && (
                    <div className=''>
                      <div className='flex justify-center items-center'>
                        <div className='font-bold text-xl capitalize '>buy now</div>
                        <OpenInNewTabIcon className='text-white ml-1 text-xs w-5 h-5 z-10 ' />
                      </div>
                      <div className='text-sm'>From amazonfashion</div>
                    </div>
                  )}
                </div>
                <div
                  className='flex justify-between items-center absolute bottom-0 overflow-hidden p-4 h-16 w-full product_card_footer pt-7'
                  style={{
                    display: hoveredItemId === el.id && 'flex',
                  }}
                >
                  {hoveredItemId === el.id ? (
                    <div className='flex justify-center'>
                      <button
                        className='border uppercase text-white text-xs font-bold px-7 py-2 mx-9 rounded-xl z-10'
                      >
                        add to Collection
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className='whitespace-nowrap w-64 text-white font-bold'>₹{el.price}</p>
                      <p className='whitespace-nowrap text-white font-bold'>{el.offer}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CollectionPage;

