import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import "@testing-library/jest-dom";
import { getUrls } from "../../apiCalls.js";
import { App } from "./App";
jest.mock("../../apiCalls.js");

describe("App", () => {
  beforeEach(() => {
    getUrls.mockResolvedValue([
      {
        id: 1,
        long_url:
          "longurl1",
        short_url: "shorturl1",
        title: "title1",
      },
      {
       id: 2,
        long_url:
          "longurl2",
        short_url: "shorturl2",
        title: "title2",
      },
      {
       id: 3,
        long_url:
          "longurl3",
        short_url: "shorturl3",
        title: "title3",
      },
    ]);
  });
  it("Should render with header", () => {
    render(<App />);
    expect(screen.getByText("URL Shortener")).toBeInTheDocument();
  });

  it("Should render any urls stored in server", () => {
    render(<App />);
    screen.debug()
  });
});
