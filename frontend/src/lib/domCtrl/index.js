
export default {
  setStyle(dom,property,value){
    if (property.indexOf('-') != -1) {
      dom.style[property] = value
    }else{
      let splits = property.split('-');
      property = splits.splice(0,1)
      splits.filter((v) => {
        property += v.charAt(0).toUpperCase() + v.slice(1);
      })
      dom.style[property] = value
    }
  },
}