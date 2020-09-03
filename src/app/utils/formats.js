export function formatPhoneNumber(phoneNumberString) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  var match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/)
    || cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match)
    if (match.length === 5) {
      return '+' + match[1] + ' (' + match[2] + ') ' + match[3] + '-' + match[4]
    } else if (match.length === 4) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    else return ""
}

export function getTime(date) {
  if (date && !Array.isArray(date)) {
    let dateOld = new Date(date);
    let dateNow = new Date();
    let res = Math.abs(dateNow - dateOld) / 1000;
    var days = Math.floor(res / 86400);
    let hours = Math.floor(res / 3600) % 24
    if (days) {
      hours += days * 24
    }
    return (hours + "h " + Math.floor(res / 60) % 60 + "m " + parseInt(res % 60)).toString() + "s "
  } else return ""
}

export function moneyFormat(money = 0) {
  if (isInt(money))
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00"
  else if (isFloat(money))
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  else return money
}

function parseMinutes(minutes) {
  if (minutes < 10) {
    return '0' + minutes
  } else return minutes
}

function parseHours(hours) {
  if (hours < 10) {
    return '0' + hours
  } else return hours
}

export function dateFormat(date) {
  let ogDate = date
  if (date && !Array.isArray(date)) {
    date = new Date(date)
    let HM = date.getHours() > 12 ? parseHours((date.getHours() - 12)) + ":" + parseMinutes(date.getMinutes())
      + " PM" : parseHours(date.getHours()) + ":" + parseMinutes(date.getMinutes()) + " AM"
    if (isNaN(date.getDate()) || isNaN((parseInt(date.getMonth())) || isNaN(date.getFullYear())))
      return ogDate
    else return date.getDate() + '/' + (parseInt(date.getMonth()) + 1) + '/' + date.getFullYear() + "  " + HM
  } else return ""
}

export function isInt(n) {
  return Number(n) === n && n % 1 === 0;
}

export function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}