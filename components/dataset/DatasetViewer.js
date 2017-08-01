import React from 'react';
import BasicResourceList from './viewer/BasicResourceList';
import ScatterChartView from './viewer/ScatterChartView';

class DatasetViewer extends React.Component {
    render() {
        let viewer, viewerConfig = '';
        if(this.props.config){
            if(this.props.config.datasetViewer){
                viewerConfig = this.props.config.datasetViewer[0];
            }
        }
        switch(viewerConfig){
            case 'BasicResourceList':
                viewer = <BasicResourceList enableAuthentication={this.props.enableAuthentication} resources={this.props.resources} datasetURI={this.props.datasetURI} isBig={this.props.isBig} config={this.props.config} cloneable={this.props.cloneable} onCloneResource={this.props.onCloneResource} OpenInNewTab={this.props.OpenInNewTab}/>;
                break;
            case 'ScatterChartView':
                viewer = <ScatterChartView enableAuthentication={this.props.enableAuthentication} resources={this.props.resources} datasetURI={this.props.datasetURI} isBig={this.props.isBig} config={this.props.config} cloneable={this.props.cloneable} onCloneResource={this.props.onCloneResource} OpenInNewTab={this.props.OpenInNewTab}/>;
                break;
            default:
                viewer = <BasicResourceList enableAuthentication={this.props.enableAuthentication} resources={this.props.resources} datasetURI={this.props.datasetURI} isBig={this.props.isBig} config={this.props.config} cloneable={this.props.cloneable} onCloneResource={this.props.onCloneResource} OpenInNewTab={this.props.OpenInNewTab}/>;
        }
        return (
            <div className="ui" ref="datasetViewer">
                {viewer}
            </div>
        );
    }
}

export default DatasetViewer;
