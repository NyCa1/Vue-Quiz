<script setup>
import {ref, computed} from 'vue'

const questions = ref([
  {
    question:'Za koji klub navija Elvedin Sakić?',
    answer: 1,
    options: [
      'Željezničar',
      'Real Madrid',
      'Osasuna'
    ],
    selected: null
  },
  {
    question:'Koliko je koštao kroasan koji je Samir vidio na TV-u?',
    answer:2,
    options: [
      '5KM',
      '20KM',
      'Nije to moj task'
    ],
    selected: null
  },
  {
    question:'Koji poznati fudbaler radi u Iskonu?',
    answer:0,
    options: [
      'Luka Modrić',
      'Nemanja Bilbija',
      'Tino-Sven Sušić'
    ],
    selected: null
  }

])

const quizCompleted=ref(false)
const currentQuestion=ref(0)
const score=computed(() => {
  let value = 0
  questions.value.map(q => {
    if (q.selected == q.answer) {
      value++
    }
  })
  return value
})

const getCurrentQuestion=computed(() => {
  let question = questions.value[currentQuestion.value]
  question.index = currentQuestion.value
  return question
})

const SetAnswer = evt => {
  questions.value[currentQuestion.value].selected = evt.target.value
  evt.target.value = null
}

const NextQuestion = () => {
  if (currentQuestion.value < questions.value.length - 1) {
    currentQuestion.value++
  } else {
    quizCompleted.value=true
  }
}

</script>

<template>
  <main class="app">
    <h1>The Quiz</h1>

    <section class="quiz" v-if="!quizCompleted">
      <div class="quiz-info">
        <span class="question">{{getCurrentQuestion.question}}</span>
        <span class="score">Score {{score}}/{{questions.length}}</span>
      </div>

      <div class="options">
        <label v-for="(option, index) in getCurrentQuestion.options" 
        :key="index"
        :class="`option ${
          getCurrentQuestion.selected == index
            ? index == getCurrentQuestion.answer
              ? 'correct'
              : 'wrong'
            : ''  

        } ${
          getCurrentQuestion.selected != null &&
          index != getCurrentQuestion.selected
            ? 'disabled'
            : ''
        }`">
            <input 
              type="radio" 
              :name="getCurrentQuestion.index"
              :value="index"
              v-model="getCurrentQuestion.selected"
              :disabled="getCurrentQuestion.selected"
              @change="SetAnswer">
              <span>{{option}}</span>
        </label>
      </div>

      <button
       @click="NextQuestion"
       :disabled="!getCurrentQuestion.selected">
       {{
          getCurrentQuestion.index == questions.length - 1
          ? 'Finish'
          : getCurrentQuestion.selected == null
            ? 'select an option'
            : 'Next Question'
       }}
       
      </button>
    </section>

    <section v-else>
      <h2>You have finished the quiz</h2>
      <p>Your score is {{score}}/{{questions.length}}</p>

    </section>


  </main>
</template>

<style>
  *{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
  }

body 
{
  background-color: black;
  color: white;
}

.app
{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
}

h1
{
  font-size: 2rem;
  margin-bottom: 2rem;
}

.quiz 
{
  background-color: #382a4b;
  padding: 1rem;
  width: 100%;
  max-width: 640px;  
}

.quiz-info 
{
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.quiz-info .question
{
  color: white;
  font-size: 120%; 
}

.quiz-info .score
{
  color: white;
  font-size: 50%; 
}

.options
{
  margin-bottom: 1rem;
}

.option
{
  display: block;
  padding: 1rem;
  background-color: #271c36;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.option:hover
{
  background-color: #2d213f;
}

.option.correct
{
  background-color: green;
}

.option.wrong
{
  background-color: red;
}

.option:last-of-type
{
  margin-bottom: 0;
}

.option.disabled
{
  opacity: 0.5;
}

.option input
{
  display: none;
}

button
{
  appearance: none;
  outline: none;
  border: none;
  cursor: pointer;

  padding: 0.5rem 1rem;
  background-color:green;
  color: black;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.25rem;
  border-radius: 0.5rem;
}

button:disabled
{
  opacity: 0.5;
}

h2
{
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;

}

p
{
  color: grey;
  font-size: 1.25rem;
  text-align: center;
}


</style>

