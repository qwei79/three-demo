<template></template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { createGroupGeometry, updateGroupGeometry } from '@/utils';

const props = defineProps({
  group: {
    type: Object,
    default: () => null
  },
});

// 创建一个环
const geometry = new THREE.TorusGeometry( 6, 3, 6 );

const twoPi = Math.PI * 2;
const data = {
  radius: 6,
  tube: 3,
  radialSegments: 6,
  tubularSegments: 20,
  arc: twoPi
};

function generateGeometry() {
  updateGroupGeometry( props.group,
    new THREE.TorusGeometry(
      data.radius,
      data.tube,
      data.radialSegments,
      data.tubularSegments,
      data.arc,
    )
  );
}

const gui = new GUI();
gui.add( data, 'radius', 1, 20 ).onChange( generateGeometry );
gui.add( data, 'tube', 0.1, 10 ).onChange( generateGeometry );
gui.add( data, 'radialSegments', 2, 30 ).step( 1 ).onChange( generateGeometry );
gui.add( data, 'tubularSegments', 3, 200 ).step( 1 ).onChange( generateGeometry );
gui.add( data, 'arc', 0.1, twoPi ).onChange( generateGeometry );

onMounted(() => {
  createGroupGeometry(props.group, geometry)
})

onBeforeUnmount(() => {
  gui.destroy();
  props.group.remove(...props.group.children)
})

</script>
