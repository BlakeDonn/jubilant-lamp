import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import "@testing-library/jest-dom";
import { getUrls, postUrls, deleteUrl } from "../../apiCalls.js";
import { App } from "./App";
jest.mock("../../apiCalls.js");

describe("App", () => {
  beforeEach(() => {
    getUrls.mockResolvedValue({
      urls: [
        {
          id: 1,
          long_url: "longurl1",
          short_url: "shorturl1",
          title: "title1",
        },
        {
          id: 2,
          long_url: "longurl2",
          short_url: "shorturl2",
          title: "title2",
        },
        {
          id: 3,
          long_url: "longurl3",
          short_url: "shorturl3",
          title: "title3",
        },
      ],
    });
  });
  it("Should render with header", () => {
    render(<App />);
    expect(screen.getByText("URL Shortener")).toBeInTheDocument();
  });

  it("Should render any urls stored in server", async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText("title1")).toBeInTheDocument());
    expect(screen.getByText("title1")).toBeInTheDocument();
    expect(screen.getByText("title2")).toBeInTheDocument();
    expect(screen.getByText("title3")).toBeInTheDocument();
  });

  it("User should be able to add new url to server and DOM", async () => {
    postUrls.mockResolvedValue({
      id: 14,
      long_url: "testURL",
      short_url: "http://localhost:3001/useshorturl/14",
      title: "userTestTitle",
    });
    render(<App />);
    await waitFor(() => expect(screen.getByText("title1")).toBeInTheDocument());
    userEvent.type(screen.getByPlaceholderText("Title..."), "TestTitle");
    userEvent.type(screen.getByPlaceholderText("URL to Shorten..."), "TestURL");
    userEvent.click(screen.getByRole("button", { name: "Shorten Please!" }));
    await waitFor(() =>
      expect(screen.getByText("userTestTitle")).toBeInTheDocument()
    );
    expect(screen.getByText("userTestTitle")).toBeInTheDocument();
    expect(
      screen.getByText("http://localhost:3001/useshorturl/14")
    ).toBeInTheDocument();
  });

  it("User should be able to delete a URL and have the dom update accordingly", async () => {
    deleteUrl.mockResolvedValue({
      ok: true,
      redirected: false,
      status: 204,
      statusText: "No Content",
      type: "cors",
      url: "testURl",
    });
    render(<App />);
    await waitFor(() => expect(screen.getByText("title1")).toBeInTheDocument());
    getUrls.mockResolvedValue({
      urls: [
        {
          id: 2,
          long_url: "longurl2",
          short_url: "shorturl2",
          title: "title2",
        },
        {
          id: 3,
          long_url: "longurl3",
          short_url: "shorturl3",
          title: "title3",
        },
      ],
    });
    userEvent.click(screen.getByTestId("title1-button", { name: "Delete me" }));
    await waitFor(
      () => !expect(screen.getByText("title1")).toBeInTheDocument()
    );
  });
});
