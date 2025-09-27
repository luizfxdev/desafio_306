// Elementos do DOM
const frequencyInput = document.getElementById('frequency-input');
const decodeBtn = document.getElementById('decode-btn');
const returnBtn = document.getElementById('return-btn');
const resultSection = document.getElementById('result-section');
const resultContent = document.getElementById('result-content');

// Event listeners para os botões
decodeBtn.addEventListener('click', handleDecode);
returnBtn.addEventListener('click', handleReturn);

// Função para verificar se um número é primo
function isPrime(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;

  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

// Função principal para decodificar a mensagem
function decodeMessage(frequencies) {
  const uniquePrimes = new Set(); // Set para armazenar produtos primos únicos
  const calculations = [];
  const allProducts = []; // Para debug - todos os produtos

  // Processar todos os pares possíveis de frequências
  for (let i = 0; i < frequencies.length; i++) {
    for (let j = i + 1; j < frequencies.length; j++) {
      const freq1 = frequencies[i];
      const freq2 = frequencies[j];
      const product = freq1 * freq2;
      const isProductPrime = isPrime(product);

      // Armazenar todos os produtos para debug
      allProducts.push(product);

      // Adicionar ao Set se o produto for primo
      if (isProductPrime) {
        uniquePrimes.add(product);
      }

      // Armazenar o cálculo para exibição
      calculations.push({
        pair: `${freq1} × ${freq2}`,
        product: product,
        isPrime: isProductPrime,
        positions: `[${i}] × [${j}]`
      });
    }
  }

  // Calcular energia total somando apenas produtos primos únicos
  const totalEnergy = Array.from(uniquePrimes).reduce((sum, prime) => sum + prime, 0);

  // Debug: mostrar todos os produtos primos encontrados
  const allPrimeProducts = calculations.filter(calc => calc.isPrime).map(calc => calc.product);

  console.log('Array original:', frequencies);
  console.log(
    'Todos os produtos:',
    allProducts.sort((a, b) => a - b)
  );
  console.log(
    'Todos os produtos primos (com repetições):',
    allPrimeProducts.sort((a, b) => a - b)
  );
  console.log(
    'Produtos primos únicos:',
    Array.from(uniquePrimes).sort((a, b) => a - b)
  );
  console.log('Soma dos únicos:', totalEnergy);

  return {
    totalEnergy,
    calculations,
    uniquePrimes: Array.from(uniquePrimes).sort((a, b) => a - b),
    allPrimeProducts: allPrimeProducts.sort((a, b) => a - b)
  };
}

// Função para processar a entrada e validar
function parseInput(input) {
  // Remover espaços e dividir por vírgula
  const numbers = input.split(',').map(item => {
    const num = parseInt(item.trim());
    if (isNaN(num)) {
      throw new Error(`Valor inválido: "${item.trim()}"`);
    }
    return num;
  });

  if (numbers.length === 0) {
    throw new Error('Por favor, insira pelo menos um número.');
  }

  if (numbers.length < 2) {
    throw new Error('É necessário pelo menos 2 números para formar pares.');
  }

  return numbers;
}

// Função para exibir os resultados com cálculo detalhado
function displayResults(result, originalArray) {
  let html = `
        <div class="calculation-step">
            <strong>Array de entrada:</strong> [${originalArray.join(', ')}]
        </div>
        <div class="calculation-step">
            <strong>Total de pares possíveis:</strong> ${result.calculations.length}
        </div>
    `;

  // Mostrar apenas alguns pares para não sobrecarregar a tela
  const maxPairsToShow = 20;
  const showAll = result.calculations.length <= maxPairsToShow;

  html += `<div class="calculation-step"><strong>Cálculo dos pares ${
    !showAll ? '(primeiros ' + maxPairsToShow + ')' : ''
  }:</strong></div>`;

  const pairsToShow = showAll ? result.calculations : result.calculations.slice(0, maxPairsToShow);

  pairsToShow.forEach((calc, index) => {
    const pairNumber = index + 1;
    const primeClass = calc.isPrime ? 'prime-highlight' : 'non-prime';
    const primeText = calc.isPrime ? 'É PRIMO ✓' : 'Não é primo';

    html += `
            <div class="calculation-step">
                <strong>Par ${pairNumber}:</strong> ${calc.positions} = ${calc.pair} = <span class="${primeClass}">${calc.product}</span>
                <br><small>${primeText}</small>
            </div>
        `;
  });

  if (!showAll) {
    html += `<div class="calculation-step"><small>... e mais ${
      result.calculations.length - maxPairsToShow
    } pares</small></div>`;
  }

  html += `
        <div class="calculation-step">
            <strong>Todos os produtos primos encontrados:</strong> 
            [${result.allPrimeProducts.join(', ')}]
            <br><small>Total de produtos primos: ${result.allPrimeProducts.length}</small>
        </div>
        <div class="calculation-step">
            <strong>Produtos primos únicos (sem repetições):</strong> [${result.uniquePrimes.join(', ')}]
            <br><small>Soma dos únicos: ${result.uniquePrimes.join(' + ')} = ${result.totalEnergy}</small>
        </div>
    `;

  html += `
        <div class="final-result">
            🚨 ENERGIA CÓSMICA TOTAL: ${result.totalEnergy}
            <br><small style="font-size: 0.9rem; opacity: 0.8;">(Soma dos produtos primos únicos)</small>
        </div>
    `;

  resultContent.innerHTML = html;
  resultSection.classList.add('show');
}

// Função para tratar a decodificação
function handleDecode() {
  try {
    const input = frequencyInput.value.trim();

    if (!input) {
      alert('Por favor, insira uma sequência de frequências.');
      return;
    }

    // Validar e processar a entrada
    const frequencies = parseInput(input);

    // Decodificar a mensagem
    const result = decodeMessage(frequencies);

    // Exibir resultados
    displayResults(result, frequencies);
  } catch (error) {
    alert(`Erro: ${error.message}`);
  }
}

// Função para retornar ao estado inicial
function handleReturn() {
  // Limpar resultados
  resultSection.classList.remove('show');
  resultContent.innerHTML = '';

  // Limpar o input e focar nele
  frequencyInput.value = '';
  frequencyInput.focus();
}

// Permitir execução com Enter no input
frequencyInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    handleDecode();
  }
});

// Inicialização: focar no input
document.addEventListener('DOMContentLoaded', function () {
  frequencyInput.focus();
});
