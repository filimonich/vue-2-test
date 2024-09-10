<template>
  <div class="answers">
    <h1 class="answers__title">
      <template v-if="correctAnswersCount === numberOfQuestions">
        Поздравляем!
      </template>
      <template v-else-if="correctAnswersCount > 0">
        Хороший результат!
      </template>
      <template v-else> Упс :( </template>
    </h1>
    <div
      class="answers__items"
      v-if="correctAnswersCount === numberOfQuestions"
    >
      <p class="answers__text">Вы правильно ответили на все вопросы.</p>
      <p class="answers__text">Вы действительно отлично разбираетесь в IT.</p>
    </div>
    <div class="answers__items" v-else-if="correctAnswersCount > 0">
      <p class="answers__text">
        Вы ответили правильно на {{ correctAnswersCount }} вопросов.
      </p>
      <p class="answers__text">Так держать!</p>
    </div>
    <div class="answers__items" v-else>
      <p class="answers__text">Вы неправильно ответили на все вопросы.</p>
      <p class="answers__text">Нужно подучить теорию.</p>
    </div>
    <div
      v-for="(answer, index) in answers"
      :key="index"
      :class="['answers__card', getCardClass(answer)]"
    >
      <p class="answers__question">{{ answer.question }}</p>
      <p class="answers__answer">{{ answer.selectedAnswer.text }}</p>
    </div>
    <button
      v-if="correctAnswersCount < numberOfQuestions"
      class="answers__button"
      @click="retryQuiz"
    >
      Пройти еще раз
    </button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["numberOfQuestions"]),
    ...mapGetters(["getAnswers", "getAnsweredCount"]),
    answers() {
      return Object.values(this.getAnswers);
    },
    answeredCount() {
      return this.getAnsweredCount;
    },
    correctAnswersCount() {
      return this.answers.filter((answer) => answer.selectedAnswer.correct)
        .length;
    },
  },
  methods: {
    ...mapActions(["resetQuiz"]),
    retryQuiz() {
      this.resetQuiz();
      this.clearLocalStorage();
      this.$router.push("/");
    },
    getCardClass(answer) {
      return answer.selectedAnswer.correct ? "correct" : "incorrect";
    },
    clearLocalStorage() {
      localStorage.clear();
    },
  },
  watch: {
    correctAnswersCount(newVal) {
      if (newVal === this.numberOfQuestions) {
        this.resetQuiz();
        this.clearLocalStorage();
        this.$router.push("/");
      }
    },
  },
};
</script>
