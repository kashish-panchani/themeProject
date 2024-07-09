// collection.test.js
import React, { cloneElement } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CollectionPage from '../components/CollectionPage';  // Adjust the import path as necessary
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import { SelectedItemProvider } from '../components/SelectedItemContext';
import { collection } from '../constants/collectionpage';

// This will use the mock file in __mocks__/collectionpage.js
jest.mock('../constants/collectionpage.js', () => ({
    collection: {
        collection_name: 'Honoring Yoga Day',
        description: 'Join us in celebrating International Yoga Day and honor the ancient practice that brings harmony and balance to our lives. At Samskara Home, we believe in the power of yoga to transform both body and mind, and we’re excited to offer you special deals on our exclusive range of yoga essentials.',
        cover_image: "https://cdn.unthink.ai/img/unthink_ai/Honoring%20Yoga%20Day_tarlngq.webp",
        product_lists: [
            {
                id: 1,
                image: "https://cdn.shopify.com/s/files/1/0596/3772/7364/files/e-gift_card.png?v=1693556957",
                price: '100',
                offer: '10% off',
            },
            {
                id: 2,
                price: 1000,
                offer: "40%",
                image: "https://cdn.shopify.com/s/files/1/0596/3772/7364/products/SamskaraTempleIncenseStick_Packof5.jpg?v=1675420675",
            },
            {
                id: 3,
                price: 380,
                offer: "90%",
                image: "https://cdn.shopify.com/s/files/1/0596/3772/7364/files/OudWarmingOil.jpg?v=1693979500",
            },
            {
                id: 4,
                price: 380,
                offer: "20%",
                image: "https://cdn.shopify.com/s/files/1/0596/3772/7364/files/VetiverWarmingOil1.jpg?v=1693976652",
            },
            {
                id: 5,
                price: 380,
                offer: "30%",
                image: "https://cdn.shopify.com/s/files/1/0596/3772/7364/files/TempleWarmingOil.jpg?v=1693977657",
            },
        ],
    },
}));
describe('CollectionPage', () => {
    test('renders collection page with mock data', () => {
        render(
            <BrowserRouter>
                <SelectedItemProvider>
                    <CollectionPage />
                </SelectedItemProvider>
            </BrowserRouter>

        );
        const coverImage = screen.getByAltText('coverimg');
        expect(coverImage).toHaveAttribute('src', collection.cover_image);

    });
    test('snapshot', () => {
        const { asFragment } = render(
            <BrowserRouter>
                <SelectedItemProvider>
                    <CollectionPage />
                </SelectedItemProvider>
            </BrowserRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });

});
