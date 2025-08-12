<script lang="ts" setup>
import { BaizeMessage } from "baize-ui";
const open1 = () => {
  BaizeMessage({
    showClose: true,
    message: "This is a message.",
  });
};
const open2 = () => {
  BaizeMessage({
    showClose: true,
    message: "Congrats, this is a success message.",
    type: "success",
  });
};
const open3 = () => {
  BaizeMessage({
    showClose: true,
    message: "Warning, this is a warning message.",
    type: "warning",
  });
};
const open4 = () => {
  BaizeMessage({
    showClose: true,
    message: "Oops, this is a error message.",
    type: "danger",
  });
};
</script>

<template>
  <baize-button :plain="true" @click="open1">Message</baize-button>
  <baize-button :plain="true" @click="open2">Success</baize-button>
  <baize-button :plain="true" @click="open3">Warning</baize-button>
  <baize-button :plain="true" @click="open4">Baizeror</baize-button>
</template>