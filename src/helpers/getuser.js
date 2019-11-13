export const getUser = id => {
  const id = props;
  console.log(id);
  fetch(`http://localhost:8888/user/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Wrong credentials');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    });
};
