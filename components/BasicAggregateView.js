import React from 'react';
import IndividualDataView from './IndividualDataView';

class BasicAggregateView extends React.Component {
    render() {
        let self = this;
        let list = this.props.spec.instances.map(function(node, index) {
            if(!node){
                return undefined; // stop processing this iteration
            }
            return (<div key={index} className="item"><IndividualDataView spec={node} config={self.props.config}/></div>);
        });
        return (
            <div className="ui horizontal list" ref="basicAggregateView">
                {list}
            </div>
        );
    }
}

export default BasicAggregateView;
