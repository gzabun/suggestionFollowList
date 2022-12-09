<template>
<footer class="footer-class">
 Copyright © 2022 <a href="https://gzabun.com/" target="_blank">gzabun</a>
</footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped lang="scss">
.footer-class{
  background: var(--body-background);
  height: 4rem;
  min-height: clamp(2rem,3.5vw,4rem);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 5px;
  @include fontCalculation(400,14,16,#5e6676);
  &:before{
    position: absolute;
    content: '';
    width: 60%;
    height: 2px;
    display: block;
    background: rgb(0 0 0 / 5%);
    margin: 0 auto;
    top: 5px;
   }
  a{
    font-weight: bold;
    color: inherit;
    text-decoration: none;
  }
}
</style>
