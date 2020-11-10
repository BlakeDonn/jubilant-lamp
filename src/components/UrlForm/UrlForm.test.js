import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import UrlForm from "./UrlForm";
import { postUrls } from "../../apiCalls.js";
jest.mock("../../apiCalls.js");

describe("UrlContainer", () => {
  it("Should render with title, shorten inputs, and shorten please button ", () => {
    render(<UrlForm />);
    expect(screen.getByPlaceholderText("Title...")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("URL to Shorten...")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Shorten Please!" })
    ).toBeInTheDocument();
  });

  it("Should capture user inputs when typing in form", () => {
    render(<UrlForm />);
    userEvent.type(screen.getByPlaceholderText("Title..."), "TestTitle");
    userEvent.type(screen.getByPlaceholderText("URL to Shorten..."), "TestURL");
    expect(screen.getByPlaceholderText("Title...")).toHaveValue("TestTitle");
    expect(screen.getByPlaceholderText("URL to Shorten...")).toHaveValue(
      "TestURL"
    );
  });

  it("Should update DOM on successful post", async () => {
    const mockUpdateFormView = jest.fn();
    postUrls.mockResolvedValue({
      id: 14,
      long_url: "testURL",
      short_url: "http://localhost:3001/useshorturl/14",
      title: "testTitle",
    });
    render(<UrlForm updateFormView={mockUpdateFormView} />);
    userEvent.type(screen.getByPlaceholderText("Title..."), "TestTitle");
    userEvent.type(screen.getByPlaceholderText("URL to Shorten..."), "TestURL");
    userEvent.click(screen.getByRole("button", { name: "Shorten Please!" }));
    await waitFor(() => expect(mockUpdateFormView).toHaveBeenCalledTimes(1));
    expect(mockUpdateFormView).toHaveBeenCalledTimes(1);
  });
});
