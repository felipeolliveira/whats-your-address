const form = document.forms[0];
const btnSearch = form.button;
const inputCEP = form.cep;
const cepBox = document.querySelector('.cep-box');
let divAdress = document.querySelector('.address');
let resultCEP;


function createTitle() {
  const h2 = document.createElement('h2');
  h2.innerText = 'Endereço Completo';
  divAdress.appendChild(h2);
}

function resetAdress() {
  divAdress.innerHTML = '';
}

function errorMessage() {
  divAdress.innerHTML = '<span>Endereço não encontrado</span>'
}

function fecthToJson(r) {
  return r.json();
}

function showResultToUser(r) {
    resultCEP = r;
    resetAdress();
    printResult();
}

function showMessageErroToUser() {
  resetAdress();
  errorMessage()
}

function disabledButtonSearch() {
  btnSearch.setAttribute('disabled', '')
}

function enabledButtonSearch() {
  btnSearch.removeAttribute('disabled', '')
}


form.addEventListener('input', handleInput);


function handleInput() {
  const isDisabled = !btnSearch.hasAttribute('disable');
  const inputTrue = inputCEP.value.length === 8;

  
  if(isDisabled && inputTrue) {
    enabledButtonSearch()
    form.addEventListener('click', handleClick);
  } else {
    disabledButtonSearch();
    form.removeEventListener('click', handleClick);
  }
}

function handleClick(e) {
  if (e.target === btnSearch) {
    e.preventDefault();
    searchViaCEP();
  }
}

function searchViaCEP() {
  const cep = inputCEP.value;
  
  if(cep) {
    fetch('https://viacep.com.br/ws/' + cep + '/json/')

    .then(fecthToJson)
    .then(showResultToUser)
    .catch(showMessageErroToUser)
  }

  disabledButtonSearch();
};

function printResult() {
  
    createTitle();
    
    if (resultCEP['erro']) {
      errorMessage()
    } 
    else if (resultCEP) {
      const infoCEP = Object.keys(resultCEP);
      
      infoCEP.forEach(key => {
        const divInfo = document.createElement('div');
        const titulo = document.createElement('span');
        const texto = document.createElement('p')
        const value = resultCEP[key];
  
        divInfo.classList.add('card-info')
  
        if (value) {
          titulo.innerText = key + ':';
          texto.innerText = value
  
          divInfo.appendChild(titulo);
          divInfo.appendChild(texto);
          divAdress.appendChild(divInfo);
        }
      });
      
      divAdress.classList.add('active');
    }

}
