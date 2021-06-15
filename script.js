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
      age: data.dob.age - 1, //Colocando idade com -1 para bater com print da apostila antiga e confirmar teste.
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
    function renderItens(panels, item) {
      let ul = panels.querySelector('ul');
      ul.innerHTML = '';

      for (let i = 0; i < item.length; i++) {
        ul.innerHTML += `<li>
          <img
            src="${item[i].picture}"
            alt="Avatar"
          />${item[i].name}, ${item[i].age} anos
        </li>`
      }
    }

    let countUsers = 0; //Numero de usuários.
    let countMales = 0; //Sexo masculino.
    let countFemales = 0; //Sexo feminino.
    let sumAges = 0; //Soma das idades.
    let avgAges = 0; //Média das idades.

    for (let i = 0; i < arrayData.length; i++) {
      countUsers++; //Conta usuários
      sumAges += arrayData[i].age; //Soma as idades

      if (arrayData[i].gender === 'male') { //Conta sexos
        countMales++;
      } else {
        countFemales++;
      }

    }
    avgAges = sumAges / countUsers; //Média das idades

    // console.log('countUsers:' + countUsers);
    // console.log('countMales:' + countMales);
    // console.log('countFemales:' + countFemales);
    // console.log('sumAges:' + sumAges);
    // console.log('avgAges:' + avgAges);

    let panels = document.querySelector('main');

    let pCountUsers = panels.querySelector('.title');
    pCountUsers.textContent = countUsers + ' usuário(s) encontrado(s)';

    let pCountMales = panels.querySelector('.males');
    pCountMales.textContent = 'Sexo masculino: ' + countMales;

    let pCountFemales = panels.querySelector('.females');
    pCountFemales.textContent = 'Sexo feminino: ' + countFemales;

    let pSumAges = panels.querySelector('.sumAges');
    pSumAges.textContent = 'Soma das idades: ' + sumAges;

    let pAvgAges = panels.querySelector('.avgAges');
    pAvgAges.textContent = 'Média das idades: ' + avgAges.toFixed(2);

    renderItens(panels, arrayData);
  }

  let inputSearch = document.querySelector('.inputSearch').value.toLowerCase();
  filteredSearch(inputSearch);
  statistics(filteredData);
}


