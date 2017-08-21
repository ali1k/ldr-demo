import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {connectToStores} from 'fluxible-addons-react';
import DatasetAnnotationStore from '../stores/DatasetAnnotationStore';
import {navigateAction} from 'fluxible-router';
import {enableAuthentication, enableDatasetAnnotation, baseResourceDomain} from '../configs/general';
import { Button, Divider, Form, Progress } from 'semantic-ui-react';
import url from 'url';
import collectData from '../actions/collectData';
import annotateCollectedDataset from '../actions/annotateCollectedDataset';
import countAnnotatedResourcesWithProp from '../actions/countAnnotatedResourcesWithProp';
import countCollectedResources from '../actions/countCollectedResources';

let cCounter = [];

class TwitterAnalysis extends React.Component {
    constructor(props){
        super(props);
        this.state = {screenName: '', mode: 'form', datasetURI: ''};
        cCounter = [];
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {
        if(this.state.mode === 'annotation'){
            let tags = this.prepareTagsForCloud(this.props.DatasetAnnotationStore.tags);
            if(tags.length){
                //$('.tagCloud').jQCloud(this.prepareTagsForCloud(this.props.DatasetAnnotationStore.tags));
                $('.tagCloud').jQCloud('update', tags, {autoResize: true});
            }
        }
    }
    prepareTagsForCloud(obj){
        let tags = [];
        for(let prop in obj){
            tags.push({link: prop, weight: obj[prop].count, text: obj[prop].text, html: {title: obj[prop].count, target: '_blank'}});
        }
        return tags;
    }
    handleChange(element, e){
        if(element=== 'datasetURI'){
            if(e.target.value){
                this.setState({datasetURI: e.target.value.trim()});
            }else{
                this.setState({datasetURI: ''});
            }
        }else if(element=== 'resourceType'){
            this.setState({resourceType: e.target.value.trim()});
        }else if(element=== 'propertyURI'){
            this.setState({propertyURI: e.target.value.trim()});
        }
    }
    startInterval(){
        let self=this;
        cCounter = [];
        //set an interval for progress bar
        let intervalId = setInterval(()=>{
            cCounter.push(self.props.DatasetAnnotationStore.stats.annotated);
            self.context.executeAction(countAnnotatedResourcesWithProp, {
                id: self.state.datasetURI,
                inANewDataset: 0,
                resourceType: 'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#Tweet',
                propertyURI: 'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#text',
                storingDataset: ''
            });
            if(self.props.DatasetAnnotationStore.stats.annotated && self.props.DatasetAnnotationStore.stats.annotated===self.props.DatasetAnnotationStore.stats.total){
                clearInterval(intervalId);
            }
            if(cCounter.length > 9){
                if(cCounter[cCounter.length-1] === cCounter[cCounter.length-2] && cCounter[cCounter.length-1] === cCounter[cCounter.length-3] && cCounter[cCounter.length-1] === cCounter[cCounter.length-4] && cCounter[cCounter.length-1] === cCounter[cCounter.length-5] && cCounter[cCounter.length-1] === cCounter[cCounter.length-6] && cCounter[cCounter.length-1] === cCounter[cCounter.length-7] && cCounter[cCounter.length-1] === cCounter[cCounter.length-8] && cCounter[cCounter.length-1] === cCounter[cCounter.length-9]){
                    clearInterval(intervalId);
                }
            }
        }, 2200);
        this.setState({intervalId: intervalId});
    }
    startCollectInterval(){
        const rtype = 'ldr:Tweet';
        let self=this;
        //set an interval for progress bar
        let intervalId = setInterval(()=>{
            cCounter.push(self.props.DatasetAnnotationStore.stats.collected);
            self.context.executeAction(countCollectedResources, {
                datasetURI: self.state.datasetURI,
                resourceType: rtype
            });
            //after 5 repeats go to the completed phase: analysis starts
            if(cCounter.length > 5){
                if(cCounter[cCounter.length-1] === cCounter[cCounter.length-2] && cCounter[cCounter.length-1] === cCounter[cCounter.length-3] && cCounter[cCounter.length-1] === cCounter[cCounter.length-4] && cCounter[cCounter.length-1] === cCounter[cCounter.length-5]){
                    clearInterval(intervalId);
                    self.handleAnnotateDataset();
                    self.setState({mode: 'annotation'});
                }
            }
        }, 2200);
    }
    handleCollectTweets() {
        let self=this;
        //create a new random dataset URI
        let newDatasetURI = baseResourceDomain[0] + '/atweets' + Math.round(+new Date() / 1000);
        //do not add two slashes
        if(baseResourceDomain[0].slice(-1) === '/'){
            newDatasetURI = baseResourceDomain[0] + 'atweets' + Math.round(+new Date() / 1000);
        }
        if(this.state.screenName.trim()){
            newDatasetURI = 'https://twitter.com/' + this.state.screenName.trim();
            this.setState({mode: 'collection', datasetURI: newDatasetURI});
            self.startCollectInterval();
            //collect Tweets
            this.context.executeAction(collectData, {
                datasetURI: newDatasetURI,
                source: 'twitter',
                options: {screenName: this.state.screenName.trim()},
            });
        }
    }
    handleAnnotateDataset() {
        let self=this;
        if(self.state.datasetURI){
            self.startInterval();
            self.setState({mode: 'annotatation'});
            self.context.executeAction(annotateCollectedDataset, {
                id: self.state.datasetURI,
                resourceType: 'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#Tweet',
                propertyURI: 'https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#text',
                storingDataset: self.state.datasetURI,
                datasetLabel: self.state.screenName + ' tweets',
                noDynamicConfig: 0,
                source: 'twitter',
                options: {screenName: this.state.screenName.trim()},
            });
        }
    }

    handleScreenNameChange(event) {
        this.setState({screenName: event.target.value});
    }
    render() {
        let self = this, errorDIV='', formDIV='';
        let user;
        //do not query for user each time we annotate content!
        if(this.state.mode !== 'collection' && this.state.mode !== 'annotation'){
            user = this.context.getUser();
        }

        if(enableAuthentication && (this.state.mode !== 'collection' && this.state.mode !== 'annotation') && !user){
            errorDIV = <div className="ui warning message"><div className="header"> Please <a href="/register">Register</a> or <a href="/login">Login</a> to see the datasets.</div></div>;
        }
        let tagsDIV ='';
        if(!errorDIV){
            if(this.state.mode === 'form'){
                formDIV =
                <Form size='big'>
                    <input ref="screenName" type="text" value={this.state.screenName} placeholder="Your twitter screen name" onChange={this.handleScreenNameChange.bind(this)} />
                    <Divider hidden />
                    <div className='ui big blue button' onClick={this.handleCollectTweets.bind(this)}>Collect and Analyze</div>
                    <Divider hidden />
                </Form>;
            }
        }
        let progressDIV = '';
        if(this.state.mode === 'collection'){
            formDIV = '';
            progressDIV = <div>
                <div className='ui list'>
                    <div className='item'>Dataset: <b><a href={'/dataset/1/'+encodeURIComponent(this.state.datasetURI)} target="_blank">{this.state.screenName} tweets</a></b>  </div>
                </div>
                { 0 ?
                    <Progress percent={100} progress success>
                        Collected {this.props.DatasetAnnotationStore.stats.collected} items
                    </Progress>
                    :
                    <div>
                        <Progress percent={this.props.DatasetAnnotationStore.stats.collected ? Math.floor((this.props.DatasetAnnotationStore.stats.collected / 1000) * 100) : 0} progress active color='orange'>
                            Collected {this.props.DatasetAnnotationStore.stats.collected} items
                        </Progress>
                    </div>
                }
            </div>
        }
        if(this.state.mode === 'annotation'){
            formDIV = '';
            progressDIV = <div>
                <div className='ui list'>
                    <div className='item'>Dataset: <b><a href={'/dataset/1/'+encodeURIComponent(this.state.datasetURI)} target="_blank">{this.state.screenName} tweets</a></b></div>
                </div>
                { (this.props.DatasetAnnotationStore.stats.annotated && this.props.DatasetAnnotationStore.stats.annotated===this.props.DatasetAnnotationStore.stats.total) ?
                    <Progress percent={100} progress success>
                        Enriched {this.props.DatasetAnnotationStore.stats.annotated} out of {this.props.DatasetAnnotationStore.stats.total} items
                    </Progress>
                    :
                    <div>
                        <Progress percent={this.props.DatasetAnnotationStore.stats.annotated ? Math.floor((this.props.DatasetAnnotationStore.stats.annotated / this.props.DatasetAnnotationStore.stats.total) * 100) : 0} progress active color='blue'>
                            Enriched {this.props.DatasetAnnotationStore.stats.annotated} out of {this.props.DatasetAnnotationStore.stats.total} items
                        </Progress>
                        <div className="ui raised stacked segments">
                            <div className="ui secondary compact segment">
                                <a href={'/dataset/' + encodeURIComponent(this.state.datasetURI) + '/resource/'+encodeURIComponent(this.props.DatasetAnnotationStore.currentID)} target="_blank">{this.props.DatasetAnnotationStore.currentID}</a>
                            </div>
                            <div className="ui compact segment">
                                <div dangerouslySetInnerHTML={{__html: this.props.DatasetAnnotationStore.annotatedText}} />
                            </div>
                        </div>
                    </div>
                }
                <div className='ui segment'>
                    <div ref="tagCloud" className="tagCloud" style={{minHeight: 300, minWidth: 300}}></div>
                    {tagsDIV}
                </div>
            </div>
        }
        return (
            <div className="ui fluid container ldr-padding-more" ref="datasets">
                <div className="ui grid">
                    <div className="ui column">
                        <h2>Analyze Your Tweets</h2>
                        {errorDIV}
                        {formDIV}
                        {progressDIV}
                    </div>
                </div>
            </div>
        );
    }
}
TwitterAnalysis.contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getUser: PropTypes.func
};
TwitterAnalysis = connectToStores(TwitterAnalysis, [DatasetAnnotationStore], function (context, props) {
    return {
        DatasetAnnotationStore: context.getStore(DatasetAnnotationStore).getState()
    };
});
export default TwitterAnalysis;
