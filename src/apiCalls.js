export const getUrls = () => {
  return fetch("http://localhost:3001/api/v1/urls").then((response) =>
    response.json()
  );
};

export const postUrls = async (res) => {
  const response = await fetch("http://localhost:3001/api/v1/urls", {
    method: "POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(res)
  });
  return await response.json();
};

export const deleteUrl = async (res) => {
  const response = await fetch(`http://localhost:3001/api/v1/urls/${res}`, {
    method: "DELETE",
  });
  return response
};
