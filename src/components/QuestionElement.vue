<script setup lang="ts">
import {ref, watch} from "vue";
import type { PropType } from "vue";
import type { Question } from "@/types";

import QuestionModal from "@/components/QuestionModal.vue";
import APIDistributor from "@/APIDistributor";

let isModalShown = ref(false);

const emit = defineEmits(["updated"]);

const props = defineProps({
  question: {
    type: Object as PropType<Question>,
    required: true,
  }
})

function removeBlock(id: number): void {
  APIDistributor.default.removeQuestion(id)
      .then(() => {
        emit("updated");
      })
      .catch((error) => {
        console.log(error);
      })
}

function expendQuestion(): void {
  isModalShown.value = true;
}

watch(isModalShown, () => {
  emit("updated");
})

</script>

<template>
  <div class="question">
    <h2 class="question__title" @click="expendQuestion()">
      {{ question.id }}. {{ question.question }}
    </h2>
    <button class="question__removeButton" @click="removeBlock(question.id)">
      X
    </button>
    <p class="question__answer">
      Ответ: {{ question.answer }}
    </p>
  </div>

  <QuestionModal v-if="isModalShown" v-model:is-opened="isModalShown" :question="question"/>
</template>

<style lang="scss" scoped>
  .question {
    display: grid;
    grid-template-columns: calc(100% - 34px) 24px;
    gap: 16px 10px;
    color: var(--theme-color);

    &__title {
      margin: 0;
      padding: 0;
      font-size: 24px;
      font-weight: 200;

      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }

    &__answer {
      margin: 0;
      padding: 0;
      font-size: 15px;
      font-weight: 200;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__removeButton {
      border: none;
      background: none;
      padding: 0;
      margin: 4px 0 auto;
      text-decoration: underline;
      font-size: 15px;
      font-weight: 200;
      cursor: pointer;
    }
  }
</style>