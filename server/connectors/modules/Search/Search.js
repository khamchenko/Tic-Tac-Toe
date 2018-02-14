export default (id, Arr) => {

  var data= '';
  var index= '';

  Arr.forEach((elem, i) => {
    if (id == elem.GameID) {
      data = elem;
      index = i;
    } else {
      data = '';
      index = '';
    }
  });
  return {
    data: data,
    index: index
  }
}
