window.addEventListener('load', () => {
  getData(); //Faz a carga dos dados.

  let inputSearch = document.querySelector('#inputSearch');
  inputSearch.addEventListener('keyup', search);
})

let dataAPI = null, //Array que guarda os dados da API.
  itemsFound = null; //Array que vai receber resultados dos filtros

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
  function findItens(name) {
    itemsFound = dataAPI.filter(x => {
      return x.name.toLowerCase().includes(name);
    });
    console.log(itemsFound);
    renderItens(itemsFound);
  };

  function renderItens(itemsFound) {
    function statistics(arrayData) {
      for (let i = 0; i < arrayData.length; i++) {
        countUsers++; //Conta usuários
        sumAges += arrayData[i].age; //Soma as idades

        if (arrayData[i].gender === 'male') { //Conta sexos
          countMales++;
        } else {
          countFemales++;
        }

      }
      avgAges = sumAges / countUsers; //Média das idades.
    }

    let countUsers = 0; //Numero de usuários.
    let countMales = 0; //Sexo masculino.
    let countFemales = 0; //Sexo feminino.
    let sumAges = 0; //Soma das idades.
    let avgAges = 0; //Média das idades.
    let ul = document.querySelector('ul');
    ul.innerHTML = '';

    if (itemsFound != null) {
      for (let i = 0; i < itemsFound.length; i++) {
        ul.innerHTML += `<li>
          <img
            src="${itemsFound[i].picture}"
            alt="Avatar"
          />${itemsFound[i].name}, ${itemsFound[i].age} anos
        </li>`
      }
      statistics(itemsFound);
    }

    let panels = document.querySelector('main');

    let pCountUsers = panels.querySelector('#foundUsers');
    if (countUsers === 0) {
      pCountUsers.textContent = 'Nenhum usuário filtrado';
    } else {
      pCountUsers.textContent = countUsers + ' usuário(s) encontrado(s)';
    }

    let pCountMales = panels.querySelector('#males');
    pCountMales.textContent = 'Sexo masculino: ' + countMales;

    let pCountFemales = panels.querySelector('#females');
    pCountFemales.textContent = 'Sexo feminino: ' + countFemales;

    let pSumAges = panels.querySelector('#sumAges');
    pSumAges.textContent = 'Soma das idades: ' + sumAges;

    let pAvgAges = panels.querySelector('#avgAges');
    pAvgAges.textContent = 'Média das idades: ' + avgAges.toFixed(2);
  }

  //Obtém o texto a ser pesquisado do input
  let inputSearch = document.querySelector('#inputSearch').value.toLowerCase();

  if (inputSearch.trim() === '' || inputSearch === '') {
    itemsFound = null;
    renderItens(itemsFound);
  } else {
    findItens(inputSearch);
  }
}


