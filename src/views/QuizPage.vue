<template>
  <div class="quiz">
    <div class="quiz__wrapper">
      <h1 class="quiz__title">Тестирование</h1>
      <div class="quiz__wrapper">
        <div class="quiz__card" v-if="currentQuestionData">
          <p class="quiz__question">{{ currentQuestionData.question }}</p>
          <form class="quiz__form">
            <div v-for="(answer, index) in currentShuffledAnswers" :key="index">
              <label class="quiz__answer">
                <input
                  type="radio"
                  :name="'question' + currentAnswerNumber"
                  :value="index"
                  v-model="selectedAnswer"
                  :disabled="answered"
                  @change="handleAnswer(index)"
                />
                <span>{{ answer.text }}</span>
              </label>
            </div>
          </form>
        </div>
        <p v-else>Загрузка...</p>
      </div>
      <div class="quiz__values">
        <span class="quiz__values-start">0</span>
        <span class="quiz__values-end">{{ numberOfQuestions + 1 }}</span>
      </div>
      <div class="quiz__progress">
        <div class="quiz__progress-bar">
          <div
            class="quiz__progress-current"
            :style="{ width: progress + '%' }"
          ></div>
        </div>
        <span
          class="quiz__progress-counter"
          :style="{ left: adjustedProgress + '%' }"
        >
          {{ currentAnswerNumber }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      selectedAnswer: null,
      answered: false,
    };
  },
  computed: {
    ...mapState(["questions", "answers", "numberOfQuestions"]),
    ...mapGetters(["getAnswersCount"]),
    currentQuestionData() {
      return this.questions[this.currentAnswerNumber - 1];
    },
    currentShuffledAnswers() {
      const answers = this.currentQuestionData.answers;
      return answers.slice().sort(() => Math.random() - 0.5);
    },
    adjustedProgress() {
      return this.progress === 0 ? 0 : this.progress - 1.2;
    },
    progress() {
      return (this.getAnswersCount / this.numberOfQuestions) * 100 + 10;
    },
    currentAnswerNumber() {
      return this.getAnswersCount + 1;
    },
  },
  watch: {
    currentAnswerNumber(val) {
      this.selectedAnswer = this.answers[val - 1] || null;
    },
  },
  created() {
    this.initializeQuestions();
  },
  methods: {
    ...mapActions(["initializeQuestions", "saveAnswer"]),
    handleAnswer(index) {
      this.answered = true;
      setTimeout(() => {
        this.saveAnswer({
          questionIndex: this.currentAnswerNumber - 1,
          answerIndex: index,
        })
          .then(() => {
            if (this.getAnswersCount >= this.numberOfQuestions) {
              this.$router.push("/results");
            } else {
              this.selectedAnswer = null;
              this.answered = false;
            }
          })
          .catch((error) => {
            console.error("Failed to save answer:", error);
          });
      }, 1000);
    },
  },
};
</script>
