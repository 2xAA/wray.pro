<template>
  <canvas
    ref="canvasRef"
    :width="size"
    :height="size"
    style="margin-top: -2px; vertical-align: middle; margin-left: 0.3em"
  ></canvas>
</template>

<script setup>
const { date } = defineProps({
  date: Date,
});

const size = 16;

const canvasRef = ref("canvasRef");
const raf = null;

onMounted(() => {
  const backgroundColor = () =>
    getComputedStyle(document.documentElement).getPropertyValue(
      "--background-color",
    );

  const foregroundColor = () =>
    `color(display-p3 ${getComputedStyle(
      document.documentElement,
    ).getPropertyValue("--foreground-color-color")})`;

  const canvas = canvasRef.value;
  const context = canvas.getContext("2d", { colorSpace: "display-p3" });
  let dpr = 1;
  let radius = (size / 2) * dpr;
  let clockRadius = radius * 0.9;

  const resizeObserver = new ResizeObserver(() => {
    handleResize();
  });

  resizeObserver.observe(canvas.parentNode);

  const handleResize = () => {
    dpr = window.devicePixelRatio;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    radius = canvas.width / 2;
    clockRadius = radius * 0.9;
    drawClock();
  };

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => drawClock());

  // Draw the clock face
  function drawFace() {
    context.beginPath();
    context.lineWidth = 0.4 * dpr;
    context.arc(0, 0, clockRadius, 0, 2 * Math.PI);
    context.fillStyle = backgroundColor();
    context.fill();
    context.strokeStyle = foregroundColor();
    context.stroke();
  }

  function drawHand(pos, length, width) {
    context.beginPath();
    context.lineWidth = width * dpr;
    context.lineCap = "round";
    context.moveTo(0, 0);
    context.rotate(pos);
    context.lineTo(0, -length);
    context.stroke();
    context.rotate(-pos); // Restore rotation
  }

  function drawTime() {
    const hour = date.getHours() % 12;
    const minute = date.getMinutes();

    const hourPos = (hour * Math.PI) / 6 + (minute * Math.PI) / (6 * 60);
    drawHand(hourPos, clockRadius * 0.5, 0.8);

    const minutePos = (minute * Math.PI) / 30;
    drawHand(minutePos, clockRadius * 0.8, 0.8);
  }

  function drawTicks() {
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6;
      const isMajorTick = i % 3 === 0;

      const startX =
        Math.cos(angle) * clockRadius * (isMajorTick ? 0.58 : 0.65);
      const startY =
        Math.sin(angle) * clockRadius * (isMajorTick ? 0.58 : 0.65);
      const endX = Math.cos(angle) * clockRadius * 0.85;
      const endY = Math.sin(angle) * clockRadius * 0.85;

      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(endX, endY);
      context.lineWidth = 0.5 * dpr;
      context.strokeStyle = foregroundColor();
      context.stroke();
    }
  }

  function drawClock() {
    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.translate(radius, radius);
    drawFace();
    drawTicks();
    drawTime();
    context.restore();
  }

  handleResize();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
});
</script>
