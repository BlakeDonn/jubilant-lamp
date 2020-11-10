import { render, screen, waitFor } from "@testing-library/react";
import React from 'react'
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import  UrlContainer  from "./UrlContainer";


describe("UrlContainer", () =>{
let testUrls;
beforeEach(() => { 
   testUrls = [{
    id: 1,
    long_url: "https://longUrl",
    short_url: "https://shortUrl",
    title: "testTitle"
  },
  {
    id: 2,
    long_url: "https://longUrl2",
    short_url: "https://shortUrl2",
    title: "testTitle2"
  },
  {
    id: 3,
    long_url: "https://longUrl3",
    short_url: "https://shortUrl3",
    title: "testTitle3"
  }]
});
  it ("Should render headings of urls", () =>{
    render(<UrlContainer urls={testUrls}/>)
    expect(screen.getByText("testTitle")).toBeInTheDocument()
    expect(screen.getByText("testTitle2")).toBeInTheDocument()
    expect(screen.getByText("testTitle3")).toBeInTheDocument()
  })

  it ("Should render anchor tags of shortened url", () =>{
    render(<UrlContainer urls={testUrls}/>)
    expect(screen.getByTestId("testTitle-test").href).toBe('https://shorturl/')
    expect(screen.getByTestId("testTitle2-test").href).toBe('https://shorturl2/')
    expect(screen.getByTestId("testTitle3-test").href).toBe('https://shorturl3/')
  })

  it ("Should render with delete buttons for each url", () =>{
    render(<UrlContainer urls={testUrls}/>)
    expect(screen.getByTestId("testTitle-button")).toBeInTheDocument()
    expect(screen.getByTestId("testTitle2-button")).toBeInTheDocument()
    expect(screen.getByTestId("testTitle3-button")).toBeInTheDocument()
  })

  it ("User should be able to click delete button", () =>{
    const mockDeleteUrl = jest.fn()
    render(<UrlContainer urls={testUrls} deleteUrl={mockDeleteUrl}/>)
    userEvent.click(screen.getByTestId("testTitle-button", {name: "Delete Me"}));
    userEvent.click(screen.getByTestId("testTitle2-button", {name: "Delete Me"}));
    userEvent.click(screen.getByTestId("testTitle3-button", {name: "Delete Me"}));
    expect(mockDeleteUrl).toHaveBeenCalledTimes(3)
  })
})
