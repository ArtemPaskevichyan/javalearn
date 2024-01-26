<script lang="ts" setup>
import {onUnmounted, ref} from "vue";

const TIME_INTERVAL = 300;

let text = ref("Загрузка.");

const intervalId = setInterval(() => {
  if (text.value.length == 11) {
    text.value = "Загрузка";
  } else {
    text.value += ".";
  }
}, TIME_INTERVAL);

onUnmounted(() => {
  clearInterval(intervalId);
})
</script>

<template>
<div class="loading">
  <div class="loading__inner">
    <span class="loading__text">
      {{ text }}
    </span>
  </div>
</div>
</template>

<style scoped lang="scss">
.loading {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, .4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading__inner {
  background: white;
  width: 290px;
  height: 64px;
  padding: 24px;
  box-sizing: border-box;
}

.loading__text {
  font-size: 15px;
  font-weight: 200;
}
</style>