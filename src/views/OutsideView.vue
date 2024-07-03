<script setup lang="ts">
import Shape2dOptions from "@/components/Shape2dOptions.vue";
import Shape3dOptions from "@/components/Shape3dOptions.vue";
import {reactive, ref} from 'vue'
import type {shape2d, shape2dSelections, shape3d, shape3dSelections, shapePosition} from "@/types";

let leftInside = reactive<shape2dSelections>({
  "shape": null,
  "state": null,
})

let middleInside = reactive<shape2dSelections>({
  "shape": null,
  "state": null,
})

let rightInside = reactive<shape2dSelections>({
  "shape": null,
  "state": null,
})

let leftOutside = reactive<shape3dSelections>({
  "shape": null,
  "state": null,
})

let middleOutside = reactive<shape3dSelections>({
  "shape": null,
  "state": null,
})

let rightOutside = reactive<shape3dSelections>({
  "shape": null,
  "state": null,
})

let wave1 = ref("");
let wave2 = ref("");

function getInside(pos: number): shape2dSelections {
  if ( pos == 0 ) {
    return leftInside;
  } else if ( pos == 1 ) {
    return middleInside;
  } else if ( pos == 2) {
    return rightInside;
  }
  return {
    "shape": null,
    "state": null,
  };
}

function getOutside(pos: number): shape3dSelections {
  if ( pos == 0 ) {
    return leftOutside;
  } else if ( pos == 1 ) {
    return middleOutside;
  } else if ( pos == 2) {
    return rightOutside;
  }
  return {
    "shape": null,
    "state": null,
  };
}

function findGoal(shape2d: shape2d): shape3d {
  return 'CST'.replace(shape2d, '') as shape3d;
}

function findWrongParts(shape3d: string, goalShape: shape3d): string {
  let wrongParts: string = shape3d;
  for (let shapePart of goalShape) {
    wrongParts = wrongParts.replace(shapePart, '');
  }
  return wrongParts;
}

function displayShape(shape: shape2d | undefined): string {
  if (shape == "C") {
    return "Circle";
  } else if (shape == "S") {
    return "Square";
  } else if (shape == "T") {
    return "Triangle";
  }
  return "";
}

function displayPos(pos: shapePosition | undefined): string {
  if (pos == "L") {
    return "Left";
  } else if (pos == "M") {
    return "Middle";
  } else if (pos == "R") {
    return "Right";
  }
  return "";


}
function generateOutput(
    shape1: shape2d | undefined,
    location1: shapePosition | undefined,
    shape2: shape2d | undefined,
    location2: shapePosition | undefined,
    shape3: shape2d | undefined,
    location3: shapePosition | undefined,
    shape4: shape2d | undefined,
    location4: shapePosition | undefined,
    shape5: shape2d | undefined,
    location5: shapePosition | undefined,
    shape6: shape2d | undefined,
    location6: shapePosition | undefined
) {
  wave1.value = "";
  wave2.value = "";

  if (typeof shape3 !== "undefined") {
    wave1.value = `${displayShape(shape1)} ${displayPos(location1)} - ${displayShape(shape2)} ${displayPos(location2)} - ${displayShape(shape3)} ${displayPos(location3)}`;
  } else if (typeof shape2 !== "undefined"){
    wave1.value = `${displayShape(shape1)} ${displayPos(location1)} - ${displayShape(shape2)} ${displayPos(location2)}`;
  } else {
    wave1.value = "Do nothing it's already solved";
    return;
  }

  if (typeof shape6 !== "undefined") {
    wave2.value = `${displayShape(shape4)} ${displayPos(location4)} - ${displayShape(shape5)} ${displayPos(location5)} - ${displayShape(shape6)} ${displayPos(location6)}`;
  } else if (typeof shape5 !== "undefined") {
    wave2.value = `${displayShape(shape4)} ${displayPos(location4)} - ${displayShape(shape5)}${displayPos(location5)}`;
  } else if (typeof shape4 !== "undefined") {
    wave2.value = `${displayShape(shape4)} ${displayPos(location4)}`;
  }
}

