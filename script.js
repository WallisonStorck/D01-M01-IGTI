window.addEventListener('load', () => {
  console.log('Start!');
  getData();


  let inputSearch = document.querySelector('.inputSearch');
  inputSearch.addEventListener('keyup', search);
})

let dataAPI = null; //Array que guarda os dados da API.
let filteredData = null; //Array que vai receber resultados dos filtros

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
  // console.log(dataAPI);
}

function search() {
  function filteredSearch(name) {
    filteredData = dataAPI.filter(x => {
      return x.name.toLowerCase().includes(name);
    });
    console.log(filteredData);
  };

  function statistics(arrayData) {
    let countUsers = 0; //Numero de usuários.
    let male = 0; //Sexo masculino.
    let female = 0; //Sexo feminino.
    let sumAges = 0; //Soma das idades.
    let avgAges = 0; //Média das idades.

    for (let i = 0; i < arrayData.length; i++) {
      countUsers++; //Conta usuários

      if (arrayData[i].gender === 'male') { //Conta sexos
        male++;
      } else {
        female++;
      }

    }
    console.log('male:' + male);
    console.log('female:' + female);
  }

  let inputSearch = document.querySelector('.inputSearch').value.toLowerCase();
  filteredSearch(inputSearch);
  statistics(filteredData);
}


