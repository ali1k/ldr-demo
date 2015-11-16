//important: first value in the array is considered as default value for the property
//this file is visible to the server-side
export default {
    serverPort: [4000],
    sparqlEndpoint: {
        'generic': {
            host: 'localhost', port: 8890, path: '/sparql'
        },
        'http://lsq.aksw.org/sparql': {
            host: 'lsq.aksw.org', port: 80, path: '/sparql', useDefaultGraph: 1, type: 'virtuoso'
        },
        'http://lodlaundromat.org/sparql/': {
            host: 'lodlaundromat.org', port: 80, path: '/sparql', useDefaultGraph: 1, type: 'virtuoso'
        },
        'http://www.contextdatacloud.org': {
            host: 'www.contextdatacloud.org', port: 8890, path: '/sparql', useDefaultGraph: 0, type: 'virtuoso'
        },
        'http://www.linklion.org:8890/sparql': {
            host: 'www.linklion.org', port: 8890, path: '/sparql', useDefaultGraph: 1, type: 'virtuoso'
        },
        'http://clinicaltrials.bio2rdf.org/sparql': {
            host: 'clinicaltrials.bio2rdf.org', port: 80, path: '/sparql', useDefaultGraph: 1, type: 'virtuoso'
        },
        'http://linkedgeodata.org': {
            host: 'linkedgeodata.org', port: 80, path: '/sparql', useDefaultGraph: 1, type: 'virtuoso'
        },
        'http://sonicbanana.cs.wright.edu:8890/sparql': {
            host: 'sonicbanana.cs.wright.edu', port: 8890, path: '/sparql', useDefaultGraph: 1, type: 'virtuoso'
        },
        'http://nl.dbpedia.org': {
            host: 'nl.dbpedia.org', port: 80, path: '/sparql', useDefaultGraph: 1, type: 'virtuoso'
        },
        'http://live.dbpedia.org': {
            host: 'live.dbpedia.org', port: 80, path: '/sparql', useDefaultGraph: 1, type: 'virtuoso'
        },
        'http://enipedia.tudelft.nl/data/CORDIS': {
            host: 'enipedia.tudelft.nl', port: 80, path: '/sparql'
        },
        'http://drugbank.bio2rdf.org/sparql': {
            host: 'drugbank.bio2rdf.org', port: 80, path: '/sparql', useDefaultGraph: 1, type: 'virtuoso'
        },
        'http://www.bbc.co.uk/nature/': {
            host: 'lod.openlinksw.com', port: 80, path: '/sparql'
        },
        'http://data.semanticweb.org/sparql': {
            host: 'data.semanticweb.org', port: 80, path: '/sparql', useDefaultGraph: 1, type: 'sesame'
        },
        'http://babelnet.org/rdf/': {
            host: 'babelnet.org', port: 80, path: '/sparql', useDefaultGraph: 1, type: 'virtuoso'
        }
    },
    dbpediaLookupService: [
        { host: 'lookup.dbpedia.org' }
    ]
};
