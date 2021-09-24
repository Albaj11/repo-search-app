import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import SearchBox from "../searchBox/SearchBox";

afterEach(() => {
  cleanup();
});

test("should render searchBox component", () => {
  render(<SearchBox />);
  const searchBoxElement = screen.getAllByTestId("searchBox-1");
});

test("match snapshot", () => {
  const tree = renderer.create(<SearchBox />).toJSON();
  expect(tree).toMatchSnapshot();
});
