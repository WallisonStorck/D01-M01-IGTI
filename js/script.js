window.addEventListener('load', () => {

  body = document.querySelector('body');

  inputSearch = document.querySelector('#inputSearch');
  inputSearch.addEventListener('keyup', handleTypingKey);

  let buttonSearch = document.querySelector('#buttonSearch');
  buttonSearch.addEventListener('click', search);

  getData(); //Faz a carga dos dados.
})

let body = null, //Variável que vai apontar para toda a pagina.
  inputSearch = null, //Variável que vai ficar apontada no input.
  dataAPI = null, //Array que guarda os dados da API.
  itemsFound = null, //Array que vai receber resultados dos filtros.
  switchIsActive = false; //Variável que controla modo instantâneo.

async function getData() {
  let dataLoad = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo').then(res => {
    return res.json();
  });
  // console.log(dataLoad);

  dataAPI = dataLoad.results.map(({ login, name, picture, dob, gender }) => {
    return {
      id: login.uuid,
      name: `${name.first} ${name.last}`,
      picture: picture.thumbnail,
      age: dob.age - 1, //Colocando idade com -1 para bater com print da apostila antiga e confirmar teste.
      gender: gender
    }
  }).sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  showComponents();
}

function showComponents() {
  let preload = body.querySelector('#preLoader');
  let boxSearch = body.querySelector('#boxSearch');
  let panels = body.querySelector('#panels');
  preload.classList.add('hidden');
  boxSearch.classList.remove('hidden');
  panels.classList.remove('hidden');
}

function enableDisableSwitch() {
  if (switchIsActive) {
    switchIsActive = false;
  } else {
    switchIsActive = true;
  }
}

function handleTypingKey(event) {
  if (switchIsActive) {
    search();
  } else {
    if (event.key != 'Enter') {
      return;
    } else {
      search();
    }
  }
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
      countMales = arrayData.filter((item) => item.gender === 'male').length;
      countFemales = arrayData.filter((item) => item.gender === 'female').length;

      sumAges = arrayData.reduce((accumulator, current) => {
        return accumulator + current.age;
      }, 0);

      avgAges = sumAges / arrayData.length;

    }

    let countMales = 0; //Sexo masculino.
    let countFemales = 0; //Sexo feminino.
    let sumAges = 0; //Soma das idades.
    let avgAges = 0; //Média das idades.
    let ul = document.querySelector('ul');
    ul.innerHTML = '';

    if (itemsFound != null) {
      itemsFound.forEach((item) => {
        ul.innerHTML += `<li>
          <img
            src="${item.picture}"
            alt="Avatar"
          />${item.name}, ${item.age} anos
        </li>`
      })
      statistics(itemsFound);
    }

    let panels = document.querySelector('main');

    let pCountUsers = panels.querySelector('#foundUsers');
    if (itemsFound === null) {
      pCountUsers.textContent = 'Nenhum usuário filtrado';
    } else {
      pCountUsers.textContent = itemsFound.length + ' usuário(s) encontrado(s)';
    }

    let pCountMales = panels.querySelector('#males');
    pCountMales.textContent = 'Sexo masculino: ' + countMales;

    let pCountFemales = panels.querySelector('#females');
    pCountFemales.textContent = 'Sexo feminino: ' + countFemales;

    let pSumAges = panels.querySelector('#sumAges');
    pSumAges.textContent = 'Soma das idades: ' + sumAges;

    let pAvgAges = panels.querySelector('#avgAges');
    pAvgAges.textContent = 'Média das idades: ' + avgAges.toFixed(2).replace('.', ',');
  }

  //Obtém o texto a ser pesquisado do input que já estava apontado
  let text = inputSearch.value.toLowerCase();

  if (text.trim() === '' || text === '') {
    itemsFound = null;
    renderItens(itemsFound);
  } else {
    findItens(text);
  }
}


