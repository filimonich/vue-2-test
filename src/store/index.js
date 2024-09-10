import Vue from "vue";
import Vuex from "vuex";
import { questionsData } from "@/data/questions.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    questions: [],
    answers: JSON.parse(localStorage.getItem("quizAnswers")) || {},
    numberOfQuestions: 9,
    answeredCount: 0,
  },
  mutations: {
    SET_QUESTIONS(state, questions) {
      state.questions = questions;
    },
    SAVE_ANSWER(state, { questionIndex, answerIndex }) {
      const questionData = state.questions[questionIndex];
      const selectedAnswer = questionData.answers[answerIndex];
      const updatedAnswers = {
        ...state.answers,
        [questionIndex]: {
          question: questionData.question,
          selectedAnswer: {
            text: selectedAnswer.text,
            correct: selectedAnswer.correct,
          },
        },
      };

      Vue.set(state.answers, questionIndex, updatedAnswers[questionIndex]);
      localStorage.setItem("quizAnswers", JSON.stringify(updatedAnswers));
      state.answeredCount = Object.keys(updatedAnswers).length;
    },
    RESET_STATE(state) {
      state.questions = [];
      state.answers = {};
      state.answeredCount = 0;
      localStorage.removeItem("quizAnswers");
    },
    SET_NUMBER_OF_QUESTIONS(state, number) {
      state.numberOfQuestions = number;
    },
  },
  actions: {
    initializeQuestions({ commit, state }) {
      const numberOfQuestions = state.numberOfQuestions;
      let shuffledQuestions = shuffleArray(questionsData);

      while (shuffledQuestions.length < numberOfQuestions) {
        shuffledQuestions = shuffledQuestions.concat(
          shuffleArray(questionsData)
        );
      }

      commit("SET_QUESTIONS", shuffledQuestions.slice(0, numberOfQuestions));
    },
    saveAnswer({ commit, state }, payload) {
      const nextIndex = Object.keys(state.answers).length;

      commit("SAVE_ANSWER", {
        questionIndex: nextIndex,
        answerIndex: payload.answerIndex,
      });
    },
    resetQuiz({ commit }) {
      commit("RESET_STATE");
    },
    setNumberOfQuestions({ commit }, number) {
      commit("SET_NUMBER_OF_QUESTIONS", number);
    },
  },
  getters: {
    getQuestions(state) {
      return state.questions;
    },
    getAnswers(state) {
      return state.answers;
    },
    getNumberOfQuestions(state) {
      return state.numberOfQuestions;
    },
    getAnsweredCount(state) {
      return state.answeredCount;
    },
    getAnswersCount(state) {
      return Object.keys(state.answers).length;
    },
  },
});

function shuffleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
