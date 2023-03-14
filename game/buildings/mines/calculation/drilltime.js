function calculateDrillTime(depth, head, engine, shaft, baseWeight) {
    const hardness = depth / 150;
    const weight = baseWeight + (8 * head) + (25 * engine) + (6 * shaft);
    const depthFactor = depth === 1 ? 0 : (depth - 1) * 1;
    const headFactor = 2 / (head / 5);
    const engineFactor = 3 / (engine / 2);
    const shaftFactor = 0.6 * (shaft / 2);
    const drillTime = hardness * (weight / 50) * headFactor * engineFactor / shaftFactor + depthFactor;
    return [Math.round(drillTime), weight];
}
  
export { calculateDrillTime }