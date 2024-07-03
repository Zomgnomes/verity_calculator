<script setup lang="ts">
import IconButton from '@/components/IconButton.vue'
import { type shape2dSelections, type shape2d } from '@/types'

export interface Props {
  selections?: shape2dSelections
}

const props = withDefaults(defineProps<Props>(), {
  selections: () => {
    return { shape: null, state: null }
  }
})

function handleShapeClick(shape: shape2d) {
  emit('shape-selected', shape)
}

const emit = defineEmits(['shape-selected'])
</script>

<template>
  <div class="flex flex-nowrap">
    <IconButton
      shape="C"
      :disabled="selections['shape'] == 'C' && selections['state'] == 0"
      :selected="selections['shape'] == 'C' && selections['state'] == 1"
      :error="selections['shape'] == 'C' && selections['state'] == 2"
      @shape-click="handleShapeClick"
      class="m-4"
    />
    <IconButton
      shape="S"
      :disabled="selections['shape'] == 'S' && selections['state'] == 0"
      :selected="selections['shape'] == 'S' && selections['state'] == 1"
      :error="selections['shape'] == 'S' && selections['state'] == 2"
      @shape-click="handleShapeClick"
      class="m-4"
    />
    <IconButton
      shape="T"
      :disabled="selections['shape'] == 'T' && selections['state'] == 0"
      :selected="selections['shape'] == 'T' && selections['state'] == 1"
      :error="selections['shape'] == 'T' && selections['state'] == 2"
      @shape-click="handleShapeClick"
      class="m-4"
    />
  </div>
</template>

<style scoped></style>
