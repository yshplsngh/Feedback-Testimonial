// function to trim string, remove one or more spaces with hyphen(-)

export function removeExtraSpaces(data: string) {
  let start = 0;
  let end = data.length - 1;
  while (true) {
    if (data.charAt(start) === ' ') {
      start++;
    } else if (data.charAt(end) === ' ') {
      end--;
    } else {
      break;
    }
  }
  let ans = '';
  for (let i = start; i <= end; i++) {
    if (data.charAt(i) !== ' ') {
      ans += data.charAt(i);
    } else {
      const ansLen = ans.length - 1;
      if (ans.charAt(ansLen) !== '-') {
        ans += '-';
      } else {
        ans += '';
      }
    }
  }
  return ans;
}
