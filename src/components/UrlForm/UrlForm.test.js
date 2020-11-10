import { render, screen, waitFor } from "@testing-library/react";
import React from 'react'
import "@testing-library/jest-dom";
import  UrlForm  from "./UrlForm";


describe("UrlContainer", () =>{
  it ("Should render with title, shorten inputs, and shorten please button ", () =>{
    render(<UrlForm />)
    expect(screen.getByPlaceholderText("Title...")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("URL to Shorten...")).toBeInTheDocument()
    expect(screen.getByRole("button",{name: "Shorten Please!"})).toBeInTheDocument()
  })

})
