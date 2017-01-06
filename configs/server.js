//important: first value in the array is considered as default value for the property
//this file is visible to the server-side
export default {
    serverPort: [4000],
    sparqlEndpoint: {
        'generic': {
            host: 'localhost', port: 8890, path: '/sparql'
            //host: 'localhost', port: 3020, path: '/sparql/', endpointType: 'ClioPatria'
        },
        'http://dblp.l3s.de/d2r/sparql': {
            host: 'dblp.l3s.de', port: 80, path: '/d2r/sparql', graphName: 'default', endpointType: 'sesame'
        },
        'http://lsq.aksw.org/sparql': {
            host: 'lsq.aksw.org', port: 80, path: '/sparql', graphName: 'default', endpointType: 'virtuoso'
        },
        'http://drugbank.bio2rdf.org/sparql': {
            host: 'drugbank.bio2rdf.org', port: 80, path: '/sparql', graphName: 'default', endpointType: 'virtuoso'
        },
        'http://lodlaundromat.org/sparql/': {
            host: 'lodlaundromat.org', port: 80, path: '/sparql', graphName: 'default', endpointType: 'virtuoso'
        },
        'http://clinicaltrials.bio2rdf.org/sparql': {
            host: 'clinicaltrials.bio2rdf.org', port: 80, path: '/sparql', graphName: 'default', endpointType: 'virtuoso'
        },
        'http://linkedgeodata.org': {
            host: 'linkedgeodata.org', port: 80, path: '/sparql', graphName: 'default', endpointType: 'virtuoso'
        },
        'http://sonicbanana.cs.wright.edu:8890/sparql': {
            host: 'sonicbanana.cs.wright.edu', port: 8890, path: '/sparql', graphName: 'default', endpointType: 'virtuoso'
        },
        'http://nl.dbpedia.org': {
            host: 'nl.dbpedia.org', port: 80, path: '/sparql', graphName: 'default', endpointType: 'virtuoso'
        },
        'http://live.dbpedia.org': {
            host: 'live.dbpedia.org', port: 80, path: '/sparql', graphName: 'default', endpointType: 'virtuoso'
        },
        'http://enipedia.tudelft.nl/data/CORDIS': {
            host: 'enipedia.tudelft.nl', port: 80, path: '/sparql'
        },
        'http://drugbank.bio2rdf.org/sparql': {
            host: 'drugbank.bio2rdf.org', port: 80, path: '/sparql', graphName: 'default', endpointType: 'virtuoso'
        },
        'http://data.semanticweb.org/sparql': {
            host: 'data.semanticweb.org', port: 80, path: '/sparql', graphName: 'default', endpointType: 'sesame'
        },
        'http://world.openfoodfacts.org/': {
            host: 'sparql.sms.risis.eu', port: 80, path: '/', endpointType: 'virtuoso'
        }
    },
    dbpediaLookupService: [
        { host: 'lookup.dbpedia.org' }
    ]
};
