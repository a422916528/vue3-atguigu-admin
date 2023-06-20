export const getTime = () => {
  let timeMessage = ''
  const hours = new Date().getHours()
  if (hours <= 9) {
    timeMessage = '早上好'
  } else if (hours <= 1) {
    timeMessage = '中午好'
  } else if (hours <= 6) {
    timeMessage = '下午好'
  } else {
    timeMessage = '晚上好'
  }
  return timeMessage
}
