<script setup lang="ts">
import CircleIcon from "@/components/icons/CircleIcon.vue";
import SquareIcon from "@/components/icons/SquareIcon.vue";
import TriangleIcon from "@/components/icons/TriangleIcon.vue";
import SphereIcon from "@/components/icons/3d/SphereIcon.vue";
import CylinderIcon from "@/components/icons/3d/CylinderIcon.vue";
import ConeIcon from "@/components/icons/3d/ConeIcon.vue";
import CubeIcon from "@/components/icons/3d/CubeIcon.vue";
import PrismIcon from "@/components/icons/3d/PrismIcon.vue";
import PyramidIcon from "@/components/icons/3d/PyramidIcon.vue";
import type {allShapes} from "@/types";

export interface Props {
  shape?: allShapes|null,
  selected?: boolean,
  disabled?: boolean,
  error?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  shape: () => "C" as allShapes,
  selected: () => false,
  disabled: () => false,
  error: () => false,
})

const emit = defineEmits(['shape-click'])
</script>

<template>
  <button
      @click="emit('shape-click', shape)"
      :disabled="disabled"
      class="rounded-lg border"
      :class="[
        (selected ? 'text-green-800 dark:text-green-200 bg-green-200 dark:bg-green-800 border-green-800 dark:border-green-200' : 'text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-800 border-gray-800 dark:border-gray-200'),
        (disabled ? 'cursor-not-allowed !bg-gray-400 !dark:bg-gray-600' : ''),
        (error ? '!text-red-800 !dark:text-red-200 !bg-red-200 !dark:bg-red-800 !border-red-800 !dark:border-red-200' : '')
      ]"
  >
    <span v-if="shape == 'C'">
      <CircleIcon class="h-8 w-8 stroke-[4px] m-2"/>
    </span>
    <span v-else-if="shape == 'S'">
      <SquareIcon class="h-8 w-8 stroke-[4px] m-2"/>
    </span>
    <span v-else-if="shape == 'T'">
      <TriangleIcon class="h-8 w-8 stroke-[4px] m-2"/>
    </span>
    <span v-else-if="shape == 'CC'">
      <SphereIcon class="h-8 w-8 stroke-[4px] m-2"/>
    </span>
    <span v-else-if="shape == 'CS'">
      <CylinderIcon class="h-8 w-8 stroke-[4px] m-2"/>
    </span>
    <span v-else-if="shape == 'CT'">
      <ConeIcon class="h-8 w-8 stroke-[4px] m-2"/>
    </span>
    <span v-else-if="shape == 'SS'">
      <CubeIcon class="h-8 w-8 stroke-[4px] m-2"/>
    </span>
    <span v-else-if="shape == 'ST'">
      <PrismIcon class="h-8 w-8 stroke-[4px] m-2"/>
    </span>
    <span v-else-if="shape == 'TT'">
      <PyramidIcon class="h-8 w-8 stroke-[4px] m-2"/>
    </span>
  </button>
</template>