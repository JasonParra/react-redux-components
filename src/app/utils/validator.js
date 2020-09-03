import _ from 'lodash'

export function isPersonalId(cedula) {
  cedula = String(cedula).replace(/-/g, "")
  if (cedula.length != 11 || !cedula.match(/^[0-9]+$/))
    return false;

  let serie = parseInt(cedula.charAt()) // Serie
  let digitos = Array.from(cedula.substring(1)) //sin la serie
  let multiplicador = 2;
  let suma = 0;
  for (let digito of digitos) {
    digito = parseInt(digito)
    let temp = digito * multiplicador;
    if (temp > 9) { //suma del primer numero con el suegundo 
      suma += parseInt(String(temp).charAt()) + parseInt(String(temp).substring(1))
    }
    else
      suma += temp;
    multiplicador = multiplicador == 2 ? 1 : 2;
  }
  let calc = (10 - (suma % 10)) % 10;

  return serie == calc;

}

export function isPhone(phone) {
  return ((Number.isInteger(parseInt(phone.replace('+', '')))) && (phone.replace('+', '').length === 10) && phone.replace('+', '')[0] !== '1')
    || (Number.isInteger(parseInt(phone.replace('+', ''))) && (phone.replace('+', '').length === 11) && phone.replace('+', '')[0] === '1')
}

export function isMail(mail) {
  return mail.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

export function isRnc(value) {
  const validatorArray = [7, 9, 8, 6, 5, 4, 3, 2];
  const rnc = value.length === 9 ? value.substring(0, value.length - 1) : value;
  let result = [];
  let sum = 0;
  let recalculo = 0;
  let difigto =
    value.length === 9
      ? value.substring(value.length - 1, value.length)
      : NaN;

  [...rnc].forEach((item, index) => {
    result = result.concat(parseInt(item) * validatorArray[index]);
    if (result[index] > 9) {
      result[index] =
        parseInt(result[index].toString().substring(0, 1)) +
        parseInt(result[index].toString().substring(1, 2));
    }
    sum += result[index];
  });
  recalculo = _.floor(sum / 10) * 10;

  if (recalculo < sum) {
    if (recalculo + 10 - sum == difigto) {
      return false
    } else {
      return true
    }
  } else {
    return true
  }

}

export function isPassword(value) {
  const lowercaseLetters = "(?=.*[a-z])";
  const uppercaseLetters = "(?=.*[A-Z])";
  const numbers = "(?=.*[0-9])";
  return value.match(new RegExp("^" + lowercaseLetters + uppercaseLetters + numbers))
}

export function removeDuplicates(array, key) {
  var obj = {};

  for (var i = 0, len = array.length; i < len; i++)
    obj[array[i][key]] = array[i];

  array = new Array();
  for (var key in obj)
    array.push(obj[key]);

  return array
}

export function isAlphaNumeric(value) {
  if (value)
    if (value.match("^[a-zA-Z0-9_ ]*$"))
      return true
    else return false
  else return false
}