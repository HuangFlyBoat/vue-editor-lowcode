<template>
  <div class="app">
    <!-- state绑定的是json数据，双向绑定 -->
    <Editor v-model="state" :formData="formData"></Editor>
  </div>
</template>

<script>
import { ref, provide } from "vue";
import data from "./data.json";
import Editor from "./packages/editor";
//导入组件配置registerConfig，以后注入config即可以找到关于组件的全部信息
import { registerConfig as config } from "./utils/editor-config";
import Range from "./components/Range.jsx";
export default {
  components: {
    Editor,
    Range,
  },
  setup() {
    const state = ref(data);
    provide("config", config); // 将组件的配置直接传值

    // 传入的绑定数据，名字和值
    const formData = ref({
      timeStart: new Date(),
      timeEnd: new Date(),
      dateStart: "",
      dateEnd: "",
    });

    return {
      state,
      formData,
    };
  },
};
</script>

<style lang="scss">
.app {
  position: fixed;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
}
</style>
