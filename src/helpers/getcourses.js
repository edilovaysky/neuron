export const getCourses = () => {
  fetch(`http://localhost:8888/courses`, {
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
      return alert(data.course[0]);
    });
};
