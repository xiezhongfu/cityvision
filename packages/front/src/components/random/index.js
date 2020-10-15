/**
 * 交通指数的范围是[0, 10)，子分区范围如下
 * 等级1    通畅:     [0, 2)       #22E49D
 * 等级2    基本通畅: [2, 4)       #663DAD
 * 等级3    缓行:    [4, 6)        #FCCC28
 * 等级4    较拥堵:    [6, 8)      #CA45BC
 * 等级5    拥堵:    [8, 10）      #FF3E5F
 */

// 返回 [0, 1) 的安全随机数
export function getSafeRandom(length) {
  const array = Uint8ClampedArray.from((new Array(length)).fill(0));
  window.crypto.getRandomValues(array);
  const result = [];
  array.forEach(current => {
    result.push(current / (1 << 8) * 1)
  });
  return result;
}

// 返回 (0, 1) 的安全随机数
// 如果是 0，就假设符合高斯分布选择中位数(0.5)
export function getSafeGaussianRandom(length) {
  const array = Uint8ClampedArray.from((new Array(length)).fill(0));
  window.crypto.getRandomValues(array);
  const result = [];
  array.forEach(current => {
    result.push((current || 0.5) / (1 << 8) * 1)
  });
  return result;
}


export default function getLevel(value = getSafeRandom(1).join() * 10) {
  const levels = [0,/*       */2,/*          */4,/*      */6,/*          */8,/*         */10];
  const colors = [/**/'#22E49D',/**/'#663DAD',/**/'#FCCC28',/**/'#CA45BC',/**/'#FF3E5F'];

  const index = binarySearch(levels, value, 0, levels.length - 1);
  const color = colors[index];
  return color;
}

function binarySearch(array, value, start, end) {
  if (start < 0) {
    throw new RangeError('不能小于0')
  } else if (end > array.length - 1) {
    throw new RangeError('end 不能超过数组的最后一个元素的索引')
  }

  while (start <= end) {
    const index = (start + end) >> 1;

    // 比中位数小
    if (value < array[index]) {
      end = index - 1;
    }
    // 比中位数大
    else {
      start = index + 1;
    }
  }

  return end;
}