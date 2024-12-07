<template>
  <el-container>
    <el-main>
      <div id="container" ref="containerRef"></div>
      <router-view :scene="scene" :camera="camera" :renderer="renderer" />
    </el-main>
    <el-footer>
      <el-button @click="addMesh">添加物体</el-button>
      <el-button @click="toggleMaterial">切换物体材质</el-button>
      <el-button @click="addAxesHelper">添加坐标轴</el-button>
      <el-button @click="addLight">添加灯光</el-button>
      <el-button @click="addPlane">添加平面</el-button>
      <el-button @click="toggleShadow">开关影子</el-button>
      
    </el-footer>
  </el-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const containerRef = ref(null)
const controlsRef = ref(null)

let mesh = null
const addMesh = () => {
  if (mesh) return;
  // 创建几何体
  const geometry = new THREE.BoxGeometry(4, 4, 4)
  // 创建材质
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  // 创建物体
  mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(2, 4, 2)

  // 将物体添加到场景中
  scene.add(mesh)
}
const toggleMaterial = () => {
  if (!mesh) return;
  if (mesh.material.isMeshBasicMaterial) {
    mesh.material = new THREE.MeshLambertMaterial({ color: 0xff0000 })
  } else {
    mesh.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  }
}

let axesHelper = null
const addAxesHelper = () => {
  if (axesHelper) return;
  // 创建坐标系
  axesHelper = new THREE.AxesHelper(20)
  scene.add(axesHelper)
}

const lights = [];
const addLight = () => {
  if (lights.length) return;
  // 创建光源
  lights[0] = new THREE.DirectionalLight(0xffffff, 0.5);
  lights[1] = new THREE.DirectionalLight(0xffffff, 0.5);
  lights[2] = new THREE.DirectionalLight(0xffffff, 0.5);
  lights[0].position.set(0, 200, 0);
  lights[1].position.set(100, 200, 100);
  lights[2].position.set(-100, -200, -100);


  // 第一个参数是颜色，第二个参数是光照强度，第三个参数是距离
  lights[3] = new THREE.SpotLight(0xffffff, 1000, 5000)
  lights[3].position.set(-3, 20, -5)

  lights.forEach(light => {
    scene.add(light);
  });
}

let plane = null
const addPlane = () => {
  if (plane) return;
  
  // 创建平面几何体
  const planeGeometry = new THREE.PlaneGeometry(20, 20)
  // 创建平面材质
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
  // 创建平面
  plane = new THREE.Mesh(planeGeometry, planeMaterial)
  // 默认是竖着的，放平
  plane.rotation.x = -Math.PI / 2

  // 放置到场景中
  scene.add(plane)
}

const toggleShadow = () => {
  renderer.shadowMap.enabled = !renderer.shadowMap.enabled

  if (plane) {
    plane.receiveShadow = renderer.shadowMap.enabled
  }

  if (mesh) {
    mesh.castShadow = renderer.shadowMap.enabled
  }

  if (lights.length) {
    lights.forEach(light => {
      light.castShadow = renderer.shadowMap.enabled
    })
  }
}


// 创建场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x444444);

// 创建相机
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.set(-30, 20, 30)

// 创建渲染器
const renderer = new THREE.WebGLRenderer()

// 初始化轨道控制器
controlsRef.value = new OrbitControls(camera, renderer.domElement)

// 持续渲染
const animate = () => {
  // ** 轨道控制器需要动画支持 **
  // requestAnimationFrame 是 js 内置的函数，用来控制动画的刷新频率
  // 这里的 animate 函数就是每隔一段时间执行一次，然后调用 renderer.render 方法渲染场景
  requestAnimationFrame(animate)

  renderer.render(scene, camera)
}

onMounted(() => {
  // 设置相机分辨率
  camera.aspect = containerRef.value.clientWidth / containerRef.value.clientHeight
  // 设置渲染器大小
  renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
  // 将渲染器的输出添加到DOM元素中
  containerRef.value.appendChild(renderer.domElement)

  // ** 开始渲染 **
  renderer.render(scene, camera)

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
