import { shallow } from "enzyme";
import React from "react";
import {
  render,
  screen,
  fireEvent,
  queryByAttribute,
  act,
  waitFor,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  getAllCells,
  getAllRows,
  getByRowgroupType,
  queryByRowgroupType,
  getAllRowsByRowgroupType,
} from "testing-library-table-queries";
import UserDetails from "src/components/UserDetails";

const fields = ["S.No.", "Name", "Email", "", ""];
const testData = [
  {
    id: 1,
    name: "Ravi",
    email: "ravi@gmail.com",
    contact: "",
  },
  {
    id: 2,
    name: "Ravi",
    email: "ravi@gmail.com",
    contact: "1234567890",
  },
];

const getById = queryByAttribute.bind(null, "id");

const setup = () => {
  const { container } = render(<UserDetails />);
  const rows = getAllRows(container);
  const cells = getAllCells(container);
  const header = getByRowgroupType(container, "thead");
  const tBodyRow = getAllRowsByRowgroupType(container, "tbody");
  const toggleButton = getById(container, "toggle-btn");
  return {
    rows,
    cells,
    header,
    tBodyRow,
    container,
    toggleButton,
  };
};

let testName = "UserDetails boundary";

describe("boundary", () => {
  test(testName + " should mount UserDetails without crashing", () => {
    const component = shallow(<UserDetails />);
    expect(component.getElements()).toMatchSnapshot();
    component.unmount();
  });
});

describe("boundary", () => {
  const { rows, cells, header, tBodyRow, container, toggleButton } = setup();

  test(testName + " should be rendered", async () => {
    render(<UserDetails />);
    expect(await screen.findByText(/Users List/i)).toBeTruthy();
  });

  test(testName + " should be rendered with data", async () => {
    expect(await screen.queryByText(/No Data Found/i)).toBeFalsy();
    expect(rows).toHaveLength(testData.length + 1);
    expect(tBodyRow).toHaveLength(testData.length);
    // expect(cells).toHaveLength((fields.length * (testData.length + 1)))
    expect(header).toBeTruthy();
  });

  test(testName + " should be rendered without data", async () => {
    const { container } = render(<UserDetails setDummyData={false} />);
    const rows = getAllRows(container);
    const cells = getAllCells(container);
    const header = getByRowgroupType(container, "thead");
    const tBodyRow = getAllRowsByRowgroupType(container, "tbody");
    expect(await screen.queryByText(/No Data Found/i)).toBeTruthy();
    expect(rows).toHaveLength(2);
    expect(tBodyRow).toHaveLength(1);
    expect(header).toBeTruthy();
  });

  test(testName + " should have header", async () => {
    expect(header).toBeTruthy();
  });

  test(
    testName + " should have a toggle button for registration form",
    async () => {
      expect(toggleButton).toBeTruthy();
    }
  );

  test(
    testName + " should have a clickable toggle button for registration form",
    async () => {
      render(<UserDetails />);
      const button = screen.getByRole("button");
      fireEvent.click(button);
      expect(screen.getByText("User Registration")).toBeInTheDocument();
    }
  );

  test(
    testName + " should hide registration form on double clicking button",
    async () => {
      render(<UserDetails />);
      const button = screen.getByRole("button");
      fireEvent.click(button);
      expect(screen.getByText("User Registration")).toBeInTheDocument();
      fireEvent.click(button);
      expect(screen.queryByText("User Registration")).not.toBeInTheDocument();
    }
  );
});
