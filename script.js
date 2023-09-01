var lotes = document.querySelectorAll("#l1")
var soma = 0
var subtot = document.querySelector("#subtotal")
var preco_1 =[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]//valor 80.000
var preco_2 =[11, 12, 13, 14, 15, 16, 17, 18, 19, 20]//valor 100.000
var preco_3 =[21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]//valor 120.000

function subtotal(){
    subtot.innerHTML = `Subtotal: ${soma.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
}

lotes.forEach(element => {
    element.addEventListener("click", ()=>{
        for(j = 0; j <  20; j++){
            if (parseInt(element.className) == preco_1[j]) {
                
                if(element.style.backgroundColor == "rgba(30, 255, 0, 0.404)"){
                    element.style.backgroundColor = ""
                    soma -= 80000
                }else{
                    element.style.backgroundColor = "#1eff0067"
                    soma += 80000
                }
                
                subtotal()
                break;
            }
            if(parseInt(element.className) == preco_2[j]){
                if(element.style.backgroundColor == "rgba(30, 255, 0, 0.404)"){
                    element.style.backgroundColor = ""
                    soma -= 100000
                }else{
                    element.style.backgroundColor = "#1eff0067"
                    soma += 100000
                }
                
                subtotal()
                break;
            }
            if(parseInt(element.className) == preco_3[j]){
                if(element.style.backgroundColor == "rgba(30, 255, 0, 0.404)"){
                    element.style.backgroundColor = ""
                    soma -= 120000
                }else{
                    element.style.backgroundColor = "#1eff0067"
                    soma += 120000
                }
                
                subtotal()
                break;
            }
        }
    })
});