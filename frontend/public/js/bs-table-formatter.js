// var host = "http://crawler.moducampus.com:4000/api/pool"
var host = "http://localhost:4000/api/pool"

function koreapasBoardsTableFormatter(index, row){
  var data = {
    which: 'crawlers',
    key: 'a',
    sql: 'SELECT * FROM koreapas_comments C WHERE C.board_id='+row.id,
    params: JSON.stringify({id:row.id}),
  }

  var html = [];
  html.push('<h3><b>글 내용:</b> <br/></h3> <p>' + row.content.replace(/\n/g,'</br>') + '</p>');
  html.push('---------------------------------<br/>');
  html.push('<h4><b>덧글들:</b> </h4> ');

  $.ajax({
    type : "POST",
    url : host,
    data: data,
    cache : false,
    async : false,
    dataType : "json",
  }).then(function(res){
    console.log(res)
    $.each(res.data, function (key, value) {
      html.push('<div style="width:97%; border: 1px solid #fff; margin: 15px 10px 5px; padding: 15px 10px 5px">');
      html.push('<div> <div style="float:left"> <p><b>번호: ' + value.id + ' 날짜: ' + moment(value.reg_date).format("YYYY-MM-DD HH:mm:ss") + '</div> <div style="float:right">  좋아요: ' + value.likes + ' 싫어요: ' + value.hates + '</b></p></div></div>');
      html.push('<br/><br/><p><b>덧글 내용:</b></p> <p>' + value.content.replace(/\n/g,'</br>') + '</p>');
      html.push('</div>');
    });
  })
  return html.join('');
}

function koreapasCommentsTableFormatter(index, row){
  var html = [];
  html.push('<h3><b>덧글 내용:</b> <br/></h3> <p>' + row.content.replace(/\n/g,'</br>') + '</p>');
  return html.join('');
}

function scheduleBoardsTableFormatter(index, row){
  console.log(row)
  var data = {
    which: 'crawlers',
    key: 'a',
    sql: 'SELECT * FROM schedule_comments C WHERE C.board_id=' + row.board_id,
    params: JSON.stringify({id:row.id}),
  }

  var html = [];
  html.push('<h3><b>삽입될 글 내용:</b> <br/></h3> <p>' + row.content.replace(/\n/g,'</br>') + '</p>');
  html.push('---------------------------------<br/>');
  html.push('<h4><b>삽입될 덧글들:</b> </h4> ');

  $.ajax({
    type : "POST",
    url : host,
    data: data,
    cache : false,
    async : false,
    dataType : "json",
  }).then(function(res){
    console.log(res)
    $.each(res.data, function (key, value) {
      html.push('<div style="width:97%; border: 1px solid #fff; margin: 15px 10px 5px; padding: 15px 10px 5px">');
      html.push('<div> <div style="float:left"> <p><b>번호: ' + value.id + ' 날짜: ' + moment(value.reg_date).format("YYYY-MM-DD HH:mm:ss") + '</div> <div style="float:right">  좋아요: ' + value.likes + ' 싫어요: ' + value.hates + '</b></p></div></div>');
      html.push('<br/><br/><p><b>삽입될 덧글 내용:</b></p> <p>' + value.content.replace(/\n/g,'</br>') + '</p>');
      html.push('</div>');
    });
  })
  return html.join('');
}