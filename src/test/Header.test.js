import { fireEvent, render, screen } from "@testing-library/react";
import { SelectedItemProvider } from "../components/SelectedItemContext";
import Header from "../components/Header";
import { BrowserRouter } from "react-router-dom";

test("testing", () => {
  render(
    <BrowserRouter>
      <SelectedItemProvider>
        <Header />
      </SelectedItemProvider>
    </BrowserRouter>
  )
  const mainTitle = screen.getByText("EVERY OUTFIT HAS A LOVE STORY - LET'S CREATE YOURS TOGETHER!")
  expect(mainTitle).toBeInTheDocument();
  const label = screen.getByText(/Collections/i);
  expect(label).toBeInTheDocument();
  const logo = screen.getAllByText(/Swiftly Styled/i)
  expect(logo.length).toBe(2);
  const input = screen.getByRole('textbox')
  expect(input).toBeInTheDocument();
  const searchInput = screen.getByPlaceholderText('Search for AI-powered inspiration...');
  expect(searchInput).toBeInTheDocument();
  const search = screen.getByTestId('search');
  const handleClickMock = jest.fn();
  search.onclick = handleClickMock;
  fireEvent.click(search);
  expect(handleClickMock).toHaveBeenCalled();
  const collection = screen.getByTestId('collection');
  const handleCollectionMock = jest.fn();
  collection.onclick = handleCollectionMock;
  fireEvent.click(collection);
  expect(handleCollectionMock).toHaveBeenCalled();
  const dropDown = screen.getByTestId('drop-down');
  const setDropdownOpenMock = jest.fn();
  dropDown.onclick = setDropdownOpenMock;
  fireEvent.click(dropDown);
  expect(setDropdownOpenMock).toHaveBeenCalled();
  const searchVisible = screen.getByTestId('searchVisible');
  const setSearchBarVisibleMock = jest.fn();
  searchVisible.onclick = setSearchBarVisibleMock;
  fireEvent.click(searchVisible);
  expect(setSearchBarVisibleMock).toHaveBeenCalled();
})
test('snapshot', () => {
  const { asFragment } = render(
    <BrowserRouter>
    <SelectedItemProvider>
      <Header />
    </SelectedItemProvider>
  </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});