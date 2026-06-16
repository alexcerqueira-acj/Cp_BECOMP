// --- 1. LÓGICA DO SLIDER ---
let slideAtual = 0;

function inicializarSlider() {
    const slides = document.getElementById('slides');
    if (!slides) return; 

    setInterval(() => {
        mudarSlide(1);
    }, 5000);
}

function mudarSlide(direcao) {
    const slides = document.getElementById('slides');
    if (!slides) return;

    const totalSlides = slides.children.length;
    slideAtual += direcao;

    if (slideAtual < 0) slideAtual = totalSlides - 1;
    if (slideAtual >= totalSlides) slideAtual = 0;

    slides.style.transform = `translateX(-${slideAtual * 100}%)`;
}

// --- 2. DADOS E BUSCA DE PRODUTOS ---

const produtos = [
    { nome: "Chinelo Nuvem Bordô", preco: "59,90", tag: "nuvem conforto", img: "https://http2.mlstatic.com/D_NQ_NP_835735-MLB76044626118_052024-O-chinelo-nuvem-dedo-plataforma-trancada-leve-sandalia-33-a-40.webp" },
    { nome: "Chinelo Slide Bege", preco: "45,00", tag: "slide casual", img: "https://projetoinfluencer.vteximg.com.br/arquivos/ids/6954009-640-960/Chinelo-Tropical-Brasil-Bi-Color-Slim-Bege.jpg?v=638792877422100000" },
    { nome: "Chinelo de Dedo Clássico", preco: "25,50", tag: "praia dedo", img: "https://images.tcdn.com.br/img/img_prod/629144/chinelo_havaianas_slim_gloss_bordo_84063_3124_2_38b77669b8c0f60565697e4749d72f9b.png" },
    { nome: "Chinelo Nuvem Bege", preco: "59,90", tag: "nuvem conforto", img: "https://m.media-amazon.com/images/I/31BaKfHOUHL._AC_SY300_.jpg" },
    { nome: "Chinelo Ortopédico", preco: "89,90", tag: "ortopedico saude", img: "https://images.tcdn.com.br/img/img_prod/1420119/chinelo_ortopedico_feminino_ajustavel_e_confortavel_25_5_f97f5a3348dfafd38105d4c4565afc0a.jpeg" },
    { nome: "Sandália Chinelo Couro", preco: "120,00", tag: "couro luxo", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1s4stSQoDlHS6-AdIdonmckbXeuB5v8kTDQ&s" }
];

function renderizarProdutos(lista) {
    const vitrine = document.getElementById('vitrine');
    if (!vitrine) return; 

    vitrine.innerHTML = ''; 

    if (lista.length === 0) {
        vitrine.innerHTML = '<p style="grid-column: 1 / -1; text-align:center;">Nenhum produto encontrado com essa busca.</p>';
        return;
    }

    lista.forEach(produto => {
        // Renderiza a imagem do produto, usando uma imagem padrão caso esteja vazio no objeto
        const srcImagem = produto.img ? produto.img : 'https://via.placeholder.com/300x200.png?text=Sem+Foto';
        
        const card = `
            <div class="card-produto fade-in">
                <img src="${srcImagem}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p class="preco">R$ ${produto.preco}</p>
                <button class="btn-comprar">Comprar</button>
            </div>
        `;
        vitrine.innerHTML += card;
    });
}

function buscarProdutos() {
    const termo = document.getElementById('input-busca').value.toLowerCase();
    
    const produtosFiltrados = produtos.filter(prod => 
        prod.nome.toLowerCase().includes(termo) || 
        prod.tag.toLowerCase().includes(termo)
    );

    renderizarProdutos(produtosFiltrados);
}

// --- 3. LÓGICA DE AUTENTICAÇÃO (LOGIN/REGISTRO) ---
let modoRegistro = false;

function alternarModoAuth() {
    modoRegistro = !modoRegistro;
    const nomeInput = document.getElementById('nome');
    const title = document.getElementById('auth-title');
    const btn = document.getElementById('auth-btn');
    const toggleTexto = document.getElementById('toggle-texto');
    const msg = document.getElementById('mensagem');

    msg.className = "msg"; 

    if (modoRegistro) {
        nomeInput.style.display = 'block';
        nomeInput.required = true;
        title.innerText = 'Crie sua Conta';
        btn.innerText = 'Registrar';
        toggleTexto.innerHTML = 'Já tem uma conta? <span onclick="alternarModoAuth()">Faça Login</span>';
    } else {
        nomeInput.style.display = 'none';
        nomeInput.required = false;
        title.innerText = 'Acesse sua Conta';
        btn.innerText = 'Entrar';
        toggleTexto.innerHTML = 'Não tem uma conta? <span onclick="alternarModoAuth()">Registre-se</span>';
    }
}

function lidarComAuth(evento) {
    evento.preventDefault(); 
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const msg = document.getElementById('mensagem');

    if (modoRegistro) {
        const usuariosDB = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        const existe = usuariosDB.find(u => u.email === email);
        if (existe) {
            msg.textContent = "Este e-mail já está cadastrado!";
            msg.className = "msg error";
            return;
        }

        usuariosDB.push({ nome, email, senha });
        localStorage.setItem('usuarios', JSON.stringify(usuariosDB));
        
        msg.textContent = "Cadastro realizado com sucesso! Faça login.";
        msg.className = "msg success";
        document.getElementById('auth-form').reset();
        setTimeout(alternarModoAuth, 2000); 

    } else {
        const usuariosDB = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuarioValido = usuariosDB.find(u => u.email === email && u.senha === senha);

        if (usuarioValido) {
            msg.textContent = `Bem-vindo de volta, ${usuarioValido.nome}!`;
            msg.className = "msg success";
            localStorage.setItem('usuarioLogado', usuarioValido.nome);
            setTimeout(() => {
                window.location.href = 'index.html'; 
            }, 1500);
        } else {
            msg.textContent = "E-mail ou senha incorretos!";
            msg.className = "msg error";
        }
    }
}

function checarLogin() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    const navLogin = document.getElementById('nav-login');
    
    if (usuarioLogado && navLogin) {
        navLogin.innerText = `Olá, ${usuarioLogado.split(' ')[0]}`;
        navLogin.href = "#"; 
        navLogin.addEventListener('click', () => {
            if(confirm('Deseja sair da conta?')) {
                localStorage.removeItem('usuarioLogado');
                location.reload();
            }
        });
    }
}

// --- 4. INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    inicializarSlider();
    renderizarProdutos(produtos); 
    checarLogin();

    const authForm = document.getElementById('auth-form');
    if (authForm) {
        authForm.addEventListener('submit', lidarComAuth);
    }
});