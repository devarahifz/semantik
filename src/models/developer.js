const d3 = require('d3-sparql');

exports.getAll = (req, res) => {
  const url = 'http://localhost:3030/data-games/sparql';
  const query = `
  PREFIX g: <http://koleksi-games.com/game#> 
  PREFIX dev: <http://infodev.com/developer#> 
  PREFIX d: <http://koleksi-games.com/game/data#> 
  PREFIX ddev: <http://infodev.com/developer/data#> 
  
  SELECT ?developer ?founder (GROUP_CONCAT(?game;SEPARATOR=", ") as ?games) ?founded ?logo
  WHERE {
      ?pengembang 	ddev:name         ?developer ;
                      ddev:product    ?product ;
                      ddev:logo       ?logo .
  
      ?product 		  d:nama			      ?game
     OPTIONAL {
      ?pengembang	  ddev:founder			?founder.
    }
     OPTIONAL {
      ?pengembang	  ddev:founded			?founded.
    }
  }
  GROUP BY ?developer ?founder ?founded ?logo
  `;

  d3.sparql(url, query).then((data) => {
    console.log(data);
    res.render('developer', { data });
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
  
  SELECT ?developer ?founder (GROUP_CONCAT(?game;SEPARATOR=", ") as ?games) ?founded ?logo
  WHERE {
      ?pengembang 	ddev:name         ?developer ;
                      ddev:product    ?product ;
                      ddev:logo       ?logo .
  
      ?product 		  d:nama			      ?game
     OPTIONAL {
      ?pengembang	  ddev:founder			?founder .
    }
     OPTIONAL {
      ?pengembang	  ddev:founded			?founded .
    }

    filter(regex(?developer, "${params}", "i" ) || regex(?game, "${params}", "i" ))
  }
  GROUP BY ?developer ?founder ?founded ?logo
  `;

  d3.sparql(url, query).then((data) => {
    console.log(data);
    res.render('developer', { data });
  }).catch((err) => {
    console.log(err);
  });
};