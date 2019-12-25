export function deepAssign(source: any, target: any): object {
  const newTarget = target ? JSON.parse(JSON.stringify(target)) : {};

  Object.keys(source).forEach((key) => {
    const type = Object.prototype.toString.call(source[key]);
    if (type === '[object Object]') {
      newTarget[key] = deepAssign(source[key], newTarget[key]);
    } else {
      newTarget[key] = source[key];
    }
  });

  return newTarget;
}
