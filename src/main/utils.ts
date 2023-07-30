export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}
export function lerp(start: number, end: number, t: number): number {
    return start * (1 - t) + end * t;
}
export function logd(tag: string, ...args: any[]) {
    console.log(`%c[sceneview] ${tag} [i]: `, ...args)
}
export function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