function processSelections(): void {
  let left_goal: shape3d = findGoal(getInside(0)["shape"] as shape2d);
  let middle_goal: shape3d = findGoal(getInside(1)["shape"] as shape2d);
  let right_goal: shape3d = findGoal(getInside(2)["shape"] as shape2d);


  let left_has: string = getOutside(0)["shape"] as shape3d;
  let middle_has: string = getOutside(1)["shape"] as shape3d;
  let right_has: string = getOutside(2)["shape"] as shape3d;

  let left_wrong_parts = findWrongParts(left_has, left_goal);
  let middle_wrong_parts = findWrongParts(middle_has, middle_goal);
  let right_wrong_parts = findWrongParts(right_has, right_goal);

  let shape_1: string | undefined,
      shape_2: string | undefined,
      shape_3: string | undefined,
      shape_4: string | undefined,
      shape_5: string | undefined,
      shape_6: string | undefined;
  let loc_1: string | undefined,
      loc_2: string | undefined,
      loc_3: string | undefined,
      loc_4: string | undefined,
      loc_5: string | undefined,
      loc_6: string | undefined;


  console.log("initial")
  console.log(`left_has: ${left_has} left_goal: ${left_goal} left_wrong_parts: ${left_wrong_parts}`);
  console.log(`middle_has: ${middle_has} middle_goal: ${middle_goal} middle_wrong_parts: ${middle_wrong_parts}`);
  console.log(`right_has: ${right_has} right_goal: ${right_goal} right_wrong_parts: ${right_wrong_parts}`);

  if(
      left_wrong_parts.length !== 0 ||
      middle_wrong_parts.length !== 0 ||
      right_wrong_parts.length !== 0
  ){
    // figure out the first dunks
    if (middle_wrong_parts.length === 2) {
      shape_1 = middle_wrong_parts.slice(0,1);
      loc_1 = 'M';
    }
    else if (right_wrong_parts.length === 2) {
      shape_1 = right_wrong_parts.slice(0,1);
      loc_1 = 'R';
    } else if (left_wrong_parts.length > 0){
      shape_1 = left_wrong_parts.slice(0,1);
      loc_1 = 'L';
    } else {
      shape_1 = middle_wrong_parts.slice(0,1);
      loc_1 = 'M';
    }

    console.log(`after step 1 - chose ${shape_1}${loc_1}`)
    console.log(`left_has: ${left_has} left_goal: ${left_goal} left_wrong_parts: ${left_wrong_parts}`);
    console.log(`middle_has: ${middle_has} middle_goal: ${middle_goal} middle_wrong_parts: ${middle_wrong_parts}`);
    console.log(`right_has: ${right_has} right_goal: ${right_goal} right_wrong_parts: ${right_wrong_parts}`);

    if(
        loc_1 !== 'L' &&
        left_goal.includes(shape_1) &&
        !left_has.includes(shape_1)
    ){
      shape_2 = left_wrong_parts.slice(0,1);
      loc_2 = 'L';
      left_has = left_has.replace(shape_2, shape_1).split("").sort().join("");
    } else if (
        loc_1 !== 'M' &&
        middle_goal.includes(shape_1) &&
        !middle_has.includes(shape_1)
    ) {
      shape_2 = middle_wrong_parts.slice(0,1);
      loc_2 = 'M';
      middle_has = middle_has.replace(shape_2, shape_1).split("").sort().join("");
    } else {
      shape_2 = right_wrong_parts.slice(0,1);
      loc_2 = 'R';
      right_has = right_has.replace(shape_2, shape_1).split("").sort().join("");
    }

    if (loc_1 === "L"){
      left_has = left_has.replace(shape_1, shape_2).split("").sort().join("");
    } else if (loc_1 === "M"){
      middle_has = middle_has.replace(shape_1, shape_2).split("").sort().join("");
    } else {
      right_has = right_has.replace(shape_1, shape_2).split("").sort().join("");
    }

    left_wrong_parts = findWrongParts(left_has, left_goal);
    middle_wrong_parts = findWrongParts(middle_has, middle_goal);
    right_wrong_parts = findWrongParts(right_has, right_goal);

    console.log(`after step 2 - chose ${shape_2}${loc_2}`)
    console.log(`left_has: ${left_has} left_goal: ${left_goal} left_wrong_parts: ${left_wrong_parts}`);
    console.log(`middle_has: ${middle_has} middle_goal: ${middle_goal} middle_wrong_parts: ${middle_wrong_parts}`);
    console.log(`right_has: ${right_has} right_goal: ${right_goal} right_wrong_parts: ${right_wrong_parts}`);
  }



  if(
      left_wrong_parts.length !== 0 ||
      middle_wrong_parts.length !== 0 ||
      right_wrong_parts.length !== 0
  ){
    loc_3 = "LMR".replace(loc_1 as string, '').replace(loc_2 as string, '');
    if (loc_3 == 'L' && left_wrong_parts.length > 0) {
      shape_3 = left_wrong_parts.slice(0,1);
    } else if (loc_3 == 'M' && middle_wrong_parts.length > 0) {
      shape_3 = middle_wrong_parts.slice(0,1);
    } else if (loc_3 == 'R' && right_wrong_parts.length > 0) {
      shape_3 = right_wrong_parts.slice(0,1);
    }

    console.log(`after step 3 - chose ${shape_3}${loc_3}`)
    console.log(`left_has: ${left_has} left_goal: ${left_goal} left_wrong_parts: ${left_wrong_parts}`);
    console.log(`middle_has: ${middle_has} middle_goal: ${middle_goal} middle_wrong_parts: ${middle_wrong_parts}`);
    console.log(`right_has: ${right_has} right_goal: ${right_goal} right_wrong_parts: ${right_wrong_parts}`);

    if (loc_3 === "L") {
      if(
          middle_wrong_parts.length &&
          middle_goal.includes(shape_3 as string) &&
          !middle_has.includes(shape_3 as string)
      ) {
        shape_4 = middle_wrong_parts.slice(0,1);
        loc_4 = "M";
        middle_wrong_parts = middle_wrong_parts.replace(shape_4, '');
        middle_has = middle_has.replace(shape_4, shape_3 as string).split("").sort().join("");
      } else {
        shape_4 = right_wrong_parts.slice(0,1);
        loc_4 = "R";
        right_wrong_parts = right_wrong_parts.replace(shape_4, '');
        right_has = right_has.replace(shape_4, shape_3 as string).split("").sort().join("");
      }
    } else if (loc_3 === "M") {
      if(
          left_wrong_parts.length &&
          left_goal.includes(shape_3 as string) &&
          !left_has.includes(shape_3 as string)
      ) {
        shape_4 = left_wrong_parts.slice(0,1);
        loc_4 = "L";
        left_wrong_parts = left_wrong_parts.replace(shape_4, '');
        left_has = left_has.replace(shape_4, shape_3 as string).split("").sort().join("");
      } else {
        shape_4 = right_wrong_parts.slice(0,1);
        loc_4 = "R";
        right_wrong_parts = right_wrong_parts.replace(shape_4, '');
        right_has = right_has.replace(shape_4, shape_3 as string).split("").sort().join("");
      }
    } else {
      if(
          left_wrong_parts.length &&
          left_goal.includes(shape_3 as string) &&
          !left_has.includes(shape_3 as string)
      ) {
        shape_4 = left_wrong_parts.slice(0,1);
        loc_4 = "L";
        left_wrong_parts = left_wrong_parts.replace(shape_4, '');
        left_has = left_has.replace(shape_4, shape_3 as string).split("").sort().join("");
      } else {
        shape_4 = middle_wrong_parts.slice(0,1);
        loc_4 = "M";
        middle_wrong_parts = middle_wrong_parts.replace(shape_4, '');
        middle_has = middle_has.replace(shape_4, shape_3 as string).split("").sort().join("");
      }
    }

    if (loc_3 === "L"){
      left_has = left_has.replace(shape_3 as string, shape_4).split("").sort().join("");
    } else if (loc_3 === "M"){
      middle_has = middle_has.replace(shape_3 as string, shape_4).split("").sort().join("");
    } else {
      right_has = right_has.replace(shape_3 as string, shape_4).split("").sort().join("");
    }

    left_wrong_parts = findWrongParts(left_has, left_goal);
    middle_wrong_parts = findWrongParts(middle_has, middle_goal);
    right_wrong_parts = findWrongParts(right_has, right_goal);

    console.log(`after step 4 - chose ${shape_4}${loc_4}`)
    console.log(`left_has: ${left_has} left_goal: ${left_goal} left_wrong_parts: ${left_wrong_parts}`);
    console.log(`middle_has: ${middle_has} middle_goal: ${middle_goal} middle_wrong_parts: ${middle_wrong_parts}`);
    console.log(`right_has: ${right_has} right_goal: ${right_goal} right_wrong_parts: ${right_wrong_parts}`);
  }

  if( left_wrong_parts.length + middle_wrong_parts.length > 0){
    // do a final swap
    if (left_wrong_parts.length > 0){
      if (middle_wrong_parts.length > 0){
        //swap left and mid
        shape_5 = left_wrong_parts.slice(0,1);
        loc_5 = "L";
        shape_6 = middle_wrong_parts.slice(0,1);
        loc_6 = "M";
        left_has = left_has.replace(shape_6, shape_5).split("").sort().join("");
        middle_has = middle_has.replace(shape_5, shape_6).split("").sort().join("");
      } else {
        // swap left and right
        shape_5 = left_wrong_parts.slice(0,1);
        loc_5 = "L";
        shape_6 = right_wrong_parts.slice(0,1);
        loc_6 = "R";
        left_has = left_has.replace(shape_6, shape_5).split("").sort().join("");
        right_has = right_has.replace(shape_5, shape_6).split("").sort().join("");
      }
    } else {
      // swap mid and right
      shape_5 = middle_wrong_parts.slice(0,1);
      loc_5 = "M";
      shape_6 = right_wrong_parts.slice(0,1);
      loc_6 = "R";
      middle_has = middle_has.replace(shape_6, shape_5).split("").sort().join("");
      right_has = right_has.replace(shape_5, shape_6).split("").sort().join("");
    }

    left_wrong_parts = findWrongParts(left_has, left_goal);
    middle_wrong_parts = findWrongParts(middle_has, middle_goal);
    right_wrong_parts = findWrongParts(right_has, right_goal);

    console.log(`after step 5/6 - chose ${shape_5}${loc_5} and ${shape_6}${loc_6}`);
    console.log(`left_has: ${left_has} left_goal: ${left_goal} left_wrong_parts: ${left_wrong_parts}`);
    console.log(`middle_has: ${middle_has} middle_goal: ${middle_goal} middle_wrong_parts: ${middle_wrong_parts}`);
    console.log(`right_has: ${right_has} right_goal: ${right_goal} right_wrong_parts: ${right_wrong_parts}`);
  }

  generateOutput(
      shape_1 as shape2d | undefined,
      loc_1 as shapePosition | undefined,
      shape_2 as shape2d | undefined,
      loc_2 as shapePosition | undefined,
      shape_3 as shape2d | undefined,
      loc_3 as shapePosition | undefined,
      shape_4 as shape2d | undefined,
      loc_4 as shapePosition | undefined,
      shape_5 as shape2d | undefined,
      loc_5 as shapePosition | undefined,
      shape_6 as shape2d | undefined,
      loc_6 as shapePosition | undefined
  );
}

