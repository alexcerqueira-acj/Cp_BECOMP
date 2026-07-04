// ------------------
// ARRAY DE PRODUTOS
// ------------------
const produtos = [
  { nome: "Charmander", categoria: "fogo", preco: 20.99, imagem: "Fotos/charmander.png" },
  { nome: "Squirtle", categoria: "água", preco: 12.99, imagem: "Fotos/squirtle.png" },
  { nome: "Bulbassauro", categoria: "planta", preco: 9.99, imagem: "Fotos/bulbassauro.png" },
  { nome: "Piplup", categoria: "água", preco: 37.99, imagem: "Fotos/piplup.png" },
  { nome: "Pikachu", categoria: "elétrico", preco: 29.99, imagem: "Fotos/pikachu.png" },
  { nome: "Eevee", categoria: "normal", preco: 13.99, imagem: "Fotos/eevee.png" },
  { nome: "Arceus", categoria: "lendário", preco: 82.0, imagem: "Fotos/arceus.png" },
  { nome: "Infernape", categoria: "fogo", preco: 27.99, imagem: "Fotos/infernape.png" },
  { nome: "Mewtwo", categoria: "lendário", preco: 77.99, imagem: "Fotos/mewtwo.png" },
  { nome: "Gengar", categoria: "fantasma", preco: 67.99, imagem: "Fotos/gengar.png" },
  { nome: "Lugia", categoria: "lendário", preco: 83.99, imagem: "Fotos/lugia.png" },
  { nome: "Ho-Oh", categoria: "lendário", preco: 78.99, imagem: "Fotos/ho-oh.png" },
];

// --------------------
// RENDERIZAÇÃO DA GRADE
// ---------------------
function renderizarProdutos(lista) {
  const grid = document.getElementById("produtosGrid");
  grid.innerHTML = "";

  if (lista.length === 0) {
    grid.innerHTML = `<p class="produtos-vazio">Nenhum produto encontrado.</p>`;
    return;
  }

  lista.forEach((produto) => {
    const card = document.createElement("div");
    card.className = "produto-card";

    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" onerror="this.src='https://via.placeholder.com/220x150?text=Carta'">
      <h3>${produto.nome}</h3>
      <p class="categoria">${produto.categoria}</p>
      <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
    `;

    grid.appendChild(card);
  });
}

// ---------------------------
// SISTEMA DE BUSCA
// ---------------------------
function filtrarProdutos() {
  const termo = document.getElementById("buscaInput").value.toLowerCase().trim();

  if (termo === "") {
    renderizarProdutos(produtos);
    return;
  }

  const filtrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().startsWith(termo)
  );

  renderizarProdutos(filtrados);
}

document.getElementById("botaoBuscar").addEventListener("click", filtrarProdutos);

document.getElementById("buscaInput").addEventListener("keypress", (evento) => {
  if (evento.key === "Enter") {
    filtrarProdutos();
  }
});

// BUSCA:
document.getElementById("buscaInput").addEventListener("input", filtrarProdutos);

// -------------------------
// SLIDER DE FOTOS
// ------------------------
let slideAtual = 0;
let intervaloSlider = null;

function inicializarSlider() {
  const track = document.getElementById("sliderTrack");
  const dotsContainer = document.getElementById("sliderDots");

  // Slide p/ cada produto:
  track.innerHTML = produtos
    .map(
      (produto) => `
      <div class="slide">
        <img src="${produto.imagem}" alt="${produto.nome}" onerror="this.src='https://via.placeholder.com/260x280?text=Carta'">
        <h3>${produto.nome}</h3>
        <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
      </div>
    `
    )
    .join("");

  // Navegação(Bolinha)
  dotsContainer.innerHTML = produtos
    .map((_, indice) => `<button class="slider-dot" data-indice="${indice}"></button>`)
    .join("");

  document.querySelectorAll(".slider-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      irParaSlide(Number(dot.dataset.indice));
      reiniciarAutoplay();
    });
  });

  document.getElementById("sliderPrev").addEventListener("click", () => {
    irParaSlide(slideAtual - 1);
    reiniciarAutoplay();
  });

  document.getElementById("sliderNext").addEventListener("click", () => {
    irParaSlide(slideAtual + 1);
    reiniciarAutoplay();
  });

  irParaSlide(0);
  iniciarAutoplay();
}

function irParaSlide(indice) {
  const total = produtos.length;
  slideAtual = (indice + total) % total; // garante que nunca fique negativo ou passe do total

  const track = document.getElementById("sliderTrack");
  track.style.transform = `translateX(-${slideAtual * 100}%)`;

  document.querySelectorAll(".slider-dot").forEach((dot, indice) => {
    dot.classList.toggle("ativo", indice === slideAtual);
  });
}

function iniciarAutoplay() {
  intervaloSlider = setInterval(() => {
    irParaSlide(slideAtual + 1);
  }, 4000);
}

function reiniciarAutoplay() {
  clearInterval(intervaloSlider);
  iniciarAutoplay();
}

// --------------
// INICIALIZAÇÃO
// --------------
renderizarProdutos(produtos);
inicializarSlider();
