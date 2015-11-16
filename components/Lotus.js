import React from 'react';
import ReactDOM from 'react-dom';
import LotusStore from '../stores/LotusStore';
import {navigateAction} from 'fluxible-router';
import {connectToStores} from 'fluxible-addons-react';
import {defaultGraphName, authGraphName, enableAuthentication} from '../configs/general';
import {config} from '../configs/reactor';
import URIUtil from './utils/URIUtil';
import lotusSearch from '../actions/lotusSearch';

class Lotus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {query: '', advancedMode: 0, resultsSize: 100, algorithm: 'terms', langTag: ''};
    }
    componentDidMount() {

    }
    handleAdvanced() {
        this.setState({advancedMode: !this.state.advancedMode});
    }
    handleKeyDown(evt) {
        switch (evt.keyCode) {
            //case 9: // Tab
            case 13: // Enter
                this.handleSearch()
                break;
        }
    }
    handleResultsSize(evt) {
        this.setState({resultsSize: evt.target.value});
    }
    handleAlgorithm(evt) {
        this.setState({algorithm: evt.target.value});
    }
    handleLanguage(evt) {
        this.setState({langTag: evt.target.value});
    }
    handleSearch() {
        let keyword = jQuery.trim(this.refs.keyword.value);
        if(keyword.length > 2){
            this.context.executeAction(lotusSearch, {
                query: keyword,
                size: this.state.resultsSize,
                algorithm: this.state.algorithm,
                langTag: this.state.langTag
            });
        }else{

        }
    }
    render() {
        let propList, objList, list = [], self = this;
        let counter = 0, user = this.context.getUser();
        if(this.props.LotusStore.suggestions){
            for (var key in this.props.LotusStore.suggestions) {
                counter++;
                propList = [];
                for (var key2 in this.props.LotusStore.suggestions[key]) {
                    let objects = [];
                    objList = this.props.LotusStore.suggestions[key][key2].map(function(node, index) {
                        if(objects.indexOf(node.object) === -1){
                            objects.push(node.object);
                            return (
                                <span className="item" key={index}>{node.object} <a href={'/dataset/' + encodeURIComponent('http://lodlaundromat.org/sparql/') + '/resource/' + encodeURIComponent('http://lodlaundromat.org/resource/' + node.docid)} title={'score: ' + node.score} target="_blank"><i className="file text icon"></i></a></span>
                            );
                        }else{
                            return (
                                <span className="item" key={index}><a href={'/dataset/' + encodeURIComponent('http://lodlaundromat.org/sparql/') + '/resource/' + encodeURIComponent('http://lodlaundromat.org/resource/' + node.docid)} title={'score: ' + node.score} target="_blank"><i className="file text icon"></i></a></span>
                            );
                        }
                    });
                    propList.push(<div className="item" key={key2}><a className="ui right pointing blue basic label" href={decodeURIComponent(key2)} target="_blank">{URIUtil.getURILabel(decodeURIComponent(key2))}</a> <div className="ui horizontal list">{objList}</div></div>);
                }
                list.push(<div className="ui segments" key={key}>
                        <a href={decodeURIComponent(key)} target="_blank">
                            <div className="ui segment secondary">
                             {URIUtil.truncateMiddle(decodeURIComponent(key), 50, '')}
                            </div>
                        </a>
                        <div className="ui blue segment">
                            {propList}
                        </div>
                        </div>);
            }
        }
        return (
            <div className="ui page grid" ref="lotus">
              <div className="ui row">
                <div className="center aligned column">
                    <div className="ui">
                        <div className="ui fluid category search">
                          <div className="ui large icon input">
                            <input ref="keyword" className="prompt" type="text" placeholder="Search in Linked Open Data..." style={{width: '500'}} onKeyDown={this.handleKeyDown.bind(this)}/>
                            <i className="search icon"></i>
                          </div>
                          &nbsp;<button className="ui grey circular button" onClick={this.handleSearch.bind(this)}>LOD Search</button>
                      &nbsp;{this.state.advancedMode ? <button title="hide search settings" className="circular brown ui icon button" onClick={this.handleAdvanced.bind(this)}><i className="icon settings"></i></button> : <button title="show search settings" className="circular ui icon button"onClick={this.handleAdvanced.bind(this)}><i className="icon settings"></i></button>}
                          <div className="ui">
                              <br/>
                              {!this.state.advancedMode ? '' : <div><div className="ui left aligned warning message">
                                <i className="close icon" onClick={this.handleAdvanced.bind(this)}></i>
                                <div>
                                    <div className="ui labeled input"><div className="ui yellow label">Max. Results Size</div><input ref="resultsSize" type="text" style={{width: '80'}} defaultValue={this.state.resultsSize} onChange={this.handleResultsSize.bind(this)} /></div>
                                    <div className="ui labeled input"><div className="ui yellow label">Language</div><input ref="langTag" type="text" style={{width: '80'}} defaultValue={this.state.langTag} onChange={this.handleLanguage.bind(this)} /></div>
                                    <div className="ui labeled input"><div className="ui yellow label">String Similarity Method</div><select style={{width: '120'}} className="ui search dropdown" ref="algorithm" value={this.state.algorithm} onChange={this.handleAlgorithm.bind(this)}>
                                        <option value="terms"> terms </option>
                                        <option value="phrase"> phrase </option>
                                        <option value="conjunct"> conjunct </option>
                                        <option value="fuzzyconjunct"> fuzzyconjunct </option>
                                    </select></div>

                                </div>
                              </div></div>}
                          </div>
                        </div>
                    </div>
                </div>
              </div>
              <div className="ui row">
                <div className="column">

                    <div className="ui relaxed">
                        {this.props.LotusStore.isComplete ? '' : <span><img src="/assets/img/loader.gif" alt="loading..."/> searching...</span>}
                        {list.length ? <div><b>{counter}</b> resource(s) listed below: {list}</div> : ''}
                    </div>
                </div>
              </div>
            </div>
        );
    }
}
Lotus.contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
    getUser: React.PropTypes.func
};
Lotus = connectToStores(Lotus, [LotusStore], function (context, props) {
    return {
        LotusStore: context.getStore(LotusStore).getState()
    };
});
export default Lotus;
