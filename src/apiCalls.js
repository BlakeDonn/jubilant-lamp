export const getUrls = () => {
  return fetch("http://localhost:3001/api/v1/urls").then((response) =>
    response.json()
  );
};

export const postUrls = async () => {
  const response = await fetch("https://fe-cors-proxy.herokuapp.com", {
    method: "POST",
    headers: {
      "Target-URL": "https://randomfox.ca/floof",
    },
  });
  return await response.json();
};
