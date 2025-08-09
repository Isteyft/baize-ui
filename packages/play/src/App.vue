<script setup lang="ts">
import { BaizeButton, BaizePopconfirm } from 'baize-ui';

function confrim() {
  console.log('confrim');
}
function cancel() {
  console.log('cancel');
}

import { ja, ko, en, zhCn, zhTw, BaizeConfigProvider } from "baize-ui";
import { get } from "lodash-es";

import { computed, ref } from "vue";

const language = ref("");
const langMap = {
  ja,
  ko,
  en,
  zhCn,
  zhTw,
} as const;
const locale = computed(() => get(langMap, language.value));
const changelang = () => {
  const l = ["zhCn", "zhTw", "ko", "en", "ja"];
  language.value = l[(l.indexOf(language.value) + 1) % l.length];
};
</script>

<template>
  <BaizeButton type="primary" size="small">a</BaizeButton>
  <!-- <BaizeCollapse v-model:model-value="activeNames" accordion>
    <BaizeCollapseItem title="标题1" name="1">
      内容1
    </BaizeCollapseItem>
  </BaizeCollapse> -->

<!-- 
      <baize-collapse v-bind="args">
      <baize-collapse-item name="a" title="Title a">
        <div>this is content a</div>
      </baize-collapse-item>
      <baize-collapse-item name="b" title="title b">
        <div>this is content b</div>
      </baize-collapse-item>
      <baize-collapse-item name="c" title="title c  disable" disabled>
        <div>this is content c</div>
      </baize-collapse-item>
    </baize-collapse> -->

    <BaizePopconfirm title="确认删除吗" @confirm="confrim" @cancel="cancel">
      <baize-button type="primary" size="small">删除</baize-button>
    </BaizePopconfirm>


<baize-button @click="changelang" type="info" style="margin-right: 20px">
  change language
</baize-button>
  <baize-config-provider :locale="locale">
    <baize-popconfirm title="Are you shure to delete this item?">
      <baize-button>Delete</baize-button>
    </baize-popconfirm>
  </baize-config-provider>
</template>

<style scoped>
</style>
