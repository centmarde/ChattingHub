<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns:svgjs="http://svgjs.dev/svgjs"
    width="1440"
    height="700"
    preserveAspectRatio="none"
    viewBox="0 0 1440 700"
  >
    <g mask='url("#SvgjsMask1221")' fill="none">
      <rect
        width="1440"
        height="700"
        x="0"
        y="0"
        fill='url("#SvgjsLinearGradient1222")'
      ></rect>
      <path
        d="M142.9 327.52 a148.56 148.56 0 1 0 297.12 0 a148.56 148.56 0 1 0 -297.12 0z"
        fill="rgba(28, 83, 142, 0.4)"
        class="triangle-float2"
      ></path>
      <path
        d="M260 399.01 a136.42 136.42 0 1 0 272.84 0 a136.42 136.42 0 1 0 -272.84 0z"
        fill="rgba(28, 83, 142, 0.4)"
        class="triangle-float2"
      ></path>
      <path
        d="M1252.97 597.99 a159.26 159.26 0 1 0 318.52 0 a159.26 159.26 0 1 0 -318.52 0z"
        fill="rgba(28, 83, 142, 0.4)"
        class="triangle-float3"
      ></path>
      <path
        d="M120.6 93.22 a228.75 228.75 0 1 0 457.5 0 a228.75 228.75 0 1 0 -457.5 0z"
        fill="rgba(28, 83, 142, 0.4)"
        class="triangle-float2"
      ></path>
      <path
        d="M1080.02 226.24 a146.88 146.88 0 1 0 293.76 0 a146.88 146.88 0 1 0 -293.76 0z"
        fill="rgba(28, 83, 142, 0.4)"
        class="triangle-float2"
      ></path>
      <path
        d="M804.34 688.73 a226.97 226.97 0 1 0 453.94 0 a226.97 226.97 0 1 0 -453.94 0z"
        fill="rgba(28, 83, 142, 0.4)"
        class="triangle-float3"
      ></path>
      <path
        d="M642.23 176.05 a168.94 168.94 0 1 0 337.88 0 a168.94 168.94 0 1 0 -337.88 0z"
        fill="rgba(28, 83, 142, 0.4)"
        class="triangle-float3"
      ></path>
    </g>
    <defs>
      <mask id="SvgjsMask1221">
        <rect width="1440" height="700" fill="#ffffff"></rect>
      </mask>
      <linearGradient
        x1="12.85%"
        y1="-26.43%"
        x2="87.15%"
        y2="126.43%"
        gradientUnits="userSpaceOnUse"
        id="SvgjsLinearGradient1222"
      >
        <stop stop-color="#0e2a47" offset="0"></stop>
        <stop stop-color="#00459e" offset="1"></stop>
      </linearGradient>
    </defs>
  </svg>
</template>

<script>
export default {
  name: "BackgroundSvg",
};
</script>

<style>
@keyframes float1 {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-10px, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}

.triangle-float1 {
  animation: float1 5s infinite;
}

@keyframes float2 {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-5px, -5px);
  }
  100% {
    transform: translate(0, 0);
  }
}

.triangle-float2 {
  animation: float2 4s infinite;
}

@keyframes float3 {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, -10px);
  }
  100% {
    transform: translate(0, 0);
  }
}

.triangle-float3 {
  animation: float3 6s infinite;
}
</style>
