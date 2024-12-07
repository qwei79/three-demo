<template></template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { createGroupGeometry, updateGroupGeometry } from '@/utils';

const props = defineProps({
  scene: {
    type: Object,
    default: () => null
  },
  group: {
    type: Object,
    default: () => null
  },
});

// 创建一个立方体几何体
const geometry = new THREE.BoxGeometry( 5, 5, 5 );

const data = {
  width: 5,
  height: 5,
  depth: 5,
  widthSegments: 1,
  heightSegments: 1,
  depthSegments: 1
};

function generateGeometry() {
  updateGroupGeometry( props.group,
    new THREE.BoxGeometry(
      data.width,
      data.height,
      data.depth,
      data.widthSegments,
      data.heightSegments,
      data.depthSegments,
    )
  );
}

const gui = new GUI();
gui.add( data, 'width', 1, 30 ).onChange( generateGeometry );
gui.add( data, 'height', 1, 30 ).onChange( generateGeometry );
gui.add( data, 'depth', 1, 30 ).onChange( generateGeometry );
gui.add( data, 'widthSegments', 1, 10 ).step( 1 ).onChange( generateGeometry );
gui.add( data, 'heightSegments', 1, 10 ).step( 1 ).onChange( generateGeometry );
gui.add( data, 'depthSegments', 1, 10 ).step( 1 ).onChange( generateGeometry );

onMounted(() => {
  createGroupGeometry(props.group, geometry)
})

onBeforeUnmount(() => {
  gui.destroy();
  props.group.remove(...props.group.children)
})
</script>

<style scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>