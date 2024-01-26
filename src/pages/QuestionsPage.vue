<script lang="ts" setup>
import QuestionElement from "@/components/QuestionElement.vue";
import QuestionModal from "@/components/QuestionModal.vue";
import {ref, watch} from "vue";

import APIDistributor from "@/APIDistributor";

import type { Ref } from "vue";
import type {Question} from "@/types";

let questions: Ref<Question[]> = ref([]);

let isModalShown = ref(false);
function openQuestionCreating(): void {
  isModalShown.value = true;
}
function getData() {
  APIDistributor.default.getQuestions()
      .then((response) => {
        questions.value = response.data;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally()
}

watch(isModalShown, () => {
  getData();
})

getData();

document.addEventListener("scroll", () => {
  console.log(document.documentElement.scrollTop);
  if (document.documentElement.scrollTop > 100) {
    document.querySelector("header")?.classList.add("active");
  } else {
    document.querySelector("header")?.classList.remove("active");
  }
})

</script>

<template>
  <main class="questions">
    <header>
      <h1 class="questions__title">Банк вопросов</h1>
      <button class="questions__addButton" @click="openQuestionCreating()">Добавить +</button>
    </header>
    <div class="questions__list">
      <QuestionElement
          :key="q.id"
          v-for="q in questions"
          :question="q"
          @updated="getData"
      />
      <h2 v-if="questions.length == 0">
        Вопросы не найдены :(
      </h2>
    </div>
  </main>
  <QuestionModal v-if="isModalShown" v-model:is-opened="isModalShown"/>
</template>

<style lang="scss" scoped>
.questions {
  width: 60%;
  margin: 10vh auto;
  font-family: Arial, sans-serif;

  &__title {
    padding: 0;
    margin: 0;
    font-size: 24px;
    text-transform: uppercase;
    font-weight: 600;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 45px;
  }

  &__addButton {
    border: none;
    background: none;
    text-decoration: underline;
    cursor: pointer;
    font-size: 15px;
    font-weight: 200;
  }

  h2 {
    font-weight: 200;
    font-size: 16px;
    text-align: center;
  }

  header {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    top: 0;
    position: sticky;
    background-color: white;
    padding-top: 40px;
    padding-bottom: 20px;

    &.active {
      border-bottom: .6px solid currentColor;
    }
  }
}
</style>