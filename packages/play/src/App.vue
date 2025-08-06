<script setup lang="ts">
import { BaizeButton, BaizePopconfirm } from 'baize-ui';

function confrim() {
  console.log('confrim');
}
function cancel() {
  console.log('cancel');
}
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
</template>

<style scoped>
</style>
