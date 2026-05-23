function calculateTriangleArea(base, height) {
  if (
    typeof base !== "number" ||
    typeof height !== "number" ||
    base <= 0 ||
    height <= 0
  ) {
    return 0;
  }
  return (base * height) / 2;
}

function calculateSum(arr) {
 let sum = 0;
 for (let i = 0; i < arr.length; i++) {
   sum += arr[i];
 }
 return sum;
}