function setInsideShape(pos: number, shape: shape2d|null): void {
  if ( pos == 0 ) {
    leftInside["shape"] = shape;
  } else if ( pos == 1 ) {
    middleInside["shape"] = shape;
  } else if ( pos == 2) {
    rightInside["shape"] = shape;
  }
}

function setInsideState(pos: number, state: number|null): void {
  if ( pos == 0 ) {
    leftInside["state"] = state;
  } else if ( pos == 1 ) {
    middleInside["state"] = state;
  } else if ( pos == 2) {
    rightInside["state"] = state;
  }
}

function validateInside(): boolean {
  let counts: {
    "C": Array<number>,
    "S": Array<number>,
    "T": Array<number>
  } = {
    "C": [],
    "S": [],
    "T": []
  };
  let valid: boolean = true;

  for (let index: number = 0; index <= 2; index++){
    setInsideState(index, 1);
    const shape = getInside(index)["shape"];
    if (shape != null) {
      counts[shape as keyof typeof counts].push(index);
    } else {
      valid = false;
    }
  }

  if (counts["C"].length > 1) {
    valid = false;
    for (const pos of counts["C"]){
      setInsideState(pos, 2);
    }
  } else if (counts["S"].length > 1) {
    valid = false;
    for (const pos of counts["S"]){
      setInsideState(pos, 2);
    }
  } else if (counts["T"].length > 1) {
    valid = false;
    for (const pos of counts["T"]){
      setInsideState(pos, 2);
    }
  }

  return valid;
}

