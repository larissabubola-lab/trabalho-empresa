let categoria_atual="todos"
let quantidades=[0,0,0,0,0,0,0,0,0,0,0,0,0]

function mostrar_aviso(texto){
    let aviso=document.getElementById("aviso")
    aviso.textContent=texto
    aviso.classList.add("visivel")
    clearTimeout(aviso.temporizador)
    aviso.temporizador=setTimeout(function(){
        aviso.classList.remove("visivel")
    },3500)
}

function mostrar_produtos(){
    let texto=document.getElementById("busca").value.toLowerCase().trim()
    let achados=0

    document.querySelectorAll(".produto").forEach(function(card){
        let nome=card.querySelector("h3").textContent.toLowerCase()
        let favorito=card.querySelector(".favorito").classList.contains("ativo")
        let na_categoria=categoria_atual=="todos" || card.dataset.categoria==categoria_atual || (categoria_atual=="favoritos" && favorito)

        if(na_categoria && nome.includes(texto)){
            card.style.display="flex"
            achados++
        }else{
            card.style.display="none"
        }
    })

    document.getElementById("vazio_produtos").style.display="none"
    document.getElementById("vazio_favoritos").style.display="none"

    if(achados==0){
        if(categoria_atual=="favoritos"){
            document.getElementById("vazio_favoritos").style.display="block"
        }else{
            document.getElementById("vazio_produtos").style.display="block"
        }
    }

    if(categoria_atual=="favoritos"){
        document.querySelector("#produtos h2").textContent="Favoritos"
    }else{
        document.querySelector("#produtos h2").textContent="Produtos"
    }

    document.getElementById("contagem").textContent=achados+" produto(s) encontrado(s)"
}

function filtrar(categoria,botao){
    categoria_atual=categoria
    document.querySelectorAll("#botoes button").forEach(function(b){
        b.classList.remove("ativo")
    })
    botao.classList.add("ativo")
    mostrar_produtos()
}

function ver_favoritos(){
    categoria_atual="favoritos"
    document.querySelectorAll("#botoes button").forEach(function(b){
        b.classList.remove("ativo")
    })
    mostrar_produtos()
}

function favoritar(botao){
    let favoritou=botao.classList.toggle("ativo")
    let icone=botao.querySelector("i")
    icone.classList.toggle("bi-suit-heart")
    icone.classList.toggle("bi-suit-heart-fill")

    if(favoritou){
        mostrar_aviso("Adicionado aos favoritos")
    }else{
        mostrar_aviso("Removido dos favoritos")
    }

    mostrar_produtos()
}

function adicionar(id){
    quantidades[id]++
    desenhar_carrinho()
    mostrar_aviso("Produto adicionado ao carrinho")
}

function alterar_qtd(id,mudanca){
    quantidades[id]+=mudanca
    desenhar_carrinho()
}

function desenhar_carrinho(){
    let total=0
    let itens=0

    for(let id=1;id<=12;id++){
        let item=document.getElementById("item"+id)

        if(quantidades[id]>0){
            item.style.display="flex"
            document.getElementById("qtd"+id).textContent=quantidades[id]
            total+=item.dataset.preco*quantidades[id]
            itens++
        }else{
            item.style.display="none"
        }
    }

    if(itens==0){
        document.getElementById("vazio_carrinho").style.display="block"
    }else{
        document.getElementById("vazio_carrinho").style.display="none"
    }

    document.getElementById("total").textContent="R$ "+total.toFixed(2).replace(".",",")
}

function abrir_carrinho(){
    document.getElementById("carrinho").classList.add("aberto")
}

function fechar_carrinho(){
    document.getElementById("carrinho").classList.remove("aberto")
}

function finalizar(){
    let vazio=true
    quantidades.forEach(function(q){
        if(q>0){
            vazio=false
        }
    })

    if(vazio){
        mostrar_aviso("Seu carrinho está vazio")
        return
    }

    fechar_carrinho()
    abrir_modal("compra")
}

function concluir(){
    quantidades=[0,0,0,0,0,0,0,0,0,0,0,0,0]
    desenhar_carrinho()
    fechar_modal()
    mostrar_aviso("Pedido simulado concluído")
}

function abrir_modal(nome){
    document.querySelectorAll(".conteudo").forEach(function(c){
        c.style.display="none"
    })
    document.getElementById("m_"+nome).style.display="block"
    document.getElementById("fundo").classList.add("aberto")
}

function fechar_modal(){
    document.getElementById("fundo").classList.remove("aberto")
}

function abrir_conta(){
    document.getElementById("form_conta").reset()
    document.getElementById("msg_cadastro").textContent=""
    abrir_modal("conta")
}

function enviar_cadastro(evento){
    evento.preventDefault()
    let nome=document.getElementById("cad_nome").value.trim()
    let email=document.getElementById("cad_email").value.trim()
    let senha=document.getElementById("cad_senha").value
    let mensagem=document.getElementById("msg_cadastro")

    if(nome.length<3){
        mensagem.textContent="Informe seu nome completo."
        return
    }

    if(!email.includes("@") || !email.includes(".")){
        mensagem.textContent="Informe um e-mail válido."
        return
    }

    if(senha.length<8){
        mensagem.textContent="A senha precisa ter pelo menos 8 caracteres."
        return
    }

    if(!document.getElementById("cad_consentimento").checked){
        mensagem.textContent="É necessário consentir com o tratamento de dados para criar a conta."
        return
    }

    abrir_modal("conta_criada")
}

function salvar_consentimento(desempenho,marketing){
    document.getElementById("banner").classList.remove("visivel")
    fechar_modal()
    mostrar_aviso("Suas preferências de privacidade foram salvas")
}

function abrir_cookies(){
    document.getElementById("form_cookies").reset()
    abrir_modal("cookies")
}

function salvar_personalizado(){
    salvar_consentimento(
        document.getElementById("ck_desempenho").checked,
        document.getElementById("ck_marketing").checked
    )
}

function solicitar_direito(){
    mostrar_aviso("Solicitação registrada (simulação). Protocolo: LGPD-"+Date.now())
}

document.getElementById("fundo").addEventListener("click",function(evento){
    if(evento.target==this){
        fechar_modal()
    }
})

document.addEventListener("keydown",function(evento){
    if(evento.key=="Escape"){
        fechar_modal()
        fechar_carrinho()
    }
})

mostrar_produtos()
desenhar_carrinho()

document.getElementById("banner").classList.add("visivel")