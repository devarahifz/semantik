const d3 = require('d3-sparql');

exports.getHalf = (req, res) => {
  const url = 'http://localhost:3030/data-games/sparql';
  const query = `
  PREFIX g: <http://koleksi-games.com/game#> 
  PREFIX dev: <http://infodev.com/developer#> 
  PREFIX d: <http://koleksi-games.com/game/data#> 
  PREFIX ddev: <http://infodev.com/developer/data#> 

  SELECT ?nama ?genre ?namaPengembang ?platform ?tgl ?harga ?gambar
  WHERE {
      ?game 	d:nama        	?nama ;
              d:genre         ?genre ;
              d:pengembang    ?pengembang ;
              d:platform      ?platform ;
              d:tgl			      ?tgl;
              d:gambar        ?gambar.
      ?pengembang ddev:name		?namaPengembang ;
    OPTIONAL {
      ?game	d:harga			?harga;
    }
  }
ORDER BY RAND()
LIMIT 5
  `;
  d3.sparql(url, query).then((data) => {
    console.log(data);
    res.render('index', { data });
  }).catch((err) => {
    console.log(err);
  });
};

exports.getAll = (req, res) => {
  const url = 'http://localhost:3030/data-games/sparql';
  const query = `
  PREFIX g: <http://koleksi-games.com/game#> 
  PREFIX dev: <http://infodev.com/developer#> 
  PREFIX d: <http://koleksi-games.com/game/data#> 
  PREFIX ddev: <http://infodev.com/developer/data#> 

  SELECT ?nama ?genre ?namaPengembang ?platform ?tgl ?harga ?gambar
  WHERE {
      ?game 	d:nama        	?nama ;
              d:genre         ?genre ;
              d:pengembang    ?pengembang ;
              d:platform      ?platform ;
              d:tgl			      ?tgl;
              d:gambar        ?gambar.
      ?pengembang ddev:name		?namaPengembang ;
    OPTIONAL {
      ?game	d:harga			?harga;
    }
  }
  `;
  d3.sparql(url, query).then((data) => {
    console.log(data);
    res.render('games', { data });
  }).catch((err) => {
    console.log(err);
  });
};

exports.search = (req, res) => {
  const params = req.query.search;
  const url = 'http://localhost:3030/data-games/query';
  const query = `
  PREFIX g: <http://koleksi-games.com/game#> 
  PREFIX dev: <http://infodev.com/developer#> 
  PREFIX d: <http://koleksi-games.com/game/data#> 
  PREFIX ddev: <http://infodev.com/developer/data#> 

  SELECT *
  WHERE {
      ?game 	d:nama        	?nama ;
              d:genre         ?genre ;
              d:pengembang    ?pengembang ;
              d:platform      ?platform ;
              d:tgl			      ?tgl;
              d:gambar        ?gambar.
      ?pengembang ddev:name		?namaPengembang ;

      OPTIONAL {
          ?game	d:harga			?harga.
      }

    filter(regex(?nama, "${params}", "i" ) || regex(?genre, "${params}", "i" ) || regex(?namaPengembang, "${params}", "i" ) || regex(?platform, "${params}", "i" ))
  }
  `;
  console.log(params);
  d3.sparql(url, query).then((data) => {
    console.log(data);
    res.render('games', { data });
  }).catch((err) => {
    console.log(err);
  });
};