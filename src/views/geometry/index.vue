<template>
  <el-container>
    <el-main style="padding: 0">
      <div id="container" ref="containerRef"></div>
      <router-view :group="group" />
    </el-main>
    <el-footer>
      代码样例
    </el-footer>
  </el-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const containerRef = ref(null)
const controlsRef = ref(null)

// 创建场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x444444);

// 创建相机
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.set(8, 16, 40)

// 创建坐标系
const axesHelper = new THREE.AxesHelper(20)
scene.add(axesHelper)

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染器的背景色
renderer.setClearColor(new THREE.Color(0x000000))

// 初始化轨道控制器
controlsRef.value = new OrbitControls(camera, renderer.domElement)
controlsRef.value.target = new THREE.Vector3(8, 8, 8)
controlsRef.value.update()

// 创建光源
const lights = [];
lights[0] = new THREE.DirectionalLight(0xffffff, 3);
lights[1] = new THREE.DirectionalLight(0xffffff, 3);
lights[2] = new THREE.DirectionalLight(0xffffff, 3);
lights[0].position.set(0, 200, 0);
lights[1].position.set(100, 200, 100);
lights[2].position.set(-100, -200, -100);
scene.add(lights[0]);
scene.add(lights[1]);
scene.add(lights[2]);

// 创建物体组
const group = new THREE.Group()
group.position.set(8, 8, 8)
scene.add(group)

// 持续渲染
const animate = () => {
  // ** 轨道控制器需要动画支持 **
  // requestAnimationFrame 是 js 内置的函数，用来控制动画的刷新频率
  // 这里的 animate 函数就是每隔一段时间执行一次，然后调用 renderer.render 方法渲染场景
  requestAnimationFrame(animate)

  group.rotation.x += 0.005;
  group.rotation.y += 0.005;

  renderer.render(scene, camera)
}

onMounted(() => {
  // 设置相机分辨率
  camera.aspect = containerRef.value.clientWidth / containerRef.value.clientHeight
  camera.updateProjectionMatrix()
  // 设置渲染器大小
  renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
  // 将渲染器的输出添加到DOM元素中
  containerRef.value.appendChild(renderer.domElement)

  // ** 开始渲染 **
  // renderer.render(scene, camera)

  animate()
})
</script>

<style scoped lang="less">

#container {
  width: 100%;
  height: 100%;
}
</style>
<style>
.lil-gui.autoPlace {
  top: 80px;
  right: 20px;
}
</style>
