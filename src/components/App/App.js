import React, { Component } from "react";
import "./App.css";
import { getUrls, deleteUrl } from "../../apiCalls";
import UrlContainer from "../UrlContainer/UrlContainer";
import UrlForm from "../UrlForm/UrlForm";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
    };
  }

  componentDidMount() {
    getUrls().then((data) => this.setState({ urls: data.urls }));
  }

  updateFormView = (url) => {
    this.setState({ urls: [...this.state.urls, url] });
  };

  deleteUrl = async (url) => {
    let response = await deleteUrl(url);
    if (response.ok) {
      let updatedUrls = await getUrls();
      return this.setState({ urls: updatedUrls.urls });
    }
    alert(`No url with ${url.id} found in server`)
  };

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm updateFormView={this.updateFormView} />
        </header>

        <UrlContainer deleteUrl={this.deleteUrl} urls={this.state.urls} />
      </main>
    );
  }
}

export default App;
