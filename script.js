window.addEventListener('load', () => {
  console.log('Start!');
  getData();
})

let dataAPI = null;

async function getData() {
  dataLoad = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo').then(res => {
    return res.json();
  });

  dataAPI = dataLoad.results.map(data => {
    return {
      name: data.name.first + ' ' + data.name.last,
      picture: data.picture.thumbnail,
      age: data.dob.age,
      gender: data.gender
    }
  });
  console.log(dataAPI);
}