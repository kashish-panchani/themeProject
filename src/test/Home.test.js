import { fireEvent, render, screen } from "@testing-library/react";
import { SelectedItemProvider } from "../components/SelectedItemContext";
import { BrowserRouter } from "react-router-dom";
import Home from "../components/Home";

test("home page testing", () => {
  render(
    <SelectedItemProvider>
      <BrowserRouter >
        <Home />
      </BrowserRouter>
    </SelectedItemProvider>
  )

  const secondTitle = screen.getByText('Swiftly Style')
  expect(secondTitle).toBeInTheDocument();
  const thirdTitle = screen.getByText('Blank Space')
  expect(thirdTitle).toBeInTheDocument();
  const exploreButton = screen.getByText('explore collections')
  expect(exploreButton).toBeInTheDocument();
  const searchButton = screen.getByText('search outfits')
  expect(searchButton).toBeInTheDocument();
  const thought = screen.getByText('KARMA IS YOUR FLAWLESS ATTIRE.')
  expect(thought).toBeInTheDocument();
  const collection = screen.getByText('Collections from the Eras!')
  expect(collection).toBeInTheDocument();
  // const collection2 = screen.getByText('Browse through our Eras Tour inspired collections,')
  // expect(collection2).toBeInTheDocument();
  const Featured = screen.getByText('Featured Collections')
  expect(Featured).toBeInTheDocument();
  const Featured2 = screen.getByText('Check out the most popular collections on our website right now!')
  expect(Featured2).toBeInTheDocument();
  const pElement = screen.getByText(/perfect outfits/i);
  expect(pElement).toBeInTheDocument();
  const footer = screen.getByText(/THIS SITE IS OPERATED BY/i);
  expect(footer).toBeInTheDocument();
  const footer1 = screen.getByText(/ALSO STRUGGLING TO FIND OUTFITS FOR THE ERAS TOUR/i);
  expect(footer1).toBeInTheDocument();
  const footer2 = screen.getByText(/WE WOULD LIKE TO CLARIFY THAT/i);
  expect(footer2).toBeInTheDocument();
  const footer3 = screen.getByText(/ALL IMAGES FEATURED ON THIS WEBSITE ARE USED FOR ILLUSTRATIVE PURPOSES ONLY/i);
  expect(footer3).toBeInTheDocument();
  const footer4 = screen.getByText(/This website features links to products from our affiliate partners/i);
  expect(footer4).toBeInTheDocument();
  const footer5 = screen.getByText('PRIVACY');
  expect(footer5).toBeInTheDocument();
  const footer6 = screen.getByText(/2024 SwiftlyStyled. All Rights Reserved./i);
  expect(footer6).toBeInTheDocument();
  const footer7 = screen.getByText('TERMS');
  expect(footer7).toBeInTheDocument();
  const prevButton = screen.getByTestId('prevbtn');
  const nextButton = screen.getByTestId('nextbtn');
  const handlePrevBtnMock = jest.fn();
  const handleNextBtnMock = jest.fn();
  prevButton.onclick = handlePrevBtnMock;
  nextButton.onclick = handleNextBtnMock;
  fireEvent.click(prevButton);
  fireEvent.click(nextButton);
  expect(handlePrevBtnMock).toHaveBeenCalled();
  expect(handleNextBtnMock).toHaveBeenCalled();
})
test('snapshot', () => {
  const { asFragment } = render(
    <SelectedItemProvider>
      <BrowserRouter >
        <Home />
      </BrowserRouter>
    </SelectedItemProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
