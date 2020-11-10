import { render, screen, waitFor } from "@testing-library/react";
import React from 'react'
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
})
