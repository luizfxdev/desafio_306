# 🚨 Sinfonia Harmônica Neo-Tóquio

## Sobre o Desafio

Na vastidão urbana iluminada por néons, Shotaro Kaneda acelera sua lendária moto em busca da solução para uma ameaça cósmica que paira sobre Neo-Tóquio. Um comunicado criptografado chega à resistência: uma sequência de tons ressoando pelo universo, cada número representando uma frequência secreta.

O objetivo é decifrar essa sinfonia enigmática composta por pares de frequências. Para cada par no array fornecido, multiplique os dois valores – se o resultado for um número primo, some esse valor ao total de energia. O destino da humanidade depende da sua capacidade de identificar vibrações puras, dignas de energia cósmica, para neutralizar o potencial destrutivo do Akira!

## 🎯 Objetivo

Criar uma função `decodeMessage` que:
1. Recebe um array de números (frequências cósmicas)
2. Calcula o produto de **todos os pares possíveis** de números
3. Identifica quais produtos são números primos
4. Soma apenas os **produtos primos únicos** (sem duplicatas)
5. Retorna a energia total necessária

## 📝 Regras do Algoritmo

- **Pares:** Considerar todas as combinações possíveis de 2 elementos do array
- **Produtos:** Multiplicar cada par de números
- **Números Primos:** Números divisíveis apenas por 1 e por eles mesmos
- **Únicos:** Não somar o mesmo produto primo mais de uma vez
- **Resultado:** Soma total dos produtos primos únicos

## 🔧 Problemas Enfrentados e Soluções

### 1. **Interpretação Incorreta dos "Pares" (❌ → ✅)**

**Problema Initial:**
```javascript
// INCORRETO: Apenas pares adjacentes (0-1, 2-3, 4-5...)
for (let i = 0; i < array.length - 1; i += 2) {
    const product = array[i] * array[i + 1];
}
```

**Solução Implementada:**
```javascript
// CORRETO: Todos os pares possíveis
for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
        const product = array[i] * array[j];
    }
}
```

### 2. **Contagem de Produtos Primos (❌ → ✅)**

**Problema:** Inicialmente somávamos todos os produtos primos, incluindo repetições.

**Solução:** Implementação de `Set` para garantir unicidade:
```javascript
const uniquePrimes = new Set();
if (isPrime(product)) {
    uniquePrimes.add(product); // Set evita duplicatas automaticamente
}
```

### 3. **Saída Incorreta no Exemplo Original (🚨 DESCOBERTA IMPORTANTE)**

**Problema Identificado:**
- O desafio original indicava que a saída para `[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 9]` deveria ser `18`
- Porém, o algoritmo correto retorna `10`

**Análise Detalhada:**

Para o array `[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 9]`:

**Produtos primos únicos encontrados:**
- `2` (de 1×2)
- `3` (de 3×1)  
- `5` (de 1×5)

**Soma correta:** 2 + 3 + 5 = **10** ❌ ~~18~~

**Conclusão:** A saída esperada informada no desafio original estava **incorreta**. O valor correto é **10**, não **18**.

### 4. **Validação com Exemplos Adicionais**

Para confirmar a correção do algoritmo, criamos exemplos de teste:

| Array | Produtos Primos Únicos | Soma | Status |
|-------|----------------------|------|--------|
| `[2, 3, 1, 5]` | `[2, 3, 5]` | **10** | ✅ |
| `[1, 2, 2, 3, 3]` | `[2, 3]` | **5** | ✅ |
| `[1, 7, 2, 11]` | `[2, 7, 11]` | **20** | ✅ |
| `[2, 5, 3, 7, 1]` | `[2, 3, 5, 7]` | **17** | ✅ |

## 🛠️ Funcionalidades Implementadas

### Interface Web
- **Input responsivo** para entrada de arrays
- **Validação robusta** de dados de entrada
- **Resultado detalhado** com cálculo passo a passo
- **Design futurístico** temático Neo-Tóquio/Akira

### Algoritmo
- **Função isPrime()** otimizada para verificação de primalidade
- **Processamento completo** de todos os pares possíveis
- **Set para unicidade** evitando duplicatas automaticamente
- **Debug completo** com logs detalhados

### Responsividade
- **Layout adaptativo** para desktop e mobile
- **Botões empilhados** em telas menores
- **Container com scroll** para resultados extensos
- **Animações CSS** com tema cyberpunk

## 🚀 Como Usar

1. **Abra o arquivo** `index.html` no navegador
2. **Insira um array** no formato: `3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 9`
3. **Clique em DECIFRAR** para processar
4. **Visualize o resultado** com cálculo detalhado
5. **Use RETORNAR** para limpar e inserir novo array

## 📁 Estrutura do Projeto

```
desafio_306/
├── index.html          # Interface principal
├── styles.css          # Estilos visuais e animações
├── script.js           # Lógica do algoritmo
├── assets/
│   └── background.mp4  # Vídeo de fundo (usuário deve adicionar)
└── README.md          # Esta documentação
```

## 🎨 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Animações, responsividade, design moderno
- **JavaScript ES6+** - Algoritmo, manipulação DOM, validações
- **Google Fonts** - Tipografia (Raleway, Orbitron)

## ✅ Status do Projeto

**CONCLUÍDO** - Algoritmo funcionando corretamente com resultado **10** para o array original.

**Nota:** A discrepância com o valor **18** informado no desafio original foi identificada como um erro na especificação, não no algoritmo implementado.

---

*Desenvolvido para o desafio "Sinfonia Harmônica Neo-Tóquio" - Decodificação de frequências cósmicas para salvar a humanidade! 🌟*
