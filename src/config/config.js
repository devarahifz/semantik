const SPARQL_ATTR = {
  PREFIX: `
  prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
  prefix g: <http://koleksi-games.com/game#> 
  prefix dev: <http://infodev.com/developer#> 
  prefix d: <http://koleksi-games.com/game/data#> 
  prefix ddev: <http://infodev.com/developer/data#> 
  `,
  URL: 'http://localhost:3030/data-games/sparql',
};

module.export = SPARQL_ATTR;