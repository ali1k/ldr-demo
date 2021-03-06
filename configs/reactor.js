export default {
    // config = scope + spec
    // scope is one the 15 combination of dataset, resource, property and object
    config: {
        //---------depth 1------------
        dataset: {
            'generic': {
                resourceFocusType: [],
                //only allow to view data -> disable edit
                readOnly: 1,
                //used for pagination in resource list
                maxNumberOfResourcesOnPage: 20,
                datasetReactor: ['Dataset']
            },
            //authentication graph
            'http://demo.ld-r.org/users': {
                readOnly: 0,
                resourceFocusType: ['https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#User'],
                resourceLabelProperty: ['http://xmlns.com/foaf/0.1/accountName']
            },
            'http://ld-r.org/configurations': {
                readOnly: 0,
                allowResourceClone: 1,
                allowPropertyDelete: 1,
                allowResourceNew: 1,
                allowPropertyNew: 1,
                allowNewValue: 1,
                resourceFocusType: ['https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#ReactorConfig', 'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#ServerConfig', 'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#FacetsConfig'],
                datasetLabel: ['LD-R Configurations'],
                resourceLabelProperty: ['http://www.w3.org/2000/01/rdf-schema#label']
            },
            'http://ld-r.org/mappings': {
                readOnly: 0,
                resourceFocusType: ['https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#CSVMapping'],
                datasetLabel: ['LD-R Mapping Configurations'],
                resourceLabelProperty: ['http://www.w3.org/2000/01/rdf-schema#label']
            },
            'http://ld-r.org/datasets/void': {
                resourceFocusType: ['http://rdfs.org/ns/void#Dataset'],
                readOnly: 0,
                datasetLabel: ['Examples of editable datasets']
            },
            /*
            'http://drugbank.bio2rdf.org/sparql': {
                resourceFocusType: ['http://bio2rdf.org/drugbank_vocabulary:Drug'],
                resourceLabelProperty: ['http://purl.org/dc/terms/title'],
                readOnly: 1,
                datasetLabel: ['DrugBank Dataset']
            },
            'http://clinicaltrials.bio2rdf.org/sparql': {
                resourceFocusType: ['http://bio2rdf.org/clinicaltrials_vocabulary:Clinical-Study'],
                readOnly: 1,
                datasetLabel: ['Clinical Trials Dataset']
            },
            */
        },
        resource: {
            'generic': {
                //if enabled, will categorize properties in different tabs based on property categories
                usePropertyCategories: 0,
                propertyCategories: [],
                //used when creating random resources
                dynamicResourceDomain: ['http://example.org'],
                resourceReactor: ['Resource']
            },
            'http://rdf.risis.eu/dataset/example/1.0/void.ttl#example_rdf_dataset': {
                usePropertyCategories: 1,
                propertyCategories: ['overview', 'people', 'date', 'legalAspects', 'technicalAspects']
            }
        },
        property: {
            'generic': {
                propertyReactor: ['IndividualProperty'],
                //following are object-based scope:
                objectReactor: ['IndividualObject'],
                //to view/edit individual object values
                objectIViewer: ['BasicIndividualView'],
                objectIEditor: ['BasicIndividualInput'],
                extendedOEditor: ['BasicIndividualDetailEdit'],
                extendedOViewer: ['BasicIndividualDetailView'],
                shortenURI: 1
            },
            'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#cloneOf': {
                readOnly: 1,
                allowPropertyDelete: 0
            },
            'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#dataType': {
                allowPropertyDelete: 0,
                objectIViewer: ['PrefixBasedView'],
                objectIEditor: ['PrefixBasedInput']
            },
            'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': {
                allowPropertyDelete: 0,
                objectIViewer: ['PrefixBasedView'],
                objectIEditor: ['PrefixBasedInput']
            }
        },
        //---------depth 2------------
        dataset_resource: {
            'http://demo.ld-r.org/users': {
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#User': {
                    treatAsResourceType: 1,
                    resourceReactor: ['UserResource']
                }
            },
            'http://ld-r.org/mappings': {
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#CSVMapping' :{
                    treatAsResourceType: 1,
                    resourceReactor: ['CSVMappingResource']
                },
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#CustomMapping' :{
                    treatAsResourceType: 1,
                    objectIEditor: ['PrefixBasedInput'],
                    objectIViewer: ['PrefixBasedView']
                }
            }
        },
        dataset_property: {
            'http://ld-r.org/datasets/void': {
                'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': {
                    //it will not affect the sub properties in detail
                    isHidden: 1,
                    category: ['overview'],
                    label: ['Type'],
                    hint: ['Type of the entity.']
                },
                'http://purl.org/dc/terms/title': {
                    label: ['Title'],
                    category: ['overview'],
                    hint: ['The title of the dataset described by this document.'],
                    objectIViewer: ['BasicIndividualView'],
                    objectIEditor: ['BasicIndividualInput']
                },
                'http://purl.org/dc/terms/language': {
                    allowNewValue: 1,
                    label: ['Dataset Language'],
                    category: ['overview'],
                    hint: ['The language of the dataset. Resources defined by the Library of Congress (http://id.loc.gov/vocabulary/iso639-1.html, http://id.loc.gov/vocabulary/iso639-2.html) SHOULD be used.'],
                    objectIViewer: ['LanguageView'],
                    objectIEditor: ['LanguageInput'],
                    defaultValue: ['http://id.loc.gov/vocabulary/iso639-1/en']
                },
                'http://purl.org/dc/terms/temporal': {
                    label: ['Time coverage'],
                    category: ['date'],
                    hint: ['Time coverage of the data itself but not of the data collection. For example we collect pictures in 2015 about the war. However, the pictures themselves could have been taken from 1939 to 1945. So the time coverage is 1939-1945.'],
                    allowExtension: 1,
                    hasBlankNode: 1,
                    autoLoadDetails: 1,
                    extensions: [{
                            spec: {
                                propertyURI: 'http://rdf-vocabulary.ddialliance.org/discovery#startDate',
                                instances: [{
                                    value: '2010-12-24',
                                    valueType: 'literal'
                                }]
                            },
                            config: {
                                label: ['Start date'],
                                category: ['date'],
                                hint: ['Start date of the time coverage.']
                            }
                        },
                        {
                            spec: {
                                propertyURI: 'http://rdf-vocabulary.ddialliance.org/discovery#endDate',
                                instances: [{
                                    value: '2015-12-24',
                                    valueType: 'literal'
                                }]
                            },
                            config: {
                                label: ['End date'],
                                category: ['date'],
                                hint: ['End date of the time coverage.']
                            }
                        }
                    ]
                },
                'http://purl.org/dc/terms/spatial': {
                    label: ['Geographical coverage'],
                    category: ['overview'],
                    hint: ['The geographical area covered by the dataset.The same metadata could also be used to document the geographical area covered by an entity contained in the dataset in particular. For example we could say that the dataset covers all Eu countries or covers only France and Italy.'],
                    allowNewValue: 1,
                    objectReactor: ['AggregateObject'],
                    objectAViewer: ['DBpediaMapView'],
                    objectIViewer: ['BasicDBpediaView'],
                    asWikipedia: 1,
                    objectAEditor: ['BasicAggregateInput'],
                    objectIEditor: ['DBpediaInput'],
                    lookupClass: ['Place']
                },
                'http://purl.org/dc/terms/description': {
                    category: ['overview'],
                    label: ['Textual description'],
                    hint: ['A textual description of the dataset.'],
                    objectIEditor: ['BasicTextareaInput']
                },
                'http://purl.org/dc/terms/subject': {
                    category: ['overview'],
                    label: ['Keywords'],
                    hint: ['Tags a dataset with a topic. For the general case, we recommend the use of a DBpedia resource URI (http://dbpedia.org/resource/XXX) to categorise a dataset, where XXX stands for the thing which best describes the main topic of what the dataset is about.'],
                    allowNewValue: 1,
                    objectIEditor: ['DBpediaInput'],
                    objectIViewer: ['BasicDBpediaView'],
                    asWikipedia: 1
                },
                'http://purl.org/dc/terms/source': {
                    label: ['Data Source'],
                    allowNewValue: 1,
                    category: ['overview'],
                    hint: ['A related resource from which the dataset is derived. The source should be described using a URI if available, rather than as a literal.']
                },
                'http://purl.org/dc/terms/creator': {
                    allowNewValue: 1,
                    allowExtension: 1,
                    category: ['people'],
                    label: ['Creator'],
                    hint: ['An entity, such as a person, organisation, or service, that is primarily responsible for creating the dataset. The creator should be described using a URI if available, rather than just providing the name as a literal. ORCID provides a useful service for this.'],
                    objectIEditor: ['DBpediaInput'],
                    objectIViewer: ['BasicDBpediaView'],
                    asWikipedia: 1,
                    extensions: [{
                            spec: {
                                propertyURI: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
                                instances: [{
                                    value: 'http://xmlns.com/foaf/0.1/Person',
                                    valueType: 'uri'
                                }]
                            },
                            config: {
                                hint: ['Type of the entity'],
                                label: ['Type'],
                                category: ['people'],
                                objectIViewer: ['BasicOptionView'],
                                objectIEditor: ['BasicOptionInput'],
                                options: [{
                                        label: 'Person',
                                        value: 'http://xmlns.com/foaf/0.1/Person'
                                    },
                                    {
                                        label: 'Organization',
                                        value: 'http://xmlns.com/foaf/0.1/Organization'
                                    }
                                ],
                                defaultValue: ['http://xmlns.com/foaf/0.1/Person'],
                                allowUserDefinedValue: 1
                            }
                        },
                        {
                            spec: {
                                propertyURI: 'http://www.w3.org/2000/01/rdf-schema#label',
                                instances: [{
                                    value: 'Label',
                                    valueType: 'literal'
                                }]
                            },
                            config: {
                                hint: ['A descriptor label for the URI'],
                                category: ['people'],
                                label: ['Label']
                            }
                        },
                        {
                            spec: {
                                propertyURI: 'http://xmlns.com/foaf/0.1/mbox',
                                instances: [{
                                    value: 'email address',
                                    valueType: 'literal'
                                }]
                            },
                            config: {
                                hint: ['A corresponding email address'],
                                category: ['people'],
                                label: ['Email']
                            }
                        }
                    ]
                },
                'http://purl.org/dc/terms/publisher': {
                    allowNewValue: 1,
                    allowExtension: 1,
                    category: ['people'],
                    label: ['Publisher'],
                    hint: ['An entity, such as a person, organisation, or service, that is responsible for making the dataset available. The publisher should be described using a URI if available, rather than just providing the name as a literal.'],
                    objectIEditor: ['DBpediaInput'],
                    objectIViewer: ['BasicDBpediaView'],
                    asWikipedia: 1,
                    extensions: [{
                            spec: {
                                propertyURI: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
                                instances: [{
                                    value: 'http://xmlns.com/foaf/0.1/Person',
                                    valueType: 'uri'
                                }]
                            },
                            config: {
                                hint: ['Type of the entity'],
                                category: ['people'],
                                label: ['Type'],
                                objectIViewer: ['BasicOptionView'],
                                objectIEditor: ['BasicOptionInput'],
                                options: [{
                                        label: 'Person',
                                        value: 'http://xmlns.com/foaf/0.1/Person'
                                    },
                                    {
                                        label: 'Organization',
                                        value: 'http://xmlns.com/foaf/0.1/Organization'
                                    }
                                ],
                                defaultValue: ['http://xmlns.com/foaf/0.1/Person'],
                                allowUserDefinedValue: 1
                            }
                        },
                        {
                            spec: {
                                propertyURI: 'http://www.w3.org/2000/01/rdf-schema#label',
                                instances: [{
                                    value: 'Label',
                                    valueType: 'literal'
                                }]
                            },
                            config: {
                                hint: ['A descriptor label for the URI'],
                                category: ['people'],
                                label: ['Label']
                            }
                        },
                        {
                            spec: {
                                propertyURI: 'http://xmlns.com/foaf/0.1/mbox',
                                instances: [{
                                    value: 'email address',
                                    valueType: 'literal'
                                }]
                            },
                            config: {
                                hint: ['A corresponding email address'],
                                category: ['people'],
                                label: ['Email']
                            }
                        }
                    ]
                },
                'http://purl.org/dc/terms/contributor': {
                    allowNewValue: 1,
                    allowExtension: 1,
                    category: ['people'],
                    label: ['Contributor'],
                    hint: ['An entity, such as a person, organisation, or service, that is responsible for making contributions to the dataset. The contributor should be described using a URI if available, rather than just providing the name as a literal.'],
                    objectIEditor: ['DBpediaInput'],
                    objectIViewer: ['BasicDBpediaView'],
                    asWikipedia: 1,
                    extensions: [{
                            spec: {
                                propertyURI: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
                                instances: [{
                                    value: 'http://xmlns.com/foaf/0.1/Person',
                                    valueType: 'uri'
                                }]
                            },
                            config: {
                                hint: ['Type of the entity'],
                                category: ['people'],
                                label: ['Type'],
                                objectIViewer: ['BasicOptionView'],
                                objectIEditor: ['BasicOptionInput'],
                                options: [{
                                        label: 'Person',
                                        value: 'http://xmlns.com/foaf/0.1/Person'
                                    },
                                    {
                                        label: 'Organization',
                                        value: 'http://xmlns.com/foaf/0.1/Organization'
                                    }
                                ],
                                defaultValue: ['http://xmlns.com/foaf/0.1/Person'],
                                allowUserDefinedValue: 1
                            }
                        },
                        {
                            spec: {
                                propertyURI: 'http://www.w3.org/2000/01/rdf-schema#label',
                                instances: [{
                                    value: 'Label',
                                    valueType: 'literal'
                                }]
                            },
                            config: {
                                hint: ['A descriptor label for the URI'],
                                category: ['people'],
                                label: ['Label']
                            }
                        },
                        {
                            spec: {
                                propertyURI: 'http://xmlns.com/foaf/0.1/mbox',
                                instances: [{
                                    value: 'email address',
                                    valueType: 'literal'
                                }]
                            },
                            config: {
                                hint: ['A corresponding email address'],
                                category: ['people'],
                                label: ['Email']
                            }
                        }
                    ]
                },
                'http://purl.org/dc/terms/created': {
                    label: ['Created date'],
                    category: ['date'],
                    hint: ['A point or period of time associated with an event in the life-cycle of the resource. The value should be formatted as date and time format - ISO 8601'],
                    objectIEditor: ['BasicCalendarInput'],
                    allowNewValue: 1
                },
                'http://purl.org/dc/terms/issued': {
                    label: ['Date issued'],
                    category: ['date'],
                    hint: ['A point or period of time associated with an event in the life-cycle of the resource. The value should be formatted as date and time format - ISO 8601.'],
                    objectIEditor: ['BasicCalendarInput'],
                    allowNewValue: 1
                },
                'http://purl.org/dc/terms/modified': {
                    label: ['Date modified'],
                    category: ['date'],
                    hint: ['A point or period of time associated with an event in the life-cycle of the resource. The value should be formatted as date and time format - ISO 8601'],
                    objectIEditor: ['BasicCalendarInput'],
                    allowNewValue: 1
                },
                'http://purl.org/dc/terms/license': {
                    category: ['legalAspects'],
                    label: ['License'],
                    hint: ['Data without explicit license is a potential legal liability and leaves consumers unclear what the usage conditions are. Therefore, it is very important that publishers make explicit the terms under which the dataset can be used.'],
                    allowNewValue: 1,
                    objectIViewer: ['BasicOptionView'],
                    objectIEditor: ['BasicOptionInput'],
                    options: [{
                            label: 'Open Data Commons Public Domain Dedication and License (PDDL)',
                            value: 'http://www.opendatacommons.org/licenses/pddl/'
                        },
                        {
                            label: 'Open Data Commons Attribution License',
                            value: 'http://www.opendatacommons.org/licenses/by/'
                        },
                        {
                            label: 'Open Data Commons Open Database License (ODbL)',
                            value: 'http://www.opendatacommons.org/licenses/odbl/'
                        },
                        {
                            label: 'Creative Commons Public Domain Dedication',
                            value: 'http://creativecommons.org/publicdomain/zero/1.0/'
                        },
                        {
                            label: 'Creative Commons Attribution-ShareAlike',
                            value: 'http://creativecommons.org/licenses/by-sa/3.0/'
                        },
                        {
                            label: 'GNU Free Documentation License',
                            value: 'http://www.gnu.org/copyleft/fdl.html'
                        }
                    ],
                    defaultValue: ['http://creativecommons.org/licenses/by-sa/3.0/'],
                    allowUserDefinedValue: 1
                },
                'http://purl.org/dc/terms/rights': {
                    label: ['Rights'],
                    category: ['legalAspects'],
                    hint: ['This describes the rights under which the dataset can be used/reused.']
                },
                'http://purl.org/dc/terms/format': {
                    label: ['Dataset File format'],
                    allowNewValue: 1,
                    category: ['technicalAspects'],
                    hint: ['Technical features of a dataset.'],
                    objectIEditor: ['MediaTypeInput'],
                    allowUserDefinedValue: 1
                },
                'http://rdfs.org/ns/void#dataDump': {
                    label: ['Download address'],
                    category: ['technicalAspects'],
                    hint: ['If the dataset is available, then its location can be announced using this attribute. If the dataset is split into multiple dumps, then several values of this property can be provided.']
                },
                'http://rdfs.org/ns/void#exampleResource': {
                    label: ['Example of the resource'],
                    category: ['overview'],
                    hint: ['For documentation purposes, it can be helpful to name some representative example entities for a dataset. Looking up these entities allows users to quickly get an impression of the kind of data that is present in a dataset.'],
                    allowNewValue: 1
                },
                'http://rdfs.org/ns/void#vocabulary': {
                    isHidden: 1,
                    label: ['Vocabulary'],
                    category: ['overview'],
                    hint: ['Vocabularies used in the dataset.']
                },
                'http://www.w3.org/ns/dcat#byteSize': {
                    label: ['Size of the dataset'],
                    category: ['technicalAspects'],
                    hint: ['The size of the dataset. For example we could say that the dataset is 1.0 GB or 1024.0 MB'],
                    objectIEditor: ['FileSizelInput'],
                    objectIViewer: ['FileSizeView']
                },
                'http://www.w3.org/ns/dcat#accessURL': {
                    label: ['Access URL'],
                    category: ['technicalAspects'],
                    hint: ['A landing page, feed, SPARQL endpoint or other type of resource that gives access to the distribution of the dataset'],
                    allowNewValue: 1
                },
                'http://xmlns.com/foaf/0.1/homepage': {
                    label: ['Home Page'],
                    category: ['overview'],
                    hint: ['Web page where further information about the dataset can be found.']
                },
                'http://xmlns.com/foaf/0.1/page': {
                    label: ['Additional web pages'],
                    category: ['overview'],
                    hint: ['Additional web pages with relevant information that can not be considered the homepage of the dataset.'],
                    allowNewValue: 1
                },
                'http://vocab.org/waiver/terms/norms': {
                    label: ['Terms of use'],
                    category: ['legalAspects'],
                    hint: ['Norms are non-binding conditions of use that publishers would like to encourage the users of their data to adopt. representing the community norms for access and use of a resource.']
                },
                'http://vocab.org/waiver/terms/waiver': {
                    label: ['Waiver'],
                    category: ['legalAspects'],
                    hint: ['To the extent possible under law, The Example Organisation has waived all copyright and related or neighboring rights to The Example Dataset.'],
                    objectIEditor: ['BasicTextareaInput']
                },
                'http://purl.org/pav/version': {
                    isHidden: 1,
                    label: ['Version'],
                    category: ['overview'],
                    hint: ['The version of the dataset described by this document']
                },
                'http://rdf.risis.eu/metadata/dataModel': {
                    category: ['structuralAspects'],
                    label: ['Data Model'],
                    hint: ['The underlying data model. Whether it is RDF, Relational, etc. Add your own model if not exists in the option list.'],
                    allowNewValue: 1,
                    objectIViewer: ['BasicOptionView'],
                    objectIEditor: ['BasicOptionInput'],
                    options: [{
                            label: 'Relational Model',
                            value: 'Relational Model'
                        },
                        {
                            label: 'RDF Model',
                            value: 'RDF Model'
                        },
                        {
                            label: 'Tabular (Spreadsheet) Model',
                            value: 'Tabular Model'
                        },
                        {
                            label: 'Unstructured',
                            value: 'Unstructured'
                        }
                    ],
                    placeholder: ['Enter the value for other data model...'],
                    defaultValue: ['Relational Model'],
                    allowUserDefinedValue: 1
                },
                'http://rdfs.org/ns/void#class': {
                    category: ['structuralAspects'],
                    label: ['Entity Types'],
                    hint: ['The specification of entity types in your dataset.'],
                    allowNewValue: 1,
                    allowExtension: 1,
                    hasBlankNode: 1,
                    extensions: [{
                            spec: {
                                propertyURI: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
                                instances: [{
                                    value: 'http://xmlns.com/foaf/0.1/Person',
                                    valueType: 'uri'
                                }]
                            },
                            config: {
                                label: ['Type'],
                                objectIViewer: ['BasicOptionView'],
                                objectIEditor: ['BasicOptionInput'],
                                category: ['structuralAspects'],
                                options: [{
                                        label: 'Person',
                                        value: 'http://xmlns.com/foaf/0.1/Person'
                                    },
                                    {
                                        label: 'Organization',
                                        value: 'http://xmlns.com/foaf/0.1/Organization'
                                    },
                                    {
                                        label: 'Higher Education Institution',
                                        value: 'http://purl.org/vocab/aiiso/schema#Institution'
                                    },
                                    {
                                        label: 'Firm',
                                        value: 'http://rdf.risis.eu/metadata/Firm'
                                    },
                                    {
                                        label: 'Funding Body',
                                        value: 'http://vivoweb.org/ontology/core#FundingOrganization'
                                    },
                                    {
                                        label: 'Publication',
                                        value: 'http://purl.org/cerif/frapo/Publication'
                                    },
                                    {
                                        label: 'Patent',
                                        value: 'http://purl.org/ontology/bibo/Patent'
                                    },
                                    {
                                        label: 'Project',
                                        value: 'http://purl.org/cerif/frapo/Project'
                                    },
                                    {
                                        label: 'Investment',
                                        value: 'http://purl.org/cerif/frapo/Investment'
                                    },
                                    {
                                        label: 'FundingProgramme',
                                        value: 'http://purl.org/cerif/frapo/FundingProgramme'
                                    },
                                    {
                                        label: 'Policy',
                                        value: 'http://purl.org/dc/terms/Policy'
                                    },
                                    {
                                        label: 'Policy Evaluation',
                                        value: 'http://rdf.risis.eu/metadata/PolicyEvaluation'
                                    }
                                ],
                                placeholder: ['Enter the URI for your specific entity type...'],
                                allowUserDefinedValue: 1
                            }
                        },
                        {
                            spec: {
                                propertyURI: 'http://purl.org/dc/terms/description',
                                instances: [{
                                    value: '',
                                    valueType: 'literal'
                                }]
                            },
                            config: {
                                label: ['Description'],
                                category: ['structuralAspects'],
                                objectIEditor: ['BasicTextareaInput']
                            }
                        },
                        {
                            spec: {
                                propertyURI: 'http://rdfs.org/ns/void#property',
                                instances: [{
                                    value: '',
                                    valueType: 'literal'
                                }]
                            },
                            config: {
                                category: ['structuralAspects'],
                                label: ['Attributes']
                            }
                        },
                        {
                            spec: {
                                propertyURI: 'http://purl.org/dc/terms/temporal',
                                instances: [{
                                    value: 'http://example.org/temporal',
                                    valueType: 'uri'
                                }]
                            },
                            config: {
                                category: ['structuralAspects'],
                                label: ['Time Coverage'],
                                hasBlankNode: 1,
                                autoLoadDetails: 1,
                                allowExtension: 1,
                                extensions: [{
                                        spec: {
                                            propertyURI: 'http://rdf-vocabulary.ddialliance.org/discovery#startDate',
                                            instances: [{
                                                value: '2010-12-24',
                                                valueType: 'literal'
                                            }]
                                        },
                                        config: {
                                            label: ['Start date'],
                                            category: ['date'],
                                            hint: ['Start date of the time coverage.'],
                                            objectIEditor: ['BasicCalendarInput']
                                        }
                                    },
                                    {
                                        spec: {
                                            propertyURI: 'http://rdf-vocabulary.ddialliance.org/discovery#endDate',
                                            instances: [{
                                                value: '2015-12-24',
                                                valueType: 'literal'
                                            }]
                                        },
                                        config: {
                                            label: ['End date'],
                                            category: ['date'],
                                            hint: ['End date of the time coverage.'],
                                            objectIEditor: ['BasicCalendarInput']
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            spec: {
                                propertyURI: 'http://purl.org/dc/terms/spatial',
                                instances: [{
                                    value: 'http://dbpedia.org/resource/Germany',
                                    valueType: 'uri'
                                }]
                            },
                            config: {
                                category: ['structuralAspects'],
                                label: ['Geographical Coverage'],
                                allowNewValue: 1,
                                objectReactor: ['AggregateObject'],
                                objectAViewer: ['DBpediaMapView'],
                                objectIViewer: ['BasicDBpediaView'],
                                asWikipedia: 1,
                                objectIEditor: ['DBpediaInput'],
                                lookupClass: ['Place']
                            }
                        },
                    ]
                }
            },
            //for mappings
            'http://ld-r.org/mappings': {
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#csvFile': {
                    readOnlyProperty: 1,
                    label: ['CSV File']
                },
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#skippedColumns': {
                    allowNewValue: 1,
                    allowPropertyDelete: 1,
                    label: ['Skipped Columns'],
                    hint: ['The selected columns will not be included in the generated RDF file.']
                },
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#idColumn': {
                    label: ['ID Column'],
                    hint: ['A combination of this column and the resource prefix will be used to create URIs for the entities.']
                },
                'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': {
                    readOnlyProperty: 1,
                    isHidden: 1
                },
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#entityType': {
                    objectIEditor: ['PrefixBasedInput'],
                    objectIViewer: ['PrefixBasedView'],
                    includeOnly: ['classes']
                }
            },
            //for configuration manager
            'http://ld-r.org/configurations': {
                'http://www.w3.org/2000/01/rdf-schema#label': {
                    allowPropertyDelete: 0,
                    label: ['Description'],
                    allowNewValue: 0
                },
                'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': {
                    isHidden: 0,
                    shortenURI: 0
                },
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#scope': {
                    hint: ['Determines the type of scope in LD-R'],
                    objectIEditor: ['BasicOptionInput'],
                    objectIViewer: ['BasicOptionView'],
                    options: [{
                            label: 'Dataset',
                            value: 'D'
                        },
                        {
                            label: 'Resource',
                            value: 'R'
                        },
                        {
                            label: 'Property',
                            value: 'P'
                        },
                        {
                            label: 'Dataset-Resource',
                            value: 'DR'
                        },
                        {
                            label: 'Dataset-Property',
                            value: 'DP'
                        },
                        {
                            label: 'Resource-Property',
                            value: 'RP'
                        },
                        {
                            label: 'Dataset-Resource-Property',
                            value: 'DRP'
                        },
                    ],
                    allowNewValue: 0
                },
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#dataset': {
                    shortenURI: 0
                },
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#property': {
                    shortenURI: 0,
                    objectIViewer: ['PrefixBasedView'],
                    objectIEditor: ['PrefixBasedInput']
                },
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#resource': {
                    shortenURI: 0,
                    objectIViewer: ['PrefixBasedView'],
                    objectIEditor: ['PrefixBasedInput']
                },
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#resourceFocusType': {
                    shortenURI: 0,
                    objectIViewer: ['PrefixBasedView'],
                    objectIEditor: ['PrefixBasedInput']
                },
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#resourceLabelProperty': {
                    shortenURI: 0,
                    objectIViewer: ['PrefixBasedView'],
                    objectIEditor: ['PrefixBasedInput']
                },
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#constraint': {
                    label: ['Constraint'],
                    allowExtension: 1,
                    hasBlankNode: 1,
                    extensions: [{
                            spec: {
                                propertyURI: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
                                instances: [{
                                    value: 'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#Constraint',
                                    valueType: 'uri'
                                }]
                            },
                            config: {
                                label: ['Type'],
                                objectIViewer: ['PrefixBasedView'],
                                objectIEditor: ['PrefixBasedInput']
                            }
                        },
                        {
                            spec: {
                                propertyURI: 'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#property',
                                instances: [{
                                    value: 'http://exampleProperty.com',
                                    valueType: 'uri'
                                }]
                            },
                            config: {
                                label: ['Property'],
                                objectIViewer: ['PrefixBasedView'],
                                objectIEditor: ['PrefixBasedInput']
                            }
                        },
                        {
                            spec: {
                                propertyURI: 'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#object',
                                instances: [{
                                    value: 'value',
                                    valueType: 'literal'
                                }]
                            },
                            config: {
                                label: ['Object Value']
                            }
                        },
                        {
                            spec: {
                                propertyURI: 'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#enabled',
                                instances: [{
                                    value: '1',
                                    valueType: 'literal'
                                }]
                            },
                            config: {
                                label: ['Enabled'],
                                objectIViewer: ['ToggleView'],
                                objectIEditor: ['ToggleEdit'],
                                onValue: ['1'],
                                offValue: ['0'],
                            }
                        },
                    ]
                },
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#config': {
                    label: ['Configuration'],
                    allowExtension: 1,
                    hasBlankNode: 1,
                    extensions: [{
                            spec: {
                                propertyURI: 'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#label',
                                instances: [{
                                    value: 'Label',
                                    valueType: 'literal'
                                }]
                            },
                            config: {
                                label: ['Label']
                            }
                        },
                        {
                            spec: {
                                propertyURI: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
                                instances: [{
                                    value: 'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#FacetsPropertyConfig',
                                    valueType: 'uri'
                                }]
                            },
                            config: {
                                label: ['Type'],
                                objectIViewer: ['PrefixBasedView'],
                                objectIEditor: ['PrefixBasedInput']
                            }
                        },
                        {
                            spec: {
                                propertyURI: 'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#property',
                                instances: [{
                                    value: 'http://example.com/prop1',
                                    valueType: 'uri'
                                }]
                            },
                            config: {
                                label: ['Property'],
                                objectIViewer: ['PrefixBasedView'],
                                objectIEditor: ['PrefixBasedInput']
                            }
                        }
                    ]
                },
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#list': {
                    shortenURI: 0,
                    objectIViewer: ['PrefixBasedView'],
                    objectIEditor: ['PrefixBasedInput']
                },
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#treatAsResourceType': {
                    label: ['Treat as Resource Type'],
                    hint: ['If set to true, will consider resource URI as type URI for resource'],
                    objectIViewer: ['ToggleView'],
                    objectIEditor: ['ToggleEdit'],
                    onValue: ['1'],
                    offValue: ['0'],
                    allowNewValue: 0
                },
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#useReasoning': {
                    label: ['Use Reasoning?'],
                    objectIViewer: ['ToggleView'],
                    objectIEditor: ['ToggleEdit'],
                    onValue: ['1'],
                    offValue: ['0'],
                    allowNewValue: 0
                },
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#host': {
                    allowNewValue: 0
                },
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#port': {
                    allowNewValue: 0
                },
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#path': {
                    allowNewValue: 0
                },
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#graphName': {
                    label: ['Graph Name'],
                    hint: ['use "default" to consider all graph names'],
                    allowNewValue: 0
                },
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#endpointType': {
                    label: ['Endpoint Type'],
                    allowNewValue: 0,
                    objectIEditor: ['BasicOptionInput'],
                    objectIViewer: ['BasicOptionView'],
                    allowUserDefinedValue: 1,
                    options: [
                        {label: 'ClioPatria', value: 'cliopatria'},
                        {label: 'Virtuoso', value: 'virtuoso'},
                        {label: 'Stardog', value: 'stardog'},
                        {label: 'Blazegraph', value: 'blazegraph'},
                        {label: 'GraphDB', value: 'graphdb'},
                        {label: 'Sesame', value: 'sesame'}
                    ]
                }
            },
            //for user page
            'http://demo.ld-r.org/users': {
                'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': {
                    isHidden: 1
                },
                'http://xmlns.com/foaf/0.1/accountName': {
                    label: ['Username'],
                    readOnlyProperty: 1
                },
                'http://xmlns.com/foaf/0.1/member': {
                    label: ['Member of'],
                    objectIEditor: ['BasicOptionInput'],
                    objectIViewer: ['BasicOptionView'],
                    options: [
                        {label: 'Normal User', value: 'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#NormalUser'},
                        {label: 'Special User', value: 'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#SpecialUser'}
                    ],
                    allowNewValue: 1
                },
                'http://xmlns.com/foaf/0.1/firstName': {
                    label: ['First Name']
                },
                'http://xmlns.com/foaf/0.1/lastName': {
                    label: ['Last Name']
                },
                'http://purl.org/dc/terms/created': {
                    label: ['Created at'],
                    readOnlyProperty: 1
                },
                'http://xmlns.com/foaf/0.1/mbox': {
                    label: ['Email Address'],
                    readOnlyProperty: 1
                },
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#password': {
                    label: ['Password'],
                    objectIViewer: ['PasswordView'],
                    objectIEditor: ['PasswordInput']
                },
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#editorOf': {
                    label: ['Editor of Scope'],
                    allowNewValue: 1,
                    allowExtension: 1,
                    hasBlankNode: 1,
                    extensions: [
                        {
                            spec: {
                                propertyURI: 'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#scope',
                                instances: [{value: 'D', valueType: 'literal'}]
                            },
                            config: {
                                hint: ['Scope of access: e.g. D, DP, R, RP, P , etc.'],
                                label: ['Scope'],
                                objectIEditor: ['BasicOptionInput'],
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
                            }
                        },
                        {
                            spec: {
                                propertyURI: 'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#dataset',
                                instances: [{value: 'http://exampleDataset.org', valueType: 'uri'}]
                            },
                            config: {
                                hint: ['Dataset URI under which the property is exposed.'],
                                label: ['Dataset']
                            }
                        },
                        {
                            spec: {
                                propertyURI: 'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#resource',
                                instances: [{value: 'http://exampleResource.org', valueType: 'uri'}]
                            },
                            config: {
                                hint: ['Resource URI under which the property is exposed.'],
                                label: ['Resource'],
                                objectIEditor: ['PrefixBasedInput'],
                                objectIViewer: ['PrefixBasedView']
                            }
                        },
                        {
                            spec: {
                                propertyURI: 'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#property',
                                instances: [{value: 'http://exampleProperty.org', valueType: 'uri'}]
                            },
                            config: {
                                hint: ['Property URI'],
                                label: ['Property'],
                                objectIEditor: ['PrefixBasedInput'],
                                objectIViewer: ['PrefixBasedView']
                            }
                        }
                    ]
                },
                'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#viewerOf': {
                    label: ['Viewer of Scope'],
                    allowNewValue: 1,
                    allowExtension: 1,
                    hasBlankNode: 1,
                    extensions: [
                        {
                            spec: {
                                propertyURI: 'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#scope',
                                instances: [{value: 'D', valueType: 'literal'}]
                            },
                            config: {
                                hint: ['Scope of access: e.g. D, DP, R, RP, P , etc.'],
                                label: ['Scope'],
                                objectIEditor: ['BasicOptionInput'],
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
                            }
                        },
                        {
                            spec: {
                                propertyURI: 'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#dataset',
                                instances: [{value: 'http://exampleDataset.org', valueType: 'uri'}]
                            },
                            config: {
                                hint: ['Dataset URI under which the property is exposed.'],
                                label: ['Dataset']
                            }
                        },
                        {
                            spec: {
                                propertyURI: 'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#resource',
                                instances: [{value: 'http://exampleResource.org', valueType: 'uri'}]
                            },
                            config: {
                                hint: ['Resource URI under which the property is exposed.'],
                                label: ['Resource'],
                                objectIEditor: ['PrefixBasedInput'],
                                objectIViewer: ['PrefixBasedView']
                            }
                        },
                        {
                            spec: {
                                propertyURI: 'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#property',
                                instances: [{value: 'http://exampleProperty.org', valueType: 'uri'}]
                            },
                            config: {
                                hint: ['Property URI'],
                                label: ['Property'],
                                objectIEditor: ['PrefixBasedInput'],
                                objectIViewer: ['PrefixBasedView']
                            }
                        }
                    ]
                },
                'http://xmlns.com/foaf/0.1/organization': {
                    label: ['Organization'],
                    allowNewValue: 1,
                    objectIViewer: ['BasicDBpediaView'],
                    objectIEditor: ['DBpediaInput']
                }
            }
        },
        resource_property: {

        },
        //---------depth 3------------
        dataset_resource_property: {

        }
    }
};
