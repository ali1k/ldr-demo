'use strict';
class LotusUtil{
    constructor() {

    }
    parseLotusLookup(body) {
      let entities = {};
      let parsed = JSON.parse(body);
      if(!parsed){
        return output;
      }
      parsed.hits.forEach(function(el) {
          if(entities[encodeURIComponent(el.subject)]){
              if(entities[encodeURIComponent(el.subject)][encodeURIComponent(el.predicate)]){
                  entities[encodeURIComponent(el.subject)][encodeURIComponent(el.predicate)].push({object:el.string, docid: el.docid, score: el.score});
              }else{
                entities[encodeURIComponent(el.subject)][encodeURIComponent(el.predicate)] = [{object:el.string, docid: el.docid, score: el.score}];
              }
          }else{
              entities[encodeURIComponent(el.subject)] = {};
              entities[encodeURIComponent(el.subject)][encodeURIComponent(el.predicate)] = [{object: el.string, docid: el.docid, score: el.score}];
          }
      });
      return entities;
    }

}
export default LotusUtil;
