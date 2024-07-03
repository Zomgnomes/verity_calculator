<script setup lang="ts">
import IconButton from "@/components/IconButton.vue";
import {type shape3dSelections,type shape3d} from "@/types";

export interface Props {
  selections?: shape3dSelections,
}

const props = withDefaults(defineProps<Props>(), {
  selections: () => {
    return { "shape": null, "state": null }
  }
})

function handleShapeClick(shape: shape3d) {
  emit("shape-selected", shape)
}

const emit = defineEmits(['shape-selected'])

</script>

<template>
<div class="flex flex-nowrap flex-col">
  <div class="flex flex-nowrap">
    <IconButton
        shape="CC"
        :disabled="selections['shape'] == 'CC' && selections['state'] == 0"
        :selected="selections['shape'] == 'CC' && selections['state'] == 1"
        :error="selections['shape'] == 'CC' && selections['state'] == 2"
        @shape-click="handleShapeClick"
        class="m-4"
    />
    <IconButton
        shape="CS"
        :disabled="selections['shape'] == 'CS' && selections['state'] == 0"
        :selected="selections['shape'] == 'CS' && selections['state'] == 1"
        :error="selections['shape'] == 'CS' && selections['state'] == 2"
        @shape-click="handleShapeClick"
        class="m-4"
    />
    <IconButton
        shape="CT"
        :disabled="selections['shape'] == 'CT' && selections['state'] == 0"
        :selected="selections['shape'] == 'CT' && selections['state'] == 1"
        :error="selections['shape'] == 'CT' && selections['state'] == 2"
        @shape-click="handleShapeClick"
        class="m-4"
    />
  </div>
  <div class="flex flex-nowrap">
    <IconButton
        shape="SS"
        :disabled="selections['shape'] == 'SS' && selections['state'] == 0"
        :selected="selections['shape'] == 'SS' && selections['state'] == 1"
        :error="selections['shape'] == 'SS' && selections['state'] == 2"
        @shape-click="handleShapeClick"
        class="m-4"
    />
    <IconButton
        shape="ST"
        :disabled="selections['shape'] == 'ST' && selections['state'] == 0"
        :selected="selections['shape'] == 'ST' && selections['state'] == 1"
        :error="selections['shape'] == 'ST' && selections['state'] == 2"
        @shape-click="handleShapeClick"
        class="m-4"
    />
    <IconButton
        shape="TT"
        :disabled="selections['shape'] == 'TT' && selections['state'] == 0"
        :selected="selections['shape'] == 'TT' && selections['state'] == 1"
        :error="selections['shape'] == 'TT' && selections['state'] == 2"
        @shape-click="handleShapeClick"
        class="m-4"
    />
  </div>
</div>
</template>

<style scoped>

</style>