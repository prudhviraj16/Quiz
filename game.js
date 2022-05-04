const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')
let currentquestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availiableQuestions =[]

let questions = [
    {
        question : "What is 2+2?",
        choice1 : '2',
        choice2 : '4',
        choice3 :  '21',
        choice4 : '17',
        answer : 2
    },
    {
        question : "What is 2+3?",
        choice1 : '2',
        choice2 : '4',
        choice3 :  '5',
        choice4 : '17',
        answer : 3
    },
    {
        question : "What is 2+4?",
        choice1 : '2',
        choice2 : '4',
        choice3 :  '21',
        choice4 : '6',
        answer : 4
    },
    {
        question : "What is 2+5?",
        choice1 : '7',
        choice2 : '4',
        choice3 :  '21',
        choice4 : '17',
        answer : 1
    },
    {
        question : "What is 2+6?",
        choice1 : '2',
        choice2 : '8',
        choice3 :  '21',
        choice4 : '17',
        answer : 2
    },
    {
        question : "What is 2+7?",
        choice1 : '2',
        choice2 : '4',
        choice3 :  '21',
        choice4 : '9',
        answer : 4
    },
    {
        question : "What is 2+8?",
        choice1 : '2',
        choice2 : '4',
        choice3 :  '10',
        choice4 : '17',
        answer : 3
    },
    {
        question : "What is 2+9?",
        choice1 : '2',
        choice2 : '11',
        choice3 :  '10',
        choice4 : '17',
        answer : 2
    },
    {
        question : "What is 2+10?",
        choice1 : '2',
        choice2 : '4',
        choice3 :  '10',
        choice4 : '12',
        answer : 4
    },
    {
        question : "What is 2+11?",
        choice1 : '2',
        choice2 : '4',
        choice3 :  '13',
        choice4 : '17',
        answer : 3
    }
]

const Score_Points = 100
const Max_Questions = 10
startGame =()=>{
    questionCounter =0,
    score = 0,
    availiableQuestions = [...questions],
    getNewQuestion()    
}

getNewQuestion = ()=>{
    if(availiableQuestions.length===0||questionCounter>Max_Questions){
        localStorage.setItem('mostRecentScore',score)
        return window.location.assign('/end.html')
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${Max_Questions}`
    progressBarFull.style.width = `${(questionCounter/Max_Questions)*100}%`
    const questionsIndex = Math.floor(Math.random()*availiableQuestions.length)
    currentquestion = availiableQuestions[questionsIndex]
    question.innerText= currentquestion.question
    choices.forEach(choice=>{
        const number = choice.dataset['number']
        choice.innerText=currentquestion['choice' + number]
    })
    availiableQuestions.splice(questionsIndex,1)
    acceptingAnswers=true
}

choices.forEach(choice=>{
    choice.addEventListener('click',e=>{
        if(!acceptingAnswers) return

        acceptingAnswers = false;
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
        let classToApply = selectedAnswer==currentquestion.answer?'correct' : 'incorrect'

        if(classToApply==='correct'){
            incrementScore(Score_Points)
        }

        selectedChoice.parentElement.classList.add(classToApply)
        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        },1000)
    })
})

incrementScore = num =>{
    score +=  num
    scoreText.innerText = score
}
startGame()