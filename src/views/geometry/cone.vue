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

// 创建一个棱锥几何体
const geometry = new THREE.ConeGeometry( 5, 10, 8 );

const twoPi = Math.PI * 2;
const data = {
  radius: 5,
  height: 10,
  radialSegments: 8,
  heightSegments: 1,
  openEnded: false,
  thetaStart: 0,
  thetaLength: twoPi
};

function generateGeometry() {
  updateGroupGeometry( props.group,
    new THREE.ConeGeometry(
      data.radius,
      data.height,
      data.radialSegments,
      data.heightSegments,
      data.openEnded,
      data.thetaStart,
      data.thetaLength
    )
  );
}

const gui = new GUI();
gui.add( data, 'radius', 0, 30 ).onChange( generateGeometry );
gui.add( data, 'height', 1, 50 ).onChange( generateGeometry );
gui.add( data, 'radialSegments', 3, 64 ).step( 1 ).onChange( generateGeometry );
gui.add( data, 'heightSegments', 1, 64 ).step( 1 ).onChange( generateGeometry );
gui.add( data, 'openEnded' ).onChange( generateGeometry );
gui.add( data, 'thetaStart', 0, twoPi ).onChange( generateGeometry );
gui.add( data, 'thetaLength', 0, twoPi ).onChange( generateGeometry );

onMounted(() => {
  createGroupGeometry(props.group, geometry)
})

onBeforeUnmount(() => {
  gui.destroy();
  props.group.remove(...props.group.children)
})

</script>
