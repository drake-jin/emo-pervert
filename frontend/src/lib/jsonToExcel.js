const __JSONtoCSV = (json) => {
  // @param json ONLY [object array] 
  const data = typeof json != 'object' ? JSON.parse(json) : json;
  let csv = '';    
  let row = '';

  for (let attr in data[0]) {
    row += '"'+attr + '",';
  }
  
  row = row.slice(0, -1);
  csv += row + '\r\n';

  for (let obj of data) {
    let row = '';
    for (let val in obj) {
      obj[val] = obj[val] !== undefined && obj[val] !== null ? obj[val].toString() : ''
      row += '"' + obj[val].replace(/\n/gi,'{newline}') + '",';
    }
    row = row.slice(0, -1);
    csv += row + '\r\n';
  }

  if (csv == '') {        
    alert("Invalid data");
    return;
  }   
  // return string
  return csv
}

const __CSVtoEXCEL = (fileName, csv) => {
  //Initialize file format you want csv or xls
  const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(csv);
  console.log(uri)
  //this trick will generate a temp <a /> tag
  const link = document.createElement('a');    
  link.href = uri;
  
  link.style = 'visibility:hidden';
  link.download = fileName + '.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default {
  getBoardAndComments(o){
    const options = o
    if(!options.constructor === Object ){
      console.log('options allowed only Object')
      return 
    }
    options.board = options.board === undefined ? [{}] : options.board
    options.comments = options.comments === undefined ? [{}] : options.comments
    options.fileName = options.fileName === undefined ? `You_must_write_filename` : options.fileName
    let csv = '' 
    csv = csv + __JSONtoCSV(options.board) + ''
    csv = csv + __JSONtoCSV(options.comments)

    __CSVtoEXCEL(options.fileName, csv)
  },
}