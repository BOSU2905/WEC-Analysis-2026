const fs = require('fs');
['2012_aston_martin_vantage_gte.glb', '2018_porsche_911_rsr.glb', 'porsche_919_hybrid.glb'].forEach(f => {
  const data = fs.readFileSync('public/assets/machines/3d/' + f);
  const str = data.toString('utf8', 0, 10000);
  console.log(f, 'Asset chunk:', str.substring(0, 1000).replace(/[^ -~]/g, ''));
});
