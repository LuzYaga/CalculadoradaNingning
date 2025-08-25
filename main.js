        const calculadora = document.querySelector('.calculator')
        const operator = calculadora.querySelector('.calculator__keys')
        const display = calculadora.querySelector('.calculator__display')
        const calculate = (n1,operator,n2) => {
            let result = ' '

            if (operator == "add") {
                result = parseFloat(n1) + parseFloat(n2)
            } else if (operator == "subtract") {
                result = parseFloat(n1) - parseFloat(n2)
            } else if (operator == "multiply") {
                result = parseFloat(n1) * parseFloat(n2)
            } else if (operator == "divide") {
                result = parseFloat(n1) / parseFloat(n2)
            }

            return result
        }

    
        operator.addEventListener('click', e => {
            const faz = e.target
            const action = faz.dataset.action
            const numero = faz.textContent
            const aparece = display.textContent

            if (e.target.matches('button')) { //e é um parametro, .target uma função built in, assim como matches()
                const previousKeyType = calculadora.dataset.previousKeyType
                
                Array.from(faz.parentNode.children)
                    .forEach(k => k.classList.remove('is-depressed'))

                if (!action) { // se não tiver data-action é um numero, então...
                        if (aparece === "0" || previousKeyType === 'operator' || previousKeyType === 'calcular') {
                            display.textContent = numero
                        } else {
                            display.textContent = aparece + numero
                        }
                        calculadora.dataset.previousKeyType = 'number'
                    }
                
                if(
                    action == "add" || 
                    action == "subtract" || 
                    action == "multiply" || 
                    action == "divide") {
                    faz.classList.add('is-depressed')
                    calculadora.dataset.previousKeyType = 'operator'
                    calculadora.dataset.primeiroNum = aparece
                    calculadora.dataset.operator = action
                }

                if(action == "decimal") {
                    if (!aparece.includes(".")) {
                        display.textContent = aparece + "."
                    } else if (previousKeyType == "operator") {
                        display.textContent = "0."
                    }
                    calculadora.dataset.previousKeyType = "decimal"
                }

                if(action == 'apagar') {
                    display.textContent = "0"
                    console.log("apagar")
                    calculadora.dataset.previousKeyType = "apagar"
                }

                if(action == 'calcular') {
                    const primeiroNum = calculadora.dataset.primeiroNum
                    const operator = calculadora.dataset.operator
                    const segundoNum = aparece
                    if (primeiroNum && operator && segundoNum) { // fui tentando fazer com que não tivesse como ficar sem valor na parte de mostrar resultado
                        display.textContent = calculate(primeiroNum, operator, segundoNum)
                        calculadora.dataset.primeiroNum = calculate(primeiroNum, operator, segundoNum)
                    } else if (aparece == "0"){
                        display.textContent = "0"
                    }
                    calculadora.dataset.previousKeyType = 'calcular'
                    console.log("calcular")
                    calculadora.dataset.operator = ""
                    calculadora.dataset.segundoNum = aparece
                }
            }
        })
        