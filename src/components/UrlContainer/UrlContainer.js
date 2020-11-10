import React from 'react';
import './UrlContainer.css';
import {deleteUrl} from '../../apiCalls'

const UrlContainer = props => {
  const urlEls = props.urls.map(url => {
    return (
      <div className="url">
        <h3>{url.title}</h3>
        <a data-testid={`${url.title}-test`} href={url.short_url} target="blank">{url.short_url}</a>
        <p>{url.long_url}</p>
        <button onClick={() => deleteUrl(url.id)}>Delete me</button>
      </div>
    )
  });

  return (
    <section>
      { urlEls.length ? urlEls : <p>No urls yet! Find some to shorten!</p> }
    </section>
  )
}

export default UrlContainer;
