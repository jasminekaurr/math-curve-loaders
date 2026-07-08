(function () {
  const PATH_SAMPLER_NS = "http://www.w3.org/2000/svg";

  function normalizeProgress(progress) {
    return ((progress % 1) + 1) % 1;
  }

  function parametricToPath(fn, steps = 480) {
    let pathD = "";
    for (let index = 0; index <= steps; index += 1) {
      const t = (index / steps) * Math.PI * 2;
      const point = fn(t);
      pathD += `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
    }
    return `${pathD} Z`;
  }

  function createPathSampler(pathD, options = {}) {
    const {
      samples = 512,
      breathe = 0.12,
      targetSize = 72,
      center = { x: 50, y: 50 },
    } = options;

    const svg = document.createElementNS(PATH_SAMPLER_NS, "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.style.position = "absolute";
    svg.style.visibility = "hidden";
    svg.style.pointerEvents = "none";

    const path = document.createElementNS(PATH_SAMPLER_NS, "path");
    path.setAttribute("d", pathD);
    svg.appendChild(path);
    document.body.appendChild(svg);

    const bbox = path.getBBox();
    const width = bbox.width || 1;
    const height = bbox.height || 1;
    const maxDim = Math.max(width, height);
    const fitScale = targetSize / maxDim;
    const sourceCenterX = bbox.x + width / 2;
    const sourceCenterY = bbox.y + height / 2;
    const totalLength = path.getTotalLength();

    const normalized = Array.from({ length: samples + 1 }, (_, index) => {
      const point = path.getPointAtLength((index / samples) * totalLength);
      return {
        x: center.x + (point.x - sourceCenterX) * fitScale,
        y: center.y + (point.y - sourceCenterY) * fitScale,
      };
    });

    document.body.removeChild(svg);

    const arcLengths = [0];
    for (let index = 1; index < normalized.length; index += 1) {
      const dx = normalized[index].x - normalized[index - 1].x;
      const dy = normalized[index].y - normalized[index - 1].y;
      arcLengths.push(arcLengths[index - 1] + Math.hypot(dx, dy));
    }

    const loopLength = arcLengths[arcLengths.length - 1] || 1;

    function point(progress, detailScale) {
      const breatheScale = 1 + (detailScale - 0.76) * breathe;
      const target = normalizeProgress(progress) * loopLength;

      let index = 1;
      while (index < arcLengths.length && arcLengths[index] < target) {
        index += 1;
      }

      const previous = arcLengths[index - 1];
      const segmentLength = arcLengths[index] - previous || 1;
      const fraction = (target - previous) / segmentLength;
      const start = normalized[index - 1];
      const end = normalized[index] ?? normalized[0];
      const x = start.x + (end.x - start.x) * fraction;
      const y = start.y + (end.y - start.y) * fraction;

      return {
        x: center.x + (x - center.x) * breatheScale,
        y: center.y + (y - center.y) * breatheScale,
      };
    }

    return { point, normalized };
  }

  function createPathCurve({
    pathD,
    breathe = 0.12,
    targetSize = 72,
    controls = [],
    ...meta
  }) {
    const sampler = createPathSampler(pathD, { breathe, targetSize });
    const pathControls = [
      { key: "breathe", labelEn: "Breathe", labelZh: "呼吸", min: 0, max: 0.35, step: 0.01 },
      { key: "targetSize", labelEn: "Size", labelZh: "尺寸", min: 52, max: 84, step: 1 },
      ...controls,
    ];

    return {
      ...meta,
      pathD,
      pathBased: true,
      breathe,
      targetSize,
      controls: pathControls,
      formula(config) {
        const preview = config.pathD.length > 140 ? `${config.pathD.slice(0, 140)}…` : config.pathD;
        return [
          "SVG centerline path:",
          preview,
          `breathe = ${config.breathe.toFixed(2)}`,
          `targetSize = ${config.targetSize.toFixed(0)}`,
          "s = detailScale(time)",
        ].join("\n");
      },
      point(progress, detailScale, config) {
        if (
          !config._pathSampler ||
          config._pathSamplerBreathe !== config.breathe ||
          config._pathSamplerSize !== config.targetSize
        ) {
          config._pathSampler = createPathSampler(config.pathD, {
            breathe: config.breathe,
            targetSize: config.targetSize,
          });
          config._pathSamplerBreathe = config.breathe;
          config._pathSamplerSize = config.targetSize;
        }

        return config._pathSampler.point(progress, detailScale);
      },
      _defaultSampler: sampler,
    };
  }

  window.PathSampler = {
    normalizeProgress,
    parametricToPath,
    createPathSampler,
    createPathCurve,
    getExportSource() {
      return [normalizeProgress, createPathSampler].map((fn) => fn.toString()).join("\n\n");
    },
  };
})();
