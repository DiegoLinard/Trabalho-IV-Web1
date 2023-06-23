const nomeArquivo = 'dat.json';

function mudar(event) {
    var armario = event.target; 
    var texto = armario.querySelector('.letra'); 
  
    if (armario.classList.contains("ocupado")) {
      armario.classList.remove("ocupado");
      armario.classList.add("desocupado");
      texto.textContent = "Desocupado";
    } else if (armario.classList.contains("desocupado")) {
      armario.classList.remove("desocupado");
      armario.classList.add("manutencao");
      texto.textContent = "Manutenção";
    } else if (armario.classList.contains("manutencao")) {
      armario.classList.remove("manutencao");
      armario.classList.add("ocupado");
      texto.textContent = "Ocupado";
    }
  }
  
  function mostrarArmarios() {
    function extrairDados() {
        fetch(nomeArquivo)
            .then(Response => Response.json())
            .then(data => {
                const tdsArms = data.armarios;
                for (let i = 0; i < tdsArms.length; i++) {
                    const armarioDiv = document.createElement('div');
                    armarioDiv.setAttribute('class', 'armario');
                    const estado = tdsArms[i].estado;
                    const estadoDiv = document.createElement('div');
                    estadoDiv.setAttribute('class', estado);
                    estadoDiv.addEventListener('click', mudar);
                    const textoDiv = document.createElement('h1');
                    textoDiv.setAttribute('class', 'letra');
                    textoDiv.textContent = estado.charAt(0).toUpperCase() + estado.slice(1);

                    estadoDiv.appendChild(textoDiv);
                    armarioDiv.appendChild(estadoDiv);

                    for (let j = 0; j < 3; j++) {
                        const linhaDiv = document.createElement('div');
                        linhaDiv.setAttribute('class', 'linha');
                        armarioDiv.appendChild(linhaDiv);
                    }

                    const corpoDiv = document.getElementById('corpo');
                    corpoDiv.appendChild(armarioDiv);
                }

            })
            .catch(error => {
                console.error('Erro ao ler o arquivo JSON:', error);
            });
    }

    extrairDados();
}
