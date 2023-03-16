import React from "react";
import {
  render,
  screen,
  fireEvent,
  queryByAttribute,
  act,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import UserRegistrationForm from "src/components/UserRegistrationForm";

const getById = queryByAttribute.bind(null, "id");

const setup = () => {
  const utils = render(<UserRegistrationForm />);
  const firstName = getById(utils.container, "firstName");
  const email = getById(utils.container, "email");
  const contact = getById(utils.container, "contact");
  const department = getById(utils.container, "department");
  const designation = getById(utils.container, "designation");
  const experience = getById(utils.container, "experience");
  const submit = getById(utils.container, "submit");
  const cancel = getById(utils.container, "cancel");

  return {
    firstName,
    email,
    contact,
    department,
    designation,
    experience,
    submit,
    cancel,
    ...utils,
  };
};

let testName = "UserRegistration boundary";

describe("boundary", () => {
  test(testName + " firstName is required", async () => {
    const { firstName } = setup();
    act(() => {
      fireEvent.blur(firstName);
    });
    await waitFor(async () => {
      expect(await screen.findByText(/First Name is required/i)).toBeTruthy();
    });
  });

  test(testName + " firstName is Valid", async () => {
    const { firstName } = setup();
    act(() => {
      fireEvent.blur(firstName);
      fireEvent.change(firstName, { target: { value: "temp name" } });
    });
    await waitFor(async () => {
      const nameError = screen.queryByText(/First Name is required/i);
      expect(nameError).not.toBeNull();
    });
  });
});

describe("boundary", () => {
  test(testName + " Invalid Email", async () => {
    const { email } = setup();
    act(() => {
      fireEvent.blur(email);
    });
    await waitFor(async () => {
      expect(await screen.findByText(/Invalid Email/i)).toBeTruthy();
    });
  });

  test(testName + " Email is invalid", async () => {
    const { email } = setup();
    act(() => {
      fireEvent.blur(email);
      fireEvent.change(email, { target: { value: "abc" } });
    });
    await waitFor(async () => {
      expect(await screen.findByText(/Invalid Email/i)).toBeTruthy();
    });
  });

  test(testName + " Email is Valid", async () => {
    const { email } = setup();
    act(() => {
      fireEvent.blur(email);
      fireEvent.change(email, { target: { value: "abc@def.com" } });
    });
    await waitFor(async () => {
      const emailError = screen.queryByText(/Invalid Email/i);
      expect(emailError).toBeNull();
    });
  });
});

describe("boundary", () => {
  test(testName + " department is required", async () => {
    const { department } = setup();
    act(() => {
      fireEvent.blur(department);
    });
    await waitFor(async () => {
      expect(await screen.findByText(/Department is required/i)).toBeTruthy();
    });
  });

  test(testName + " department is Valid", async () => {
    const { department } = setup();
    act(() => {
      fireEvent.blur(department);
      fireEvent.change(department, { target: { value: "temp department" } });
    });
    await waitFor(async () => {
      const departmentError = screen.queryByText(/Department is required./i);
      expect(departmentError).toBeNull();
    });
  });
});

describe("boundary", () => {
  test(testName + " designation is required", async () => {
    const { designation } = setup();
    act(() => {
      fireEvent.blur(designation);
    });
    await waitFor(async () => {
      expect(await screen.findByText(/Designation is required/i)).toBeTruthy();
    });
  });

  test(testName + " designation is Valid", async () => {
    const { designation } = setup();
    act(() => {
      fireEvent.blur(designation);
      fireEvent.change(designation, { target: { value: "temp designation" } });
    });
    await waitFor(async () => {
      const designationError = screen.queryByText(/Designation is required./i);
      expect(designationError).toBeNull();
    });
  });
});

describe("boundary", () => {
  test(testName + " experience is required", async () => {
    const { experience } = setup();
    act(() => {
      fireEvent.blur(experience);
    });
    await waitFor(async () => {
      expect(await screen.findByText(/Experience is required/i)).toBeTruthy();
    });
  });

  test(testName + " experience is Valid", async () => {
    const { experience } = setup();
    act(() => {
      fireEvent.blur(experience);
      fireEvent.change(experience, { target: { value: "1" } });
    });
    await waitFor(async () => {
      const experienceError = screen.queryByText(/Experience is required./i);
      expect(experienceError).toBeNull();
    });
  });
});

describe("boundary", () => {
  test(testName + " submit button disabled on invalid data", async () => {
    const utils = render(<UserRegistrationForm />);
    expect(getById(utils.container, "submit")).toBeInTheDocument();
    expect(getById(utils.container, "submit")).toBeDisabled();
  });

  test(testName + " submit button enabled on valued text", async () => {
    const utils = render(<UserRegistrationForm />);
    const { firstName, email, contact } = setup();
    await waitFor(() => {
      fireEvent.blur(firstName);
      fireEvent.change(firstName, { target: { value: "Tom Jerry" } });
      fireEvent.blur(email);
      fireEvent.change(email, { target: { value: "abc@mail.com" } });
      fireEvent.blur(contact);
      fireEvent.change(contact, { target: { value: "1234567890" } });
      expect(getById(utils.container, "submit")).toBeInTheDocument();
      expect(
        getById(utils.container, "submit").getAttribute("disabled")
      ).not.toBeTruthy();
    });
  });
});