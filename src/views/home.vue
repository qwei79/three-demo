<template>
  <div class="common-layout">
    <el-container>
      <el-header>THREE 基础样例</el-header>
      <el-container>
        <el-aside width="160px">
          <Nav />
        </el-aside>
        <el-container>
          <el-main>
            <router-view />
          </el-main>
          <el-footer height="40px">
            <el-text>
              源码就在：
              <el-link
                type="primary"
                href="https://github.com/qwei79"
              >
                https://github.com/qwei79
              </el-link>
            </el-text>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Nav from '@/components/Nav.vue'
</script>

<style scoped lang="less">
.common-layout {
  background: #f5f5f5;
  height: 100vh;
  :deep(.el-container) {
    height: 100%;
    .el-header {
      background: #c6e2ff;
    }
    .el-aside {
      background: #d9ecff;
    }
  }
}
</style>
<style>
.lil-gui.autoPlace {
  top: 80px;
  right: 20px;
}
</style>