function updateInside(pos: number, shape: shape2d): void{
  if (getInside(pos)["shape"] == shape){
    // unselect
    setInsideShape(pos, null);
  } else {
    // set the shape and state
    setInsideShape(pos, shape)
    setInsideState(pos, 1);
  }
  if (validateInside() && validateOutside()) {
    processSelections()
  } else {
    wave1.value = "";
    wave2.value = "";
  }
}

function setOutsideShape(pos: number, shape: shape3d|null): void {
  if ( pos == 0 ) {
    leftOutside["shape"] = shape;
  } else if ( pos == 1 ) {
    middleOutside["shape"] = shape;
  } else if ( pos == 2) {
    rightOutside["shape"] = shape;
  }
}

function setOutsideState(pos: number, state: number|null): void {
  if ( pos == 0 ) {
    leftOutside["state"] = state;
  } else if ( pos == 1 ) {
    middleOutside["state"] = state;
  } else if ( pos == 2) {
    rightOutside["state"] = state;
  }
}

function validateOutside(): boolean {
  let letters: string = "";
  let valid: boolean = true;

  for (let index: number = 0; index <= 2; index++){
    setOutsideState(index, 1);
    const shape = getOutside(index)["shape"];
    if (shape != null) {
      letters += shape;
    } else {
      valid = false;
    }
  }

  if ((letters.match(/C/g)||[]).length > 2) {
    valid = false;
    for (let index: number = 0; index <= 2; index++){
      const shape = getOutside(index)["shape"];
      if (shape != null) {
        if (shape == "CC" || shape == "CS" || shape == "CT") {
          setOutsideState(index, 2);
        }
      }
    }
  } else if ((letters.match(/S/g)||[]).length > 2) {
    valid = false;
    for (let index: number = 0; index <= 2; index++){
      const shape = getOutside(index)["shape"];
      if (shape != null) {
        if (shape == "SS" || shape == "CS" || shape == "ST") {
          setOutsideState(index, 2);
        }
      }
    }
  } else if ((letters.match(/T/g)||[]).length > 2) {
    valid = false;
    for (let index: number = 0; index <= 2; index++){
      const shape = getOutside(index)["shape"];
      if (shape != null) {
        if (shape == "TT" || shape == "ST" || shape == "CT") {
          setOutsideState(index, 2);
        }
      }
    }
  }

  return valid;
}

