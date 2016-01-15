'use strict';
import rp from 'request-promise';
import LotusUtil from './utils/LotusUtil';
const LotusEndpoint = 'http://lotus.lodlaundromat.org';
//const LotusEndpoint = 'http://lotus.fii800.eculture.labs.vu.nl';
let query, size, algorithm, langTag;
let utilObject = new LotusUtil();

export default {
    // Name is the resource. Required.
    name: 'lotus',
    // At least one of the CRUD methods is Required
    read: (req, resource, params, config, callback) => {
        if (resource === 'lotus.search') {
            query = params.query;
            size = params.size ? params.size : 50;
            algorithm = params.algorithm ? params.algorithm : 'terms';
            langTag = params.langTag ? params.langTag : '';
            //send request
            rp({method: 'get', headers: {'Accept': 'application/json'}, accept: 'application/json', uri: LotusEndpoint +'/retrieve?match=' + algorithm + '/?string=' + query + '&size=' + size + '&langtag=' + langTag}).then(function(res){
                callback(null, {
                    suggestions: utilObject.parseLotusLookup(res)
                });
            }).catch(function (err) {
                console.log('\n Status Code: \n' + err.statusCode + '\n Error Msg: \n' + err.message);
                callback(null, {suggestions: []});
            });
        /////////////////////////////////////////////
        } else if (resource === 'lotus.etc') {

        }
    }
    // other methods
    // create: function(req, resource, params, body, config, callback) {},
    // update: function(req, resource, params, body, config, callback) {},
    // delete: function(req, resource, params, config, callback) {}
};
