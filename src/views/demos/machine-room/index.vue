<template>
  <div class="machine-room">
    <div id="container" ref="containerRef" @mousemove="mouseMove"></div>
    <div
      id="plane"
      :style="{
        left: state.planePos.left,
        top: state.planePos.top,
        display: state.planeDisplay
      }"
    >
      <p>机柜名称：{{state.curCabinet.name}}</p>
      <p>机柜温度：{{state.curCabinet.temperature}}°</p>
      <p>
        使用情况：{{state.curCabinet.count}}/{{state.curCabinet.capacity}}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import MachineRoom from './component/machine'

const containerRef = ref(null)
let room = null

const state = reactive({
  //信息面板的位置
  planePos: {
    left: 0,
    top: 0,
  },
  // 信息面板的可见性
  planeDisplay: "none",
  // 当前机柜的详细信息
  curCabinet: {
    // 名称
    name: "Loading……",
    // 温度
    temperature: 0,
    // 容量
    capacity: 0,
    // 服务器数量
    count: 0,
  },
});

const mouseMove = (ev) => {
  const { offsetX, offsetY } = ev
  room.selectCabinet(offsetX, offsetY)
}

const onMouseOverCabinet = ({ name }) => {
  state.planeDisplay = "block";
  // 基于cabinet.name 获取机柜数据
  // getCabinetByName(name).then((res) => {
  //   // todo 更新机柜信息
  // });
}
const onMouseMoveCabinet = (left, top) => {
  state.planePos = { left: left + 'px', top: top + 'px' }
};
const onMouseOutCabinet = () => {
  state.planeDisplay = "none";
};
onMounted(() => {
  if (containerRef.value) {
    room = new MachineRoom(containerRef.value)
    room.loadGLTF('machineRoom.gltf')
    room.animate()

    //当鼠标划入机柜，显示信息面板
    room.onMouseOverCabinet = onMouseOverCabinet;
    //当鼠标在机柜上移动，让信息面板随鼠标移动
    room.onMouseMoveCabinet = onMouseMoveCabinet;
    //当鼠标划出机柜，隐藏信息面板
    room.onMouseOutCabinet = onMouseOutCabinet;
  }
})
</script>

<style scoped lang="less">
.machine-room {
  position: relative;
}
.machine-room, #container {
  width: 100%;
  height: 100%;
}
#plane {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.5);
  color: #fff;
  padding: 0 18px;
  transform: translate(16px, calc(-100% - 16px));
  display: none;
}
</style>
