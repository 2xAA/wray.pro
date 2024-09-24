<template>
  <div class="scroller">
    <canvas
      ref="canvasRef"
      height="0"
      :style="{ display: mounted ? 'block' : 'none', opacity: faded ? 0.3 : 1 }"
    ></canvas>
    <component
      :is="componentName"
      ref="slotWrapper"
      :class="{ slot_wrapper: mounted }"
    >
      <slot />
    </component>
  </div>
</template>

<script setup>
const {
  message: partialMessage = "",
  matchSlotHeight,
  faded,
} = defineProps({
  message: {
    type: String,
    default: "",
  },
  matchSlotHeight: Boolean,
  usePageWidth: Boolean,
  faded: Boolean,
});

const componentName = "r-grid";

const slotWrapper = ref("slotWrapper");
const canvasRef = ref("canvasRef");
let raf = null;
const mounted = ref(false);
const reduceMotion = ref(false);
const resizeObserver = ref(null);

onMounted(() => {
  mounted.value = true;

  const backgroundColor = () =>
    getComputedStyle(document.documentElement).getPropertyValue(
      "--background-color",
    );

  const textColor = () =>
    `color(display-p3 ${getComputedStyle(
      document.documentElement,
    ).getPropertyValue("--foreground-color-color")} / 0.3)`;

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const canvas = canvasRef.value;
  const context = canvas.getContext("2d", { colorSpace: "display-p3" });
  let dpr = 1;
  let textSize = { width: 0 };
  const fontSize = 72 * 2;

  const textCanvas = document.createElement("canvas");
  const textContext = textCanvas.getContext("2d");

  resizeObserver.value = new ResizeObserver(() => {
    handleResize();
  });

  resizeObserver.value.observe(canvas.parentNode);

  const handleResize = () => {
    dpr = window.devicePixelRatio;

    canvas.width = canvas.parentNode.clientWidth * dpr;

    if (matchSlotHeight) {
      const { height } = slotWrapper.value.getBoundingClientRect();
      canvas.height = height * dpr;
    } else {
      // deliberately half the height
      canvas.height = canvas.parentNode.clientWidth * 0.5625;
    }

    canvas.style.width = "100%";

    drawText();
    if (reduceMotion.value) {
      loop(0);
    }
  };

  const setFont = () => {
    textContext.font = `720 ${fontSize}px "Inter Var", sans-serif`;
    textContext.textBaseline = "hanging";
    textContext.textAlign = "left";
    textContext.fillStyle = textColor();
  };

  const drawText = () => {
    setFont();
    textSize = textContext.measureText(`${partialMessage} `);

    textCanvas.width = textSize.width;
    textCanvas.height = fontSize;

    textContext.clearRect(0, 0, textCanvas.width, textCanvas.height);
    textContext.save();
    textContext.fillStyle = backgroundColor();
    textContext.fillRect(0, 0, textCanvas.width, textCanvas.height);
    textContext.restore();

    setFont();

    textContext.fillText(`${partialMessage} `, 0, 0);
  };

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => drawText());

  window
    .matchMedia("(prefers-reduced-motion: reduce)")
    .addEventListener("change", (e) => {
      reduceMotion.value = e.matches;
      if (!e.matches) {
        raf = requestAnimationFrame(loop);
      }
    });

  reduceMotion.value =
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

  let xPos = 0;
  const rowHeight = 15;
  const sinWidth = 80;

  function loop(timestamp = 0) {
    context.fillStyle = backgroundColor();
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.save();
    context.rotate((-25 * Math.PI) / 180);
    for (let x = -25; x < 25; x += 1) {
      for (let y = 0; y < 50; y += 1) {
        context.drawImage(
          textCanvas,
          x * textCanvas.width + (y % 2 === 0 ? xPos : -xPos),
          textCanvas.height * y,
        );
      }
    }
    context.restore();

    if (!isSafari) {
      for (let i = 0; i < canvas.height; i += rowHeight) {
        context.drawImage(
          canvas,
          Math.sin(i / 100 + timestamp / 1000) * sinWidth,
          i,
          canvas.width,
          rowHeight,
          -sinWidth,
          i,
          canvas.width + sinWidth * 2,
          rowHeight,
        );
      }
    }

    if (xPos < textSize.width) {
      xPos += 0.8;
    } else {
      xPos = 0;
    }

    if (!reduceMotion.value) {
      raf = requestAnimationFrame(loop);
    }
  }

  document.fonts.ready.then(() => {
    handleResize();
    raf = requestAnimationFrame(loop);
  });
});

onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
  resizeObserver.value.disconnect();
});
</script>

<style scoped>
.scroller {
  position: relative;
}

.slot_wrapper {
  position: absolute;
  top: 0;
}
</style>
