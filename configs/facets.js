export default {
    facets: {
        'generic': {
            list: [
                'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
            ],
            config: {

            }
        },
        'http://www.contextdatacloud.org': {

            list: [
                'http://www.w3.org/2001/vcard-rdf/3.0#locality', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',  'http://www.contextdatacloud.org/ontology/hasLocationCategory'
            ],
            config: {
                'http://www.contextdatacloud.org/ontology/hasLocationCategory': {
                    label: ['Category']
                },
                'http://www.w3.org/2001/vcard-rdf/3.0#locality': {
                    label: ['Location']
                }
            }
        },
        'http://world.openfoodfacts.org/': {
            list: [
                'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
            ],
            config: {

            }
        },
        /*
        'http://data.linkedmdb.org/sparql': {
            list: [
                'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', 'http://data.linkedmdb.org/resource/movie/language', 'http://data.linkedmdb.org/resource/movie/genre', 'http://data.linkedmdb.org/resource/movie/director', 'http://data.linkedmdb.org/resource/movie/writer',
            ],
            config: {

            }
        },
        */
        'http://drugbank.bio2rdf.org/sparql': {
            list: [
                'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', 'http://bio2rdf.org/drugbank_vocabulary:group', 'http://bio2rdf.org/drugbank_vocabulary:affected-organism', 'http://bio2rdf.org/drugbank_vocabulary:category'
            ],
            config: {

            }
        },
        'http://data.semanticweb.org/sparql': {
            list: [
                'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', 'http://swrc.ontoware.org/ontology#year'
            ],
            config: {

            }
        },
        'http://babelnet.org/rdf/': {
            list: [
                'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', 'http://www.lemon-model.net/lemon#language', 'http://www.lexinfo.net/ontology/2.0/lexinfo#partOfSpeech', 'http://www.lemon-model.net/lemon#sense'
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
        'http://risis.eu/cordisH2020': {
            list: [
                'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
                'http://risis.eu/cordisH2020/vocab/projectParticipant',
                'http://risis.eu/cordisH2020/vocab/fundingScheme',
                'http://risis.eu/cordisH2020/vocab/topic',
                'http://risis.eu/cordisH2020/vocab/totalCost',
                'http://risis.eu/cordisH2020/vocab/callID',
                'http://rdf-vocabulary.ddialliance.org/discovery#startDate',
                'http://risis.eu/cordisH2020/vocab/durationMonths'
            ],
            config: {
                'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': {
                    label: ['Type'],
                    hint: ['Type of the resource under investigation.']
                },
                'http://risis.eu/cordisH2020/vocab/projectParticipant': {
                    label: ['Participant'],
                    hasLinkedValue: 1
                },
                'http://risis.eu/cordisH2020/vocab/fundingScheme': {
                    label: ['Funding Scheme'],
                    hasLinkedValue: 1
                },
                'http://risis.eu/cordisH2020/vocab/topic': {
                    label: ['Topic'],
                    hasLinkedValue: 1
                }
            }
        }
    }
};
