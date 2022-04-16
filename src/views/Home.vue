<template>
  <a-layout >
      
    <a-carousel
      arrows
      autoplay
      
    >
      <template #prevArrow>
        <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
          <left-circle-outlined />
        </div>
      </template>
      <template #nextArrow>
        <div class="custom-slick-arrow" style="right: 10px">
          <right-circle-outlined />
        </div>
      </template>
      <div><img src="../assets/homewp.jpg" /></div>
      <div><img src="../assets/homewp.jpg" /></div>
      <div><img src="../assets/homewp.jpg" /></div>
      <div><img src="../assets/homewp.jpg" /></div>
    </a-carousel>
        <a-layout-content style="padding: 0 50px">
        <div class="container">
      
        <h1>En proceso....</h1>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script>
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons-vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    LeftCircleOutlined,
    RightCircleOutlined,
  },
});
</script>

<style scoped>
/* For demo */
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: 500px;
  line-height: 500px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
  z-index: 1;
}
.ant-carousel :deep(.custom-slick-arrow:before) {
  display: none;
}
.ant-carousel :deep(.custom-slick-arrow:hover) {
  opacity: 0.5;
}

.ant-carousel :deep(.slick-slide img) {
  display: block;
  margin: auto;
}
.container {
  background: "#fff";
  padding: 24px;
  min-height: calc(100vh - 700px)
}
</style>
