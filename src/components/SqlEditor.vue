<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import autoComplete from "@tarekraafat/autocomplete.js";
import tdengineKeys from "../config/tdengine-keys.js";
import getCaretCoordinates from "textarea-caret"

const autoCompleteJS = ref()
const autoCompleteList = ref()
const sql = ref()

const config = {
  selector: "#autoComplete",
  placeHolder: "SELECT * FROM ...",
  data: {
    src: tdengineKeys,
    cache: false,
  },
  resultsList: {
    element: (list, data) => {
      setTimeout(() => autoCompleteJS.value.goTo(0), 5);
    },
    noResults: true,
    tabSelect: false,
    id: "autoComplete_list",
    maxResults: 100
  },
  resultItem: {
    highlight: true,
  },
  searchEngine: (query, record) => {
    let selection = query.slice(0, autoCompleteJS.value.input.selectionStart)
    let q = selection.split(" ")
    return q[q.length - 1] && record.toUpperCase().startsWith(q[q.length - 1].toUpperCase()) ? record : null
  },
  events: {
    input: {
      focus() {
        if (autoCompleteJS.value.input.value.length) autoCompleteJS.value.start();
      },
      selection(event) {
        if (!autoCompleteJS.value || !event.detail || !event.detail.selection || !event.detail.selection.value) {
          return
        }
        let selected = event.detail.selection.value
        let startPos = autoCompleteJS.value.input.selectionStart
        let selection = sql.value.slice(0, autoCompleteJS.value.input.selectionStart)
        let words = selection.split(" ")
        let last = words[words.length - 1]
        autoCompleteJS.value.input.value = sql.value.substring(0, startPos - last.length) + selected + sql.value.substring(startPos, sql.value.length) + " "

        let pos = startPos + selected.length - last.length
        autoCompleteJS.value.input.selectionStart = pos
        autoCompleteJS.value.input.selectionEnd = pos

        autoCompleteJS.value.input.focus()
      },
    },
  },
}

onMounted(() => {
  autoCompleteJS.value = new autoComplete(config);
})
onUnmounted(() => {
  autoCompleteJS.value.unInit()
})
const updateCaretCoordinates = (evt) => {
  let caret = getCaretCoordinates(autoCompleteJS.value.input, autoCompleteJS.value.input.selectionEnd);
  if (!autoCompleteList.value) {
    autoCompleteList.value = document.getElementById("autoComplete_list")
  }
  autoCompleteList.value.style.top = `${caret.top + 10}px`
  autoCompleteList.value.style.left = `${caret.left + 10}px`
}
</script>

<template>
  <a-row>
    <a-col :span="24">
      <a-textarea id="autoComplete" v-model:value="sql" placeholder="" :rows="10" @keyup="updateCaretCoordinates"/>
    </a-col>
    <a-col :span="24"></a-col>
  </a-row>
</template>

<style scoped>

</style>
