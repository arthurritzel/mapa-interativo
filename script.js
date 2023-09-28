// Inicializa uma variável para armazenar a soma do valor dos lotes selecionados
var soma = 0
const num_lotes_cima = 14;
// Seleciona o elemento com o id "subtotal" e armazena em uma variável
var subtot = document.querySelector("#subtotal")

// Inicializa uma variável para armazenar a soma dos metros de frente dos lotes selecionados
var metros_frente = 0
var metros_lateral = 0
var primeira_linha = 0;
var segunda_linha = 0;
var tamanho_metro1 = 0;
var tamanho_metro2 = 0;
// Define a URL da API de onde os dados serão buscados
const URL = "https://8b6mkftr.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%22quadra7%22%5D%7B%0A++lote%2C%0A++++metros_lateral%2C%0A++++metros_frente%2C%0A++++disponivel%2C%0A++++valor%2C%0A++++%27imagem%27%3A+imagem.asset-%3E+url%0A%7D&perspective=published"

// Função assíncrona para buscar os dados da API
async function quadra7(){
    // Faz a requisição à API
    var dados = await fetch(URL, {
        method: "GET"
    })

    // Converte a resposta para JSON
    var dadosJS = await dados.json()

    // Inicializa uma variável de posição
    let position = 0;

    // Loop que cria elementos HTML com base nos dados da API
    do{
        dadosJS.result.forEach(element => {
            if(position+1 == element.lote){
                // Cria uma div com a classe "l1" e o id igual ao número do lote
                var div = document.createElement("div")
                if(element.lote <= num_lotes_cima){
                    div.className = "l1"
                }else{
                    div.setAttribute("class", "l1 l2")
                }
                div.id = element.lote
                
                // Cria uma imagem e define seu atributo src com a URL da imagem
                var img = document.createElement("img")
                img.setAttribute("src", element.imagem)
                
                // Seleciona o elemento com a classe "img"
                var all = document.querySelector(".img")
                
                // Define a largura da div com base nos metros de frente
                div.style.width = `${element.metros_frente*14}px`
                
                // Adiciona a imagem à div
                div.appendChild(img)
                
                // Adiciona a div ao elemento com a classe "img"
                all.appendChild(div)
                
                position++
            }
        });
    }while(position != (dadosJS.result).length);

    // Função para atualizar o subtotal na página
    function subtotal(){
        subtot.innerHTML = `Subtotal: ${soma.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} <br> metros frente: ${metros_frente} <br> metros lateral ${metros_lateral}`
    }

    // Seleciona todos os elementos com a classe "l1" (as divs criadas anteriormente)
    var lotes = document.querySelectorAll(".l1")

    // Loop para verificar a disponibilidade dos lotes e adicionar eventos de clique
    lotes.forEach(element2 => {
        exist = 0
        for (let j = 0; j < (dadosJS.result).length; j++) {
            if(dadosJS.result[j].disponivel == true && dadosJS.result[j].lote == element2.id){
                exist = 1
            }
        }
        if(exist == 1){
            // Adiciona um evento de clique à div se o lote estiver disponível
            element2.addEventListener("click", ()=>{
                if(element2.style.border == "4px solid rgb(8, 110, 5)"){
                    element2.style.border = "1px solid black"
                    for(let i = 0; i < (dadosJS.result).length; i++){
                        if(element2.id == dadosJS.result[i].lote){
                            // Subtrai o valor e os metros de frente quando desselecionado
                            soma -= parseFloat(dadosJS.result[i].valor)
                           

                            if(element2.className == "l1"){
                                primeira_linha--
                            }else if(element2.className == "l1 l2"){
                                segunda_linha--
                            }
                            
                            if(element2.className == "l1" && primeira_linha == 0){
                                metros_lateral -= tamanho_metro1
                            }else if(element2.className == "l1 l2" && segunda_linha == 0){
                                metros_lateral -= tamanho_metro2
                            }
                            if(primeira_linha == 0 && segunda_linha == 0){
                                metros_lateral = 0;
                            }

                            if(!document.querySelector(`#a${parseInt(element2.id) + 14}[class = "select"`) && element2.id <= 14){
                                metros_frente -= parseFloat(dadosJS.result[i].metros_frente)
                            }else if(document.querySelector(`#a${parseInt(element2.id) + 14}[class = "select"`) && element2.style.width > (document.getElementById(`${parseInt(element2.id) + 14}`)).style.width){
                                
                                for(let k = 0; k < (dadosJS.result).length; k++){
                                    
                                    if(dadosJS.result[k].lote == (parseInt(element2.id) + 14)){
                                       
                                        metros_frente += dadosJS.result[k].metros_frente
                                    }
                                    if(dadosJS.result[k].lote == element2.id){
                                        metros_frente -= dadosJS.result[k].metros_frente
                                        
                                    }
                                }
                            }
                            
                            
                            if(!document.querySelector(`#a${parseInt(element2.id) - 14}[class = "select"`) && element2.id >= 14){
                                metros_frente -= parseFloat(dadosJS.result[i].metros_frente)
                            }else if(document.querySelector(`#a${parseInt(element2.id) - 14}[class = "select"`) && element2.style.width > (document.getElementById(`${parseInt(element2.id) - 14}`)).style.width){
                                
                                for(let k = 0; k < (dadosJS.result).length; k++){
                                    
                                    if(dadosJS.result[k].lote == (parseInt(element2.id) - 14)){
                                       
                                        metros_frente += dadosJS.result[k].metros_frente
                                    }
                                    if(dadosJS.result[k].lote == element2.id){
                                        metros_frente -= dadosJS.result[k].metros_frente
                                        
                                    }
                                }

                               
                            }
                            
                            element2.style.border = "1px solid black"
                            break;
                        }
                    }
                    // Remove o elemento selecionado da lista de escolhas
                    var remo = document.querySelector(`#a${element2.id}[class = 'select`)
                    var esc = document.querySelector(".escolhas")
                    
                    esc.removeChild( remo );
                }else{
                    
                    for(let i = 0; i < 100; i++){
                        if(element2.id == dadosJS.result[i].lote){
                            // Adiciona o valor e os metros de frente quando selecionado
                            soma += parseFloat(dadosJS.result[i].valor)

                            

                            if(element2.className == "l1" && primeira_linha == 0){

                                metros_lateral += parseFloat(dadosJS.result[i].metros_lateral)
                                tamanho_metro1 = dadosJS.result[i].metros_lateral

                            }else if(element2.className == "l1 l2" && segunda_linha == 0){

                                metros_lateral += parseFloat(dadosJS.result[i].metros_lateral)
                                tamanho_metro2 = dadosJS.result[i].metros_lateral

                            }

                            if(element2.className == "l1"){
                                if(dadosJS.result[i].metros_lateral > tamanho_metro1){
                                    metros_lateral -= tamanho_metro1
                                    metros_lateral += dadosJS.result[i].metros_lateral
                                    tamanho_metro1 = dadosJS.result[i].metros_lateral
                                }
                                primeira_linha++
                            }else if(element2.className == "l1 l2"){
                                if(dadosJS.result[i].metros_lateral > tamanho_metro2){
                                    metros_lateral -= tamanho_metro1
                                    metros_lateral += dadosJS.result[i].metros_lateral
                                    tamanho_metro2 = dadosJS.result[i].metros_lateral
                                }
                                segunda_linha++
                            }

                            if(!document.querySelector(`#a${parseInt(element2.id) + 14}[class = "select"`) && element2.id <= 14){
                                metros_frente += parseFloat(dadosJS.result[i].metros_frente)
                                
                            }else if(document.querySelector(`#a${parseInt(element2.id) + 14}[class = "select"`) && element2.style.width > (document.getElementById(`${parseInt(element2.id) + 14}`)).style.width){
                                for(let k = 0; k < (dadosJS.result).length; k++){
                                    
                                    if(dadosJS.result[k].lote == (parseInt(element2.id) + 14)){
                                       
                                        metros_frente -= dadosJS.result[k].metros_frente
                                    }
                                    if(dadosJS.result[k].lote == element2.id){
                                        metros_frente += dadosJS.result[k].metros_frente
                                        
                                    }
                                }
                                
                            }
                            
                            console.log((document.querySelector(`#a${parseInt(element2.id) + 14}[class = "select"`) && element2.style.width > (document.getElementById(`${parseInt(element2.id) + 14}`)).style.width))
                            
                            if(!document.querySelector(`#a${parseInt(element2.id) - 14}[class = "select"`) && element2.id >= 14){
                                    metros_frente += parseFloat(dadosJS.result[i].metros_frente)
                            }else if(document.querySelector(`#a${parseInt(element2.id) - 14}[class = "select"`) && element2.style.width > (document.getElementById(`${parseInt(element2.id) - 14}`)).style.width){
                                
                                for(let k = 0; k < (dadosJS.result).length; k++){
                                    
                                    if(dadosJS.result[k].lote == (parseInt(element2.id) - 14)){
                                       
                                        metros_frente -= dadosJS.result[k].metros_frente
                                    }
                                    if(dadosJS.result[k].lote == element2.id){
                                        metros_frente += dadosJS.result[k].metros_frente
                                        
                                    }
                                }

                               
                            }
                            console.log(element2.style.width)
                            element2.style.border = "4px solid rgb(8, 110, 5)"
                            break;
                        }
                    }
                    
                    var div = element2.cloneNode(true)
                    div.className = "select"
                    div.id = `a${element2.id}`
                    // Adiciona o elemento selecionado à lista de escolhas
                    document.querySelector(".escolhas").append(div)
                }
                // Atualiza o subtotal na página
                subtotal()
            })
        }else{
            // Define o estilo para lotes indisponíveis
            element2.style.border = "4px solid rgb(255, 0, 0)"
        }
    });
}

// Chama a função para iniciar o processo
quadra7()