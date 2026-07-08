(function () {
  const PathSampler = window.PathSampler;

  const CELTIC_PATHS = {
    fourLobe: PathSampler.parametricToPath((t) => {
      const radius = 0.58 + 0.42 * Math.cos(4 * t);
      return {
        x: 50 + 24 * radius * Math.cos(t),
        y: 50 + 24 * radius * Math.sin(t),
      };
    }),
    wovenTriquetra: PathSampler.parametricToPath((t) => ({
      x: 50 + 10.5 * (Math.sin(t) + 2 * Math.sin(2 * t) + 0.55 * Math.sin(3 * t)),
      y: 50 + 10.5 * (Math.cos(t) - 2 * Math.cos(2 * t) - 0.55 * Math.cos(3 * t)),
    })),
  };

  window.CELTIC_ROW1_CURVES = [
    PathSampler.createPathCurve({
      name: "Four-Lobe Knot",
      tag: "Quatrefoil Path",
      descriptionEn:
        "Four rounded loops meet at the center like overlapping circles. Math: r(t) = 0.58 + 0.42 cos 4t, x = 24r cos t, y = 24r sin t (four-petal rose / polar rose).",
      descriptionZh:
        "四枚圆环在中心交叠的四叶结。公式：r(t) = 0.58 + 0.42 cos 4t，x = 24r cos t，y = 24r sin t（四瓣玫瑰线）。",
      pathD: CELTIC_PATHS.fourLobe,
      rotate: true,
      particleCount: 76,
      trailSpan: 0.36,
      durationMs: 5800,
      rotationDurationMs: 32000,
      pulseDurationMs: 4800,
      strokeWidth: 5,
      breathe: 0.12,
      targetSize: 76,
    }),
    PathSampler.createPathCurve({
      name: "Woven Triquetra",
      tag: "Interlaced Trefoil",
      descriptionEn:
        "A denser triquetra with tighter inner crossings. Math: x = a(sin t + 2 sin 2t + 0.55 sin 3t), y = a(cos t − 2 cos 2t − 0.55 cos 3t), a = 10.5 (trefoil + 3rd harmonic).",
      descriptionZh:
        "更密编织的三叶结。公式：x = a(sin t + 2 sin 2t + 0.55 sin 3t)，y = a(cos t − 2 cos 2t − 0.55 cos 3t)，a = 10.5（三叶结 + 三次谐波）。",
      pathD: CELTIC_PATHS.wovenTriquetra,
      rotate: true,
      particleCount: 80,
      trailSpan: 0.35,
      durationMs: 6000,
      rotationDurationMs: 34000,
      pulseDurationMs: 5000,
      strokeWidth: 4.9,
      breathe: 0.13,
      targetSize: 72,
    }),
  ];

  window.CELTIC_PATHS = CELTIC_PATHS;
})();