function updateOutside(pos: number, shape: shape3d): void {
  if (getOutside(pos)["shape"] == shape){
    // unselect
    setOutsideShape(pos, null);
  } else {
    // set the shape and state
    setOutsideShape(pos, shape)
    setOutsideState(pos, 1);
  }
  if (validateOutside() && validateInside()) {
    processSelections()
  } else {
    wave1.value = "";
    wave2.value = "";
  }
}

function copyWave(number: number): void {
  if (number == 1) {
    navigator.clipboard.writeText(wave1.value);
  } else if (number == 2) {
    navigator.clipboard.writeText(wave2.value);
  }
}
</script>

<template>
<div class="text-gray-600 bg-gray-200 dark:bg-gray-800 dark:text-gray-300 rounded-b-lg flex flex-col grow justify-around min-h-fit max-h-5/6 min-w-fit">
  <div>
    <h2 class="text-center p-2 text-lg">Inside:</h2>
    <div class="flex justify-around flex-nowrap">
      <div>
        <h3 class="text-center text-lg">Left</h3>
        <Shape2dOptions
          :selections="leftInside"
          @shapeSelected="updateInside(0, $event)"
        />
      </div>
      <div>
        <h3 class="text-center text-lg">Middle</h3>
        <Shape2dOptions
            :selections="middleInside"
            @shapeSelected="updateInside(1, $event)"
        />
      </div>
      <div>
        <h3 class="text-center text-lg">Right</h3>
        <Shape2dOptions
            :selections="rightInside"
            @shapeSelected="updateInside(2, $event)"
        />
      </div>
    </div>
  </div>
  <div>
    <h2 class="text-center p-2 text-lg">Outside:</h2>
    <div class="flex justify-around flex-nowrap">
      <div>
        <h3 class="text-center text-lg">Left</h3>
        <Shape3dOptions
            :selections="leftOutside"
            @shapeSelected="updateOutside(0, $event)"
        />
      </div>
      <div>
        <h3 class="text-center text-lg">Middle</h3>
        <Shape3dOptions
            :selections="middleOutside"
            @shapeSelected="updateOutside(1, $event)"
        />
      </div>
      <div>
        <h3 class="text-center text-lg">Right</h3>
        <Shape3dOptions
            :selections="rightOutside"
            @shapeSelected="updateOutside(2, $event)"
        />
      </div>
    </div>
  </div>
  <div>
    <h2 class="text-center p-2 text-lg">Output:</h2>
    <ol class="flex flex-col justify-around align-middle flex-nowrap">
      <li class="p-2 mx-auto">
        <input v-model="wave1" type="text" class="h-[40.5px] w-[50vw] text-black pl-2 font-bold"/>
        <button type="button" class="rounded border m-2 p-2" @click="copyWave(1)">Copy</button>
      </li>
      <li class="p-2 mx-auto">
        <input v-model="wave2" type="text" class="h-[40.5px] w-[50vw] text-black pl-2 font-bold disabled"/>
        <button type="button" class="rounded border m-2 p-2" @click="copyWave(2)">Copy</button>
      </li>
    </ol>
  </div>
</div>
</template>

<style scoped>
</style>