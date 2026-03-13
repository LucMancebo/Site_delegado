/* -------------------------------------- /
          select cidade e estado
 -------------------------------------- */

const cidadeSelect = document.getElementById('cidade-select');
const bairroSelect = document.getElementById('bairro-select');
const bairroGroup = document.getElementById('bairro-group');

let cidadesData = {};

function resetBairros() {
  bairroSelect.innerHTML = '<option value="">Selecione primeiro a cidade</option>';
  bairroSelect.disabled = true;
  bairroGroup.classList.add('hidden');
}

function preencherCidades() {
  cidadeSelect.innerHTML = '<option value="">Selecione sua cidade</option>';

  Object.keys(cidadesData).forEach((cidade) => {
    const option = document.createElement('option');
    option.value = cidade;
    option.textContent = cidade;
    cidadeSelect.appendChild(option);
  });
}

function obterBairrosDaCidade(cidade) {
  const cidadeInfo = cidadesData[cidade];
  if (!cidadeInfo) return [];

  if (Array.isArray(cidadeInfo)) return cidadeInfo;

  if (cidadeInfo.zonas && typeof cidadeInfo.zonas === 'object') {
    return Object.values(cidadeInfo.zonas).flat();
  }

  return [];
}

function preencherBairros(bairros) {
  bairroSelect.innerHTML = '<option value="">Selecione seu bairro</option>';

  bairros.forEach((bairro) => {
    const option = document.createElement('option');
    option.value = bairro;
    option.textContent = bairro;
    bairroSelect.appendChild(option);
  });

  bairroSelect.disabled = false;
  bairroGroup.classList.remove('hidden');
}

fetch('cidades-rj.json')
  .then((response) => response.json())
  .then((data) => {
    cidadesData = data.cidades || {};
    preencherCidades();
    resetBairros();
  })
  .catch((error) => {
    console.error('Erro ao carregar JSON:', error);
    resetBairros();
  });

cidadeSelect.addEventListener('change', () => {
  const cidade = cidadeSelect.value;

  if (!cidade) {
    resetBairros();
    return;
  }

  const bairros = obterBairrosDaCidade(cidade);

  if (!bairros.length) {
    resetBairros();
    return;
  }

  preencherBairros(bairros);
});