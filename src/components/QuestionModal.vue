<script setup lang="ts">
import {ref} from "vue";
import type {PropType} from "vue";
import api from "@/APIDistributor";

import LoadingWall from "@/components/LoadingWall.vue";

import type {Question} from "@/types";

const emit = defineEmits(["update:isOpened"])

const props = defineProps({
  question: {
    type: Object as PropType<Question>,
  },
  isOpened: {
    type: Boolean,
    required: true,
  }
})

let idValue = ref(String(props.question?.id ?? ""));
let questionValue = ref(props.question?.question ?? "");
let answerValue = ref(props.question?.answer ?? "")

let isLoading = ref(false);

function saveData() {
  const id = Number(idValue.value);
  if (isNaN(id)) { return }  // Show people wrong input value
  if (!answerValue.value) { return }  // Show people wrong answer input value
  if (!questionValue.value) { return }  // Show people wrong question input value

  isLoading.value = true;

  api.default.updateQuestion({
    answer: answerValue.value,
    id,
    question: questionValue.value}
  )
      .then(() => {
        closeModal();
      })
      .catch((error) => {
        alert(error);  // change it to custom
      })
      .finally(() => {
        isLoading.value = false;
      })
}

function closeModal() {
  emit("update:isOpened", false);
}

</script>

<template>
  <div
      class="qModal"
      @click="closeModal()"
  >
    <div class="qModal__inner" @click.stop>
      <h1 class="qModal__title">
        Вопрос №
        <input
            v-model="idValue"
            class="qModal__id"
        >
      </h1>
      <textarea
          v-model="questionValue"
          class="qModal__question"
          placeholder="Текст вопроса..."
      ></textarea>
      <textarea
          v-model="answerValue"
          class="qModal__answer"
          placeholder="Текст ответа..."
      ></textarea>
      <button
          class="qModal__saveButton"
          @click="saveData"
      >
        Сохранить
      </button>
    </div>
  </div>
  <LoadingWall
      v-if="isLoading"
      @click.stop
  />
</template>

<style scoped lang="scss">
.qModal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, .4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.qModal__inner {
  background: white;
  box-sizing: border-box;
  padding: 48px;
  width: 80%;
}

.qModal__title {
  font-size: 24px;
  text-transform: uppercase;
  margin-bottom: 70px;
}

.qModal__question, .qModal__answer {
  font-size: 15px;
  font-weight: 200;
  width: 100%;
  resize: none;
  height: 20vh;
  box-sizing: border-box;
  padding: 5px 10px;
  margin-bottom: 35px;
  border: 1px solid currentColor;

  &::placeholder {
    color: currentColor;
  }
}

.qModal__saveButton {
  border: none;
  background: none;
  font-size: 15px;
  text-decoration: underline;
  cursor: pointer;
  float: right;
  font-weight: 200;
}

.qModal__id {
  border: 1px solid currentColor;
  font-size: 24px;
  text-transform: uppercase;
  font-weight: 600;
  width: 50px;
}

</style>