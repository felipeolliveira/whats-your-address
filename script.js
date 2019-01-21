const form = document.forms[0];
const btnSearch = form.button;
const inputCEP = form.cep;
const cepBox = document.querySelector('.cep-box');
let divAdress = document.querySelector('.endereco');
let resultCEP;


form.addEventListener('input', handleInput);


function handleInput() {
  const isDisabled = !btnSearch.hasAttribute('disable');
  const inputTrue = inputCEP.value.length === 8;

  
  if(isDisabled && inputTrue) {
    btnSearch.removeAttribute('disabled');
    form.addEventListener('click', handleClick);
  } else {
    btnSearch.setAttribute('disabled', '');
    form.removeEventListener('click', handleClick);
  }
}

function handleClick(e) {
  if (e.target === btnSearch) {
    e.preventDefault();
    searchViaCEP();
    setTimeout(() => {
      resetAdress();
      printResult();
    }, 500);
  }
}

function resetAdress() {
  divAdress.innerHTML = '';
}

function errorMessage() {
  divAdress.innerHTML = '<span>Endereço não encontrado</span>'
}

function searchViaCEP() {
  const cep = inputCEP.value;
  
  if(cep) {
    const responseCEP = fetch('https://viacep.com.br/ws/' + cep + '/json/');

    console.log(responseCEP);

    responseCEP
    .then(r => r.json())
    .then(r => {
      setTimeout(() => {
        return resultCEP = r;
      }, 50)
    })
    .catch(() => {
      setTimeout(() => {
        resetAdress();
        errorMessage()
      }, 800) 
    })
  }

  btnSearch.setAttribute('disabled', '');
};

function createTitle() {
  const h2 = document.createElement('h2');
  h2.innerText = 'Endereço Completo';
  divAdress.appendChild(h2);
}

function printResult() {
  createTitle();

  if(resultCEP) {
    
    if (resultCEP['erro']) {
      errorMessage();
    } else {
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
      
      divAdress.classList.add('ativo');
    }
  }
}
