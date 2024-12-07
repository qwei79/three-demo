<template>
  <el-menu
    router
    default-active="/base"
    :default-openeds="['/base']"
  >
    <el-menu-item index="/base">基础场景</el-menu-item>
    <el-sub-menu index="/geometry">
      <template #title>
        <el-icon><Cpu /></el-icon>
        <span>几何体</span>
      </template>
      <el-menu-item index="/geometry/box">立方体</el-menu-item>
      <el-menu-item index="/geometry/cone">锥体</el-menu-item>
      <el-menu-item index="/geometry/sphere">球体</el-menu-item>
      <el-menu-item index="/geometry/torus">环</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="/demos">
      <template #title>
        <el-icon><HotWater /></el-icon>
        <span>样例</span>
      </template>
      <el-menu-item index="/demos/machineRoom">数字机房</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
