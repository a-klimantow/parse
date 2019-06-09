const needle = require('needle'),
      cherio = require('cheerio'),
      jsonfile = require('jsonfile');

const url = 'http://mingkh.ru/rating/tatarstan/nizhnekamsk/'

needle.get(url, function(err, res) {
  if(err) throw(err);

  const $ = cherio.load(res.body);
  const table = $('.table tbody tr');

  let obj = []

  table.each(function(i, val) {
    const text = $(val).text().split('\n');
    obj.push({
      name: text[2].trim(),
      area: text[4].trim()
    })
    
  })

  console.log(obj)
  jsonfile.writeFile('test.json', obj)
});
