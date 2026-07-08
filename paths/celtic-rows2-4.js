(function () {
  const PathSampler = window.PathSampler;

  function celticCurve(spec) {
    return PathSampler.createPathCurve({
      rotate: true,
      particleCount: 74,
      trailSpan: 0.36,
      durationMs: 5700,
      rotationDurationMs: 32000,
      pulseDurationMs: 4700,
      strokeWidth: 5,
      breathe: 0.12,
      targetSize: 74,
      ...spec,
    });
  }

  const CELTIC_PATHS_2_4 = {
    shield: PathSampler.parametricToPath((t) => {
      const rx = 24 * (0.92 + 0.08 * Math.cos(2 * t));
      const ry = 30 * (0.85 - 0.2 * Math.sin(t));
      const yBias = 4 * Math.sin(t);
      return { x: 50 + rx * Math.sin(t), y: 50 + ry * Math.cos(t) + yBias };
    }),
    decorativeQuatrefoil: PathSampler.parametricToPath((t) => {
      const radius = 0.52 + 0.28 * Math.cos(4 * t) + 0.14 * Math.cos(8 * t);
      return { x: 50 + 23 * radius * Math.cos(t), y: 50 + 23 * radius * Math.sin(t) };
    }),
    circularTriskelion: PathSampler.parametricToPath((t) => ({
      x: 50 + 16 * Math.cos(t) + 9 * Math.cos(3 * t + Math.PI / 2),
      y: 50 + 16 * Math.sin(t) + 9 * Math.sin(3 * t + Math.PI / 2),
    })),
    squareKnot: PathSampler.parametricToPath((t) => {
      const mod = 0.72 + 0.28 * Math.cos(4 * t);
      return { x: 50 + 24 * mod * Math.cos(t), y: 50 + 24 * mod * Math.sin(t) };
    }),
    celticCross: PathSampler.parametricToPath((t) => {
      const limb = Math.max(Math.abs(Math.cos(t)), Math.abs(Math.sin(t)));
      const radius = 11 + 11 * limb;
      return { x: 50 + radius * Math.cos(t), y: 50 + radius * Math.sin(t) };
    }),
    verticalSerpentine: PathSampler.parametricToPath((t) => ({
      x: 50 + 11 * Math.sin(2 * t),
      y: 50 + 26 * Math.sin(t),
    })),
    tripleSpiral: PathSampler.parametricToPath((t) => {
      const radius = 11 + 10 * Math.pow((1 + Math.sin(3 * t)) / 2, 0.85);
      const wobble = 0.28 * Math.sin(3 * t);
      return {
        x: 50 + radius * Math.cos(t + wobble),
        y: 50 + radius * Math.sin(t + wobble),
      };
    }),
    fourPetal: PathSampler.parametricToPath((t) => {
      const radius = 0.48 + 0.52 * Math.pow(Math.abs(Math.cos(2 * t)), 0.65);
      return { x: 50 + 24 * radius * Math.cos(t), y: 50 + 24 * radius * Math.sin(t) };
    }),
    fiveFold: PathSampler.parametricToPath((t) => {
      const radius = 0.56 + 0.44 * Math.cos(5 * t);
      return { x: 50 + 23 * radius * Math.cos(t), y: 50 + 23 * radius * Math.sin(t) };
    }),
    serpentKnot: PathSampler.parametricToPath((t) => ({
      x: 50 + 16 * Math.sin(t) + 6 * Math.sin(3 * t) + 2 * Math.sin(5 * t),
      y: 50 - 8 * Math.cos(t) + 10 * Math.sin(2 * t) - 4 * Math.cos(3 * t),
    })),
  };

  window.CELTIC_ROWS_2_4_CURVES = [
    celticCurve({
      name: "Shield Knot",
      tag: "Heraldic Shield",
      descriptionEn:
        "A heraldic heater-shield outline. Math: x = 24(0.92 + 0.08 cos 2t) sin t, y = 30(0.85 − 0.2 sin t) cos t + 4 sin t (modulated ellipse).",
      descriptionZh:
        "纹章盾形外轮廓。公式：x = 24(0.92 + 0.08 cos 2t) sin t，y = 30(0.85 − 0.2 sin t) cos t + 4 sin t（调制椭圆）。",
      pathD: CELTIC_PATHS_2_4.shield,
      targetSize: 72,
      strokeWidth: 5.1,
    }),
    celticCurve({
      name: "Looping Quatrefoil",
      tag: "Decorative Clover",
      descriptionEn:
        "Four loops with harmonic ripples at each crossing. Math: r = 0.52 + 0.28 cos 4t + 0.14 cos 8t, x = 23r cos t, y = 23r sin t (Fourier rose).",
      descriptionZh:
        "带谐波波纹的四叶结。公式：r = 0.52 + 0.28 cos 4t + 0.14 cos 8t，x = 23r cos t，y = 23r sin t（傅里叶玫瑰线）。",
      pathD: CELTIC_PATHS_2_4.decorativeQuatrefoil,
      particleCount: 78,
      trailSpan: 0.35,
    }),
    celticCurve({
      name: "Circle Triskelion",
      tag: "Triple Arc Weave",
      descriptionEn:
        "Three interlocking circular arcs. Math: x = 16 cos t + 9 cos(3t + π/2), y = 16 sin t + 9 sin(3t + π/2) (epicycloid, R = 16, r = 3).",
      descriptionZh:
        "三条互绕圆弧。公式：x = 16 cos t + 9 cos(3t + π/2)，y = 16 sin t + 9 sin(3t + π/2)（外摆线，R = 16，r = 3）。",
      pathD: CELTIC_PATHS_2_4.circularTriskelion,
      durationMs: 5900,
    }),
    celticCurve({
      name: "Square Dara Knot",
      tag: "Squared Quatrefoil",
      descriptionEn:
        "A squared quatrefoil with corner loops. Math: m = 0.72 + 0.28 cos 4t, x = 24m cos t, y = 24m sin t (fourfold radius modulation).",
      descriptionZh:
        "带角环的方形四叶结。公式：m = 0.72 + 0.28 cos 4t，x = 24m cos t，y = 24m sin t（四重半径调制）。",
      pathD: CELTIC_PATHS_2_4.squareKnot,
      particleCount: 76,
    }),
    celticCurve({
      name: "Celtic Cross",
      tag: "Cross & Ring",
      descriptionEn:
        "Cross arms bloom from a shared ring. Math: r = 11 + 11·max(|cos t|, |sin t|), x = r cos t, y = r sin t (cross-shaped polar radius).",
      descriptionZh:
        "从圆环伸出四臂的十字。公式：r = 11 + 11·max(|cos t|, |sin t|)，x = r cos t，y = r sin t（十字形极半径）。",
      pathD: CELTIC_PATHS_2_4.celticCross,
      rotate: false,
      targetSize: 70,
      strokeWidth: 5.2,
    }),
    celticCurve({
      name: "Vertical Serpent",
      tag: "Lissajous 2:1",
      descriptionEn:
        "Two vertical vesica loops woven together. Math: x = 11 sin 2t, y = 26 sin t (Lissajous curve, frequency ratio 2:1).",
      descriptionZh:
        "两枚竖向鱼形圈交织。公式：x = 11 sin 2t，y = 26 sin t（利萨如曲线，频率比 2:1）。",
      pathD: CELTIC_PATHS_2_4.verticalSerpentine,
      rotate: false,
      particleCount: 72,
      trailSpan: 0.38,
      durationMs: 5500,
      targetSize: 76,
    }),
    celticCurve({
      name: "Triple Spiral",
      tag: "Triskelion Spiral",
      descriptionEn:
        "Three spiral arms from a shared hub. Math: r = 11 + 10·((1 + sin 3t)/2)^0.85, θ = t + 0.28 sin 3t (modulated Archimedean spiral).",
      descriptionZh:
        "三臂螺旋从同一中心展开。公式：r = 11 + 10·((1 + sin 3t)/2)^0.85，θ = t + 0.28 sin 3t（调制阿基米德螺线）。",
      pathD: CELTIC_PATHS_2_4.tripleSpiral,
      particleCount: 80,
      trailSpan: 0.34,
      durationMs: 6100,
      pulseDurationMs: 5000,
    }),
    celticCurve({
      name: "Four-Petal Weave",
      tag: "Interlaced Petals",
      descriptionEn:
        "Four pointed petals interlacing at the center. Math: r = 0.48 + 0.52·|cos 2t|^0.65, x = 24r cos t, y = 24r sin t (superellipse rose).",
      descriptionZh:
        "四片尖瓣在中心交织。公式：r = 0.48 + 0.52·|cos 2t|^0.65，x = 24r cos t，y = 24r sin t（超椭圆玫瑰线）。",
      pathD: CELTIC_PATHS_2_4.fourPetal,
      particleCount: 76,
      breathe: 0.13,
    }),
    celticCurve({
      name: "Five-Fold Ring",
      tag: "Pentacle Loop",
      descriptionEn:
        "Five rounded lobes around a central star. Math: r = 0.56 + 0.44 cos 5t, x = 23r cos t, y = 23r sin t (five-petal rose).",
      descriptionZh:
        "五瓣绕中心互锁。公式：r = 0.56 + 0.44 cos 5t，x = 23r cos t，y = 23r sin t（五瓣玫瑰线）。",
      pathD: CELTIC_PATHS_2_4.fiveFold,
      particleCount: 82,
      trailSpan: 0.34,
      durationMs: 6200,
      rotationDurationMs: 35000,
    }),
    celticCurve({
      name: "Serpent Weave",
      tag: "Zoomorphic Knot",
      descriptionEn:
        "Zoomorphic serpent with crossing tails. Math: x = 16 sin t + 6 sin 3t + 2 sin 5t, y = −8 cos t + 10 sin 2t − 4 cos 3t (Fourier path).",
      descriptionZh:
        "双首蛇形交织路径。公式：x = 16 sin t + 6 sin 3t + 2 sin 5t，y = −8 cos t + 10 sin 2t − 4 cos 3t（傅里叶路径）。",
      pathD: CELTIC_PATHS_2_4.serpentKnot,
      particleCount: 78,
      trailSpan: 0.35,
      durationMs: 6000,
      breathe: 0.11,
      targetSize: 68,
    }),
  ];

  window.CELTIC_PATHS_2_4 = CELTIC_PATHS_2_4;
})();
