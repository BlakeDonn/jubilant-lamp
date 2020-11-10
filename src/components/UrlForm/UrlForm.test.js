import { render, screen, waitFor } from "@testing-library/react";
import React from 'react'
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import  UrlForm  from "./UrlForm";


describe("UrlContainer", () =>{
  it ("Should render with title, shorten inputs, and shorten please button ", () =>{
    render(<UrlForm />)
    expect(screen.getByPlaceholderText("Title...")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("URL to Shorten...")).toBeInTheDocument()
    expect(screen.getByRole("button",{name: "Shorten Please!"})).toBeInTheDocument()
  })

  it ("Should capture user inputs when typing in form", () =>{
    render(<UrlForm />)
    userEvent.type(screen.getByPlaceholderText("Title..."), "TestTitle");
    userEvent.type(screen.getByPlaceholderText("URL to Shorten..."), "TestURL");
    expect(screen.getByPlaceholderText("Title...")).toHaveValue("TestTitle")
    expect(screen.getByPlaceholderText("URL to Shorten...")).toHaveValue("TestURL")
  })

})
