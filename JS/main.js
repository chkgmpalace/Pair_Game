import Card from '../cards.js'

function newGame(container, cardsCount){
    cardsCount = cardsCount
    let cardsNumberArray = [],
        cardArray = [],
        firstCard = null,
        secondCard = null,
        interval = null,
        timeOut = null,
        submitValueCard = document.getElementById('submit-value'),
        valueTime = document.getElementById('value-time')

    for (let i = 1; i <= cardsCount / 2; i++) {
        cardsNumberArray.push(i)
        cardsNumberArray.push(i)
    }

    // cardsNumberArray = cardsNumberArray.sort(() => Math.random() - 0.5)

    function shuffle(arr){
        let j, 
        temp;
    
        for(let i = arr.length - 1; i > 0; i--){
            j = Math.floor(Math.random()*(i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
    }
	

    shuffle(cardsNumberArray)

    for (const cardNumber of cardsNumberArray) {
        cardArray.push(new Card(container, cardNumber, flip))
    }

    function startTimer(){
        if(!interval){
            interval = setInterval(timer, 1000)
        }
    }

    function timer(){
        valueTime.value--
        if(valueTime.value == -1)  clearInterval(interval)       
    }

    function setOutPut(){
        alert('Поздравляем! Вы выиграли!')
    }

    function flip(card){

        if(firstCard !== null && secondCard !== null){
            if(firstCard.number != secondCard.number ){
                firstCard.open = false
                secondCard.open = false
                firstCard = null
                secondCard = null
            }
        }
        
        if(firstCard == null){
            firstCard = card
        }else{
            if(secondCard == null){
                secondCard = card
            }
        }

        if(firstCard !== null && secondCard !== null){
            if(firstCard.number == secondCard.number ){
                firstCard.success = true
                secondCard.success = true
                firstCard = null
                secondCard = null
            }
        }

        if(document.querySelectorAll('.card.success').length == cardsNumberArray.length){
            timeOut = setTimeout(setOutPut, 1000)
        }
    };

    submitValueCard.addEventListener('click', function(event) {
        let valueCard = document.getElementById('value-card')

        cardsCount = valueCard.value

        event.preventDefault();

        startTimer()
        container.innerHTML = ''
        cardsNumberArray = []
        cardArray = []
        firstCard = null
        secondCard = null
        newGame(container, cardsCount)
    })
};

newGame(document.getElementById('game'))