import _ from 'lodash'

export function onTableSearch(data, searchValue) {
  const filtered = _.filter(data, item => {
    let obj = {};
    for (let key of Object.keys(item)) {
      obj[key] = item[key];
    }
    for (let key of Object.keys(obj)) {
      let value = obj[key];
      let re = new RegExp("W*(" + searchValue + ")W*");
      if (re.test(value ? value.toString().toLowerCase() : value)) {
        return true;
      } else if (re.test(value ? value : value)) {
        return true;
      } else if (
        searchValue.toString().trim().split(" ").length > 0
      ) {
        let wordsKeyboard = searchValue.toString().trim().split(" ");
        let valueWords = value ? value.toString().trim().split(" ") : "";
        let matchedWoords = 0;
        wordsKeyboard.forEach((item, index) => {
          let re = new RegExp("W*(" + item + ")W*");
          if (re.test(valueWords[index]
            ? valueWords[index].toString().toLowerCase() : valueWords[index]))
            matchedWoords++;
          else if (
            re.test(
              valueWords[index] ? valueWords[index] : valueWords[index]
            )
          )
            matchedWoords++;
        });
        if (matchedWoords === wordsKeyboard.length) return true;
      }
    }
  });
  return filtered
}