import { render, screen, waitFor } from "@testing-library/react";
import React from 'react'
import "@testing-library/jest-dom";
import { UrlContainer } from "./UrlContainer";


beforeEach(() => { 
  const testUrls = [{
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

describe("UrlContainer", () =>{
  it ("Should render headings of urls", () =>{
    render(<UrlContainer />)
    
  })
})
