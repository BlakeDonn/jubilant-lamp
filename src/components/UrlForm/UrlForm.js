import React, { Component } from "react";
import { postUrls } from "../../apiCalls";

class UrlForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      title: "",
      urlToShorten: "",
      error: ""
    };
  }

  handleNameChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if(this.state.title === '' || this.state.urlToShorten === ''){
      return this.setState({error: "Please fill out both fields"})
    }
    const response = await postUrls({
      long_url: this.state.urlToShorten,
      title: this.state.title,
    });
    if (response.long_url.length && response.short_url.length && response.title.length){
    this.props.updateFormView(response)
    return this.clearInputs();
    }
  };

  clearInputs = () => {
    this.setState({ title: "", urlToShorten: "" });
  };

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Title..."
          name="title"
          value={this.state.title}
          onChange={(e) => this.handleNameChange(e)}
        />

        <input
          type="text"
          placeholder="URL to Shorten..."
          name="urlToShorten"
          value={this.state.urlToShorten}
          onChange={(e) => this.handleNameChange(e)}
        />

        <button onClick={(e) => this.handleSubmit(e)}>Shorten Please!</button>
        <p>{this.state.error}</p>
      </form>
    );
  }
}

export default UrlForm;
