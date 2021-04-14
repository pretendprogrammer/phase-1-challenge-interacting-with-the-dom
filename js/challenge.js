const timer = document.querySelector('h1#counter')
const addBtn = document.querySelector('button#plus')
const subtractBtn = document.querySelector('button#minus')
const pauseBtn = document.querySelector('button#pause')
const likeBtn = document.querySelector('button#heart')
const submitBtn = document.querySelector('button#submit')
const likesList = document.querySelector('.likes')
const commentDiv = document.querySelector('#list')
const commentForm = document.querySelector('#comment-form')
let likes = {}

let timerProgram
const timerStart = (callback) => {timerProgram = callback(addToTimer,1000)}

addBtn.setAttribute('onclick','addToTimer()')
subtractBtn.setAttribute('onclick','subtractFromTimer()')
pauseBtn.setAttribute('onclick',`pauseAndPlay(pauseBtn.innerText)`)
likeBtn.setAttribute('onclick', 'aLikeEventHasHappened()')

function addToTimer() {
    timer.innerText = ++timer.innerText
}

function subtractFromTimer() {
    timer.innerText = --timer.innerText
}

commentForm.addEventListener('submit',submitComment)

function submitComment(event) {
    event.preventDefault()
    let whatUserTypedString = event.target.comment.value
    newParagraghElement = document.createElement('p')
    newParagraghElement.append(whatUserTypedString)
    commentDiv.append(newParagraghElement)
}

function aLikeEventHasHappened(){
    let currentNumber = parseInt(timer.innerText, 10)
    !likes[currentNumber]? likes[currentNumber] = 1 : ++likes[currentNumber]
    console.log(likes)
    likesList.innerText = ''
    for (key of Object.keys(likes)) {
        let itemToAdd = document.createElement('li')
        let num = parseInt(likes[key], 10)
        if (num > 1) {
            itemToAdd.innerText = `${key} has ${num} likes`
        } else {
            itemToAdd.innerText = `${key} has 1 like`
        }
        likesList.append(itemToAdd)
    }
}

function pauseAndPlay(status) {
    if (status === 'pause') {
        clearInterval(timerProgram)
        pauseBtn.innerText = 'resume'
        subtractBtn.disabled = true
        addBtn.disabled = true
        likeBtn.disabled = true
        submitBtn.disabled = true
    } else {
        timerStart(setInterval)
        pauseBtn.innerText = 'pause'
        subtractBtn.disabled = false
        addBtn.disabled = false
        likeBtn.disabled = false
        submitBtn.disabled = false
    }
}

timerStart(setInterval)