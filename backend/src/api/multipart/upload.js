
const parse = require('co-busboy'),
path = require('path'),
fs = require('fs'),
os = require('os'),
moment = require('moment'),
md5 = require('md5');


module.exports = function* (next) {
  var parts = parse(this, {
    autoFields: true
  });
  var part;
  var urls = [];

  while ((part = yield parts)) {
    var extname = path.extname(part.filename);
    var filename = md5(moment().format('YYYYMMDDHHmmss') + part.filename) + extname;
    var uploadpath = path.join(__dirname, 'upload/' + filename);
    var stream = fs.createWriteStream(uploadpath);
    console.log('uploading %s -> %s', part.filename, stream.path);
    part.pipe(stream);
  }
  console.log('asdadasdd')
  console.log('asdadasdd')
  console.log('asdadasdd')
  console.log('asdadasdd')
  console.log('asdadasdd')
  console.log('asdadasdd')
  this.body = {
    state: true,
    url: '/photos/' + filename
  };
}