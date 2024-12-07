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

// 创建一个球
const geometry = new THREE.SphereGeometry( 5, 10, 8 );

const twoPi = Math.PI * 2;
const data = {
  radius: 5,
  widthSegments: 10,
  heightSegments: 8,
  phiStart: 0,
  phiLength: twoPi,
  thetaStart: 0,
  thetaLength: Math.PI
};

function generateGeometry() {
  updateGroupGeometry( props.group,
    new THREE.SphereGeometry(
      data.radius,
      data.widthSegments,
      data.heightSegments,
      data.phiStart,
      data.phiLength,
      data.thetaStart,
      data.thetaLength,
    )
  );
}

const gui = new GUI();
gui.add( data, 'radius', 1, 30 ).onChange( generateGeometry );
gui.add( data, 'widthSegments', 3, 64 ).step( 1 ).onChange( generateGeometry );
gui.add( data, 'heightSegments', 2, 32 ).step( 1 ).onChange( generateGeometry );
gui.add( data, 'phiStart', 0, twoPi ).onChange( generateGeometry );
gui.add( data, 'phiLength', 0, twoPi ).onChange( generateGeometry );
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
