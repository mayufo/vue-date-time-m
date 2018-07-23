export default {
  // 某月的天数
  getDaysInOneMonth: (date, params) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    let d = ''
    switch (params) {
      case 'last':
        d = new Date(year, month - 1, 0)
        break
      case 'next':
        d = new Date(year, month + 1, 0)
        break
      default:
        d = new Date(year, month, 0)
    }
    return d.getDate()
  },
  // 生成数组
  createArray: (start, end) => {
    let arr = []
    for (let i = start; i <= end; i++) {
      arr[i] = i
    }
    return arr
  },
  // 这个月第一天星期几
  getMonthFirstDayWhatWeek: (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const d = new Date(year, month, 1)
    return d.getDay()
  },
  format: (date, fmt) => {
    var o = {
      'M+': date.getMonth() + 1,                   // 月份
      'd+': date.getDate(),                        // 日
      'h+': date.getHours(),                       // 小时
      'm+': date.getMinutes(),                     // 分
      's+': date.getSeconds(),                     // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds()                  // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  },
  // 时间的格式
  formatDate: (date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    // const hour = date.getHours()
    // const minutes = date.getMinutes()
    return `${year}年${month}月${day}日`
  },
  formatTime: (date) => {
    if (date > 9) {
      return date
    } else {
      return `0${date}`
    }
  },
  changeDay: (date, newDay) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    return new Date(year, month, newDay, hour, minutes)
  },
  changeMonth: (date, newMonth) => {
    const year = date.getFullYear()
    const day = date.getDate()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    return new Date(year, newMonth, day, hour, minutes)
  },
  changeHour: (date, newHour) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const minutes = date.getMinutes()
    return new Date(year, month, day, newHour, minutes)
  },
  changeMinute: (date, newMinute) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const hour = date.getHours()
    return new Date(year, month, day, hour, newMinute)
  }
}
