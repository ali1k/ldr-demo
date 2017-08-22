export default {
    facets: {
        'generic': {
            list: [
                'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
            ],
            config: {

            }
        },
        /*
        'http://dblp.l3s.de/d2r/sparql': {
            list: [
                'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', 'http://purl.org/dc/terms/issued', 'http://swrc.ontoware.org/ontology#journal'
            ],
            config: {

            }
        },
        'http://data.linkedmdb.org/sparql': {
            list: [
                'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', 'http://data.linkedmdb.org/resource/movie/language', 'http://data.linkedmdb.org/resource/movie/genre', 'http://data.linkedmdb.org/resource/movie/director', 'http://data.linkedmdb.org/resource/movie/writer',
            ],
            config: {

            }
        },

        'http://drugbank.bio2rdf.org/sparql': {
            list: [
                'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', 'http://bio2rdf.org/drugbank_vocabulary:group', 'http://bio2rdf.org/drugbank_vocabulary:affected-organism->http://purl.org/dc/terms/title', 'http://bio2rdf.org/drugbank_vocabulary:category',
                'http://bio2rdf.org/drugbank_vocabulary:target->http://bio2rdf.org/drugbank_vocabulary:gene-name'
            ],
            config: {
                'http://bio2rdf.org/drugbank_vocabulary:target->http://bio2rdf.org/drugbank_vocabulary:gene-name' : {
                    label: ['Target Gene']
                },
                'http://bio2rdf.org/drugbank_vocabulary:affected-organism->http://purl.org/dc/terms/title' : {
                    label: ['Affected Organism']
                }
            }
        },
        'http://data.semanticweb.org/sparql': {
            list: [
                'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', 'http://swrc.ontoware.org/ontology#year'
            ],
            config: {

            }
        },
        'http://lodlaundromat.org/sparql/': {
            list: [
                'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', 'http://lodlaundromat.org/ontology/archiveFileType','http://lodlaundromat.org/ontology/fileExtension','http://lodlaundromat.org/ontology/serializationFormat','http://lodlaundromat.org/ontology/statementsType'            ],
            config: {

            }
        },
        'http://lsq.aksw.org/sparql': {
            list: [
                'http://lsq.aksw.org/vocab#endpoint',
                'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
                'http://lsq.aksw.org/vocab#usesFeature',
                'http://lsq.aksw.org/vocab#mentionsObject',
                'http://lsq.aksw.org/vocab#mentionsPredicate',
                'http://lsq.aksw.org/vocab#runTimeMs',
                'http://lsq.aksw.org/vocab#resultSize',
                'http://lsq.aksw.org/vocab#bgps',
                'http://lsq.aksw.org/vocab#triplePatterns',
                'http://lsq.aksw.org/vocab#joinVertices',
                'http://lsq.aksw.org/vocab#meanJoinVerticesDegree',
                'http://lsq.aksw.org/vocab#meanTriplePatternSelectivity',
            ],
            config: {
                'http://lsq.aksw.org/vocab#endpoint': {
                    label: ['Endpoint'],
                    shortenURI: 0
                },
                'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': {
                    label: ['Type']
                },
                'http://lsq.aksw.org/vocab#bgps': {
                    label: ['Basic Graph Patterns']
                },
                'http://lsq.aksw.org/vocab#triplePatterns': {
                    label: ['Number of Triple Patterns']
                },
                'http://lsq.aksw.org/vocab#meanJoinVerticesDegree': {
                    label: ['Mean Join Vertex Degree'],
                    hint: ['The mean number of triple patterns conatining a join variable.']
                }
            }
        },
        */
        //Configuration Manager: change the graph name if you use another name in your general.js config
        'http://ld-r.org/configurations': {
            list: [
                'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#scope', 'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#dataset', 'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#resource', 'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#property',
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#endpointType',
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#createdBy->[http://demo.ld-r.org/users]http://xmlns.com/foaf/0.1/accountName'
            ],
            config: {
                'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': {
                    objectBrowser: ['TagListBrowser'],
                    position: 1
                },
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#dataset': {
                    shortenURI: 0,
                    position: 3
                },
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#resource': {
                    shortenURI: 0,
                    objectIViewer: ['PrefixBasedView'],
                    position: 4
                },
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#property': {
                    shortenURI: 0,
                    objectIViewer: ['PrefixBasedView'],
                    position: 5
                },
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#scope': {
                    objectIViewer: ['BasicOptionView'],
                    options: [
                        {label: 'Dataset', value: 'D'},
                        {label: 'Resource', value: 'R'},
                        {label: 'Property', value: 'P'},
                        {label: 'Dataset-Resource', value: 'DR'},
                        {label: 'Dataset-Property', value: 'DP'},
                        {label: 'Resource-Property', value: 'RP'},
                        {label: 'Dataset-Resource-Property', value: 'DRP'},
                    ],
                    position: 2
                },
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#endpointType': {
                    position: 6
                },
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#createdBy': {
                    position: 7
                }
            }
        }
    }
};
