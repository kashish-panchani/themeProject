import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cardItems, theme } from '../constants/home'
import { useSelectedItem } from './SelectedItemContext';
import { handleCollection } from '../utils/utils';

const Home = () => {
    const { setSelectedItem, desktopinputRef, mobileInputRef, setSearchBarVisible, isSearchBarVisible } = useSelectedItem();
    const [totalItems, setTotalItems] = useState([]);
    useEffect(() => {
        setSelectedItem(null);
    }, [setSelectedItem]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const styles = {
        card: {
            margin: "2px",
            padding: "0",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
        },
        s: {
            gridRowEnd: "span 10",
        },
        l: {
            gridRowEnd: "span 15"
        }
    }

    useEffect(() => {
        setTotalItems(() => {
            let array = cardItems?.map((item, i) => i + 1);
            return (array.slice(-2).concat(array.slice(0, -2)))
        });
    }, [cardItems]);

    useEffect(() => {
        if (isSearchBarVisible) {
            if (window.innerWidth >= 640 && desktopinputRef) {
                desktopinputRef.current.focus();
            } else if (mobileInputRef.current) {
                mobileInputRef.current.focus();
            }
        }
    }, [isSearchBarVisible, desktopinputRef, mobileInputRef]);

    const handleClick = () => {
        setSearchBarVisible(true);
        if (window.innerWidth >= 640 && desktopinputRef) {
            desktopinputRef.current.focus();
        } else if (mobileInputRef.current) {
            mobileInputRef.current.focus();
        }
    };

    const handlePrevBtn = () => {
        setTotalItems((prevItems) => {
            let newItems = [...prevItems];
            newItems.unshift(newItems.pop());
            return newItems;
        });

    };

    const handleNextBtn = () => {
        setTotalItems((prevItems) => {
            let newItems = [...prevItems];
            newItems.push(newItems.shift());
            return newItems;
        });
    };
    return (
        <>
            <div className='overflow-hidden'>
                <div className='uppercase my-6 md:my-10 flex flex-col justify-center items-center text-center italic font-black text-base md:text-5xl text-slate-700 w-full'>
                    <span>perfect outfits<br /> from across all eras</span>
                </div>
                <div className='text-center italic text-base md:text-2xl'>
                    <p className='text-slate-700'>
                        <span className='font-black capitalize'> Swiftly Style </span> your outfit for the <span className='font-black capitalize'>Eras Tour!</span>
                    </p>
                </div>
                <div className='text-center text-sm md:text-lg mt-8 md:mt-14 font-normal text-gray-600'>
                    <p>
                        Got a <span className='italic'>Blank Space </span>in your wardrobe?
                    </p>
                    <p>
                        Discover <span>Enchanted</span>fashion ideas beyond your Wildest Dreams!
                    </p>
                </div>
                <div className='mt-8 flex justify-center items-center font-medium gap-2'>
                    <button
                        className='btn border w-36 py-2 uppercase bg-rose-600 font-bold text-white'
                        onClick={handleCollection}
                    >
                        explore collections
                    </button>
                    <button className='btn border-black border w-36 font-bold uppercase py-2' onClick={handleClick} >
                        search outfits
                    </button>
                </div>
                <div className='mt-8 md:mt-16 text-center text-xs md:text-sm text-gray-600'>
                    <p>KARMA IS YOUR FLAWLESS ATTIRE.</p>
                </div>
                <div className='flex mt-2'>
                    {theme.map((el, index) => (
                        <div key={index} style={{
                            backgroundColor: el.themeColor,
                        }} className='w-full h-7 sm:h-10 lg:h-14'></div>
                    ))}
                </div>
                <div id='collectionID'>
                    <div className='text-slate-800 flex flex-col gap-2 justify-center items-center my-6' >
                        <p className='text-base md:text-4xl flex justify-center items-center italic font-black' >Collections from the Eras!</p>
                        <p className='w-80 md:w-96 text-xs md:text-sm font-normal text-center text-gray-600'>Browse through our Eras Tour inspired collections,<br />featuring fashion from leading ecommerce platforms.
                        </p>
                    </div>
                    <div className='pb-2'>
                        <div
                            style={{
                                gridAutoRows: '14px',
                            }} className='mx-auto grid gap-1 max-w-22 md:max-w-xl grid-cols-2 md:grid-cols-3'>
                            {cardItems.map((el) => (
                                <Link key={el.id} to={`/collection/${el.text[0]}`} style={{
                                    ...styles.card,
                                    ...styles[el.size],
                                    backgroundColor: el.backgroundColor,
                                    height: el.height
                                }}
                                    className='card'
                                >
                                    <img src={el.icon} alt={el.alt} className="image mb-5 absolute flex justify-center items-center opacity-30" />
                                    <div className='text-center'>
                                        {el?.text?.map((e, index) => (
                                            <span key={index} className="overlay-text hidden" style={{ fontFamily: el.fontFamily }}>{e}</span>
                                        ))}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='overflow-hidden'>
                    <div className="w-full py-7 px-11">
                        <div className='text-base md:text-4xl text-center italic font-black'>Featured Collections</div>
                        <div className='text-center pb-10'>Check out the most popular collections on our website right now!</div>
                        <div className="flex justify-center items-center my-0 mx-auto relative h-80" style={{ maxWidth: "1200px" }}>
                            {cardItems.map((item, i) => {
                                const items = [...totalItems].splice(0, 5);
                                return (
                                    <div
                                        key={i}
                                        className={`allItems ${items.includes(i + 1)
                                            ? `allItems_${items.indexOf(i + 1) + 1}`
                                            : ""
                                            }`}
                                    >
                                        <img
                                            className="w-full h-full object-cover rounded-xl"
                                            src={item.sliderImg}
                                            alt={item.alt}
                                            draggable={false}
                                        />
                                    </div>
                                );
                            })}
                            <div
                                data-testid="prevbtn"
                                className='flex justify-center items-center absolute left-16 m-7 ani-left'
                                onClick={handlePrevBtn}
                            >
                                <div className='flex justify-center items-center w-14 h-14 bg-black rounded-full'>
                                    <i class="fa-solid fa-arrow-left text-white"></i>
                                </div>
                            </div>
                            <div
                                data-testid="nextbtn"
                                className='flex justify-center items-center absolute right-16 m-7 ani-left'
                                onClick={handleNextBtn}
                            >
                                <div className='flex justify-center items-center w-14 h-14 bg-black rounded-full'>
                                    <i class="fa-solid fa-arrow-right text-white"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex mt-2'>
                    {theme.map((el, index) => (
                        <div key={index} style={{
                            backgroundColor: el.themeColor,
                        }} className='w-full h-6 sm:h-10 lg:h-14'></div>
                    ))}
                </div>
                <div className='footer_bg text-white flex flex-col gap-3 items-center  justify-center text-[10px] md:text-base py-3'>
                    <p className='font-normal text-center'>THIS SITE IS OPERATED BY<span className='font-bold'>SWIFTIES </span> (WHO <span className='italic'>WERE</span> ALSO STRUGGLING TO FIND OUTFITS FOR THE ERAS TOUR).</p>
                    <p className='text-center'>WE WOULD LIKE TO CLARIFY THAT <span className='font-bold'> WE ARE NOT AFFILIATED</span> WITH TAYLOR SWIFT, TAYLOR NATION, OR THE ERAS TOUR.</p>
                    <p className='text-center'>ALL IMAGES FEATURED ON THIS WEBSITE ARE USED FOR ILLUSTRATIVE PURPOSES ONLY <br /> AND WE DO NOT CLAIM OWNERSHIP OF THEM.</p>
                </div>
                <div className='footer_bg2 text-white flex flex-col gap-3  items-center justify-center text-[10px] md:text-base py-3'>
                    <p className='font-normal text-center'>This website features links to products from our affiliate partners <br /> to provide a means for us to earn commissions, if you choose to make a purchase through our links (at no added cost to you!)</p>
                    <p className='text-center'>We graciously thank you for helping us pay off the loan we had to take to purchase our tickets for the Eras Tour.</p>
                </div>
                <div className='footer_bg3 text-white flex justify-between items-center px-3 md:px-24 py-1 md:py-2 text-[9px] md:text-xs'>
                    <div className='font-bold'>PRIVACY</div>
                    <div className='text-center'>2024 SwiftlyStyled. All Rights Reserved.<br />London,UK</div>
                    <div className='font-bold'>TERMS</div>
                </div>
            </div>
        </>
    );
}

export default Home;
