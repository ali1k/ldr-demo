import React from 'react';
import PropertyHeader from '../property/PropertyHeader';
import ObjectBrowser from '../object/ObjectBrowser';
import SearchInput from 'react-search-input';
import URIUtil from '../utils/URIUtil';
import YASQEViewer from '../object/viewer/individual/YASQEViewer';
import {Dropdown, Icon} from 'semantic-ui-react';

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

class Facet extends React.Component {
    constructor(props){
        super(props);
        this.state = {searchTerm: '', expanded: 0, verticalResized: 0, shuffled: 0, page: 0, rangeChanged: 0, range: {min: '', max: ''}};
    }
    checkItem(status, value) {
        this.props.onCheck(status, value, this.props.spec.propertyURI);
    }
    handleShowMore() {
        //add next 500 rows if exist
        this.props.onShowMore(this.state.page+1);
        this.setState({page: this.state.page+1});
    }
    handleToggleExpand() {
        this.setState({expanded: !this.state.expanded});
        this.props.toggleExpandFacet(this.props.spec.propertyURI);
    }
    handleToggleRangeChange() {
        if(this.state.rangeChanged){
            this.setState({rangeChanged: 0, range: {min: '', max: ''}});
            this.props.onRange({});
        }else{
            // check if values of range are valid and then send the request
            if(this.state.range.min || this.state.range.max){
                this.setState({rangeChanged: 1});
                this.props.onRange(this.state.range);
            }
        }
    }
    //data: min or max
    handleOnRangeChange(data, e){
        if(data === 'min'){
            this.setState({range: {min: e.target.value, max: this.state.range.max}});
        }else{
            this.setState({range: {max: e.target.value, min: this.state.range.min}});
        }
    }
    handleDropDownClick(e, data){
        if(data.value==='invert'){
            this.props.onInvert();
        }else if(data.value==='shuffle'){
            this.setState({shuffled: !this.state.shuffled});
        }
    }
    handleToggleVerticalResize() {
        this.setState({verticalResized: !this.state.verticalResized});
    }
    //used for custom sorting
    compare(a, b) {
        return (parseInt(b.total) - parseInt(a.total));
    }
    //filter content
    searchUpdated(term) {
        this.setState({searchTerm: term}); // needed to force re-render
    }
    createSelecedList(){
        let out = '';
        let selected = [];
        let shortenURI = 1;
        if((this.props.config && this.props.config.shortenURI === 0)){
            shortenURI = 0;
        }
        if(this.props.selection && this.props.selection[this.props.spec.propertyURI] && this.props.selection[this.props.spec.propertyURI].length){
            this.props.selection[this.props.spec.propertyURI].forEach((item)=>{
                if(shortenURI){
                    selected.push(URIUtil.getURILabel(item.value));
                }else{
                    selected.push(item.value);
                }
            });
            out = selected.join(',');
            //in case of range selected
            if(out==='range'){
                if(this.state.range.min && this.state.range.max){
                    out = '> ' + this.state.range.min + ' & ' + '< ' + this.state.range.max;
                }else{
                    if(this.state.range.min){
                        out = '> ' + this.state.range.min;
                    }else{
                        //max
                        out = '< ' + this.state.range.max;
                    }
                }
            }else{
                if(this.props.invert[this.props.spec.propertyURI]){
                    out = '!= '+out;
                }else{
                    out = '= '+out;
                }
            }
            return out;
        }else{
            return out;
        }
    }
    addCommas(n){
        let rx = /(\d+)(\d{3})/;
        return String(n).replace(/^\d+/, function(w){
            while(rx.test(w)){
                w = w.replace(rx, '$1,$2');
            }
            return w;
        });
    }
    render() {
        let self = this;
        //dropdown setting
        let invertStat = this.props.invert[this.props.spec.propertyURI] ? 'Revert' : 'Invert';
        let shuffleStat = !this.state.shuffled ? 'Shuffle' : 'Reset';
        let d_options = [
            { key: 1, text: invertStat + ' the selection', value: 'invert' },
            { key: 2, text: shuffleStat + ' the list', value: 'shuffle' }
        ]
        const d_trigger = (
            <span>
                <Icon name='lightning' />
            </span>
        );
        //change header color of facet: Violet -> for property chains , Purple -> multigraphs
        let defaultColor = 'blue';
        if(this.props.spec.propertyURI.indexOf('->') !== -1){
            defaultColor = 'violet';
        }
        if(this.props.spec.propertyURI.indexOf('->[') !== -1){
            defaultColor = 'purple';
        }
        if(this.props.invert[this.props.spec.propertyURI]){
            defaultColor = 'red';
        }
        //-----------------------
        let contentClasses = 'content', extraContentClasses='extra content', cardClasses = 'ui segment ' + (this.props.color ? this.props.color : defaultColor);
        let queryClasses = 'ui tertiary segment';
        let rangeClasses = 'ui secondary inverted blue segment';
        if(this.state.verticalResized){
            contentClasses = contentClasses + ' hide-element';
            extraContentClasses = extraContentClasses + ' hide-element';
            queryClasses = queryClasses + ' hide-element';
            rangeClasses = rangeClasses + ' hide-element';
        }
        let descStyle = {
            minHeight: this.props.minHeight ? this.props.minHeight : 80,
            maxHeight: this.props.maxHeight ? this.props.maxHeight : 200,
            position: 'relative',
            overflow: 'auto'
        };
        //order by total count: for performance is done on client-side
        if(self.props.spec.propertyURI){
            this.props.spec.instances.sort(this.compare);
        }
        let newSpec = {};
        let cloneInstances = this.props.spec.instances.slice(0);
        if(this.state.shuffled){
            shuffle(cloneInstances);
        }
        let itemsCount = this.props.spec.total;
        newSpec.property = this.props.spec.property;
        newSpec.propertyURI = this.props.spec.propertyURI;
        if (this.refs.search) {
            let filters = ['label', 'value'];
            cloneInstances = cloneInstances.filter(this.refs.search.filter(filters));
        }
        newSpec.instances = cloneInstances;
        //console.log(this.props.spec.query);
        return (
            <div className={cardClasses} ref="facet">
                {this.state.verticalResized ?
                    <div className="ui horizontal list">
                        <div className="item">
                            <PropertyHeader spec={{property: this.props.spec.property, propertyURI: this.props.spec.propertyURI}} config={this.props.config} size="3" />
                        </div>
                        <div className="item">
                            {this.createSelecedList()}
                            <a className='ui icon mini basic button right floated' onClick={this.handleToggleVerticalResize.bind(this)}>
                                <i className='ui icon resize vertical'></i>
                            </a>
                        </div>
                    </div>
                    : ''
                }
                <div className={contentClasses}>
                    {!this.props.spec.propertyURI ? '' :
                        <span className="ui teal ribbon label" title="number of items listed in this facet">{this.state.searchTerm ? cloneInstances.length : this.addCommas(itemsCount)}{(!this.state.searchTerm && this.props.spec.propertyURI && parseInt(itemsCount) > cloneInstances.length) ? '*' : ''}</span>
                    }
                    <div className="ui horizontal list">
                        <div className="item">
                            <PropertyHeader spec={{property: this.props.spec.property, propertyURI: this.props.spec.propertyURI}} config={this.props.config} size="3" />
                        </div>
                        <div className="item" style={{
                            'wordBreak': 'break-all',
                            'wordWrap': 'break-word'
                        }}>
                            {this.createSelecedList()}
                        </div>
                        {this.props.spec.property ?
                            <div className="item">
                                <Dropdown selectOnBlur={false} onChange={this.handleDropDownClick.bind(this)} trigger={d_trigger} options={d_options} icon={null} upward floating />
                            </div>
                            : ''
                        }
                    </div>
                    <div className="meta">
                    </div>
                    <div className="description">
                        <div className="ui form" style={descStyle}>
                            <ObjectBrowser expanded={this.state.expanded} selection={this.props.selection} shortenURI={true} spec={newSpec} config={this.props.config} onSelect={this.checkItem.bind(this)} datasetURI={this.props.datasetURI}/>
                            {
                                (!this.state.searchTerm && this.props.spec.propertyURI && parseInt(itemsCount) > cloneInstances.length) ? <a onClick={this.handleShowMore.bind(this)} className="ui orange fluid label">{(itemsCount-cloneInstances.length) + ' items left. Show more...'}</a> : ''
                            }
                        </div>
                    </div>
                </div>
                <br/>
                <div className={extraContentClasses}>
                    <div className="ui tag horizontal labels">
                        <SearchInput className="ui mini search icon input" ref="search" onChange={this.searchUpdated.bind(this)} throttle={500}/>
                        {this.props.spec.property ?
                            <a className='ui icon mini basic button right floated' onClick={this.handleToggleExpand.bind(this)}>
                                <i className='ui icon expand'></i>
                            </a>
                            : ''
                        }
                        {this.props.spec.property ?
                            <a className='ui icon mini basic button right floated' onClick={this.handleToggleVerticalResize.bind(this)}>
                                <i className='ui icon resize vertical'></i>
                            </a>
                            : ''
                        }
                    </div>

                </div>
                {this.props.config && this.props.config.allowRangeOfValues ?
                    <div className={rangeClasses}>
                        <div className="ui form">
                            <div className="three fields">
                                <div className="field">
                                    <label>Minimum</label>
                                    <input type="text" placeholder="Min" value={this.state.range.min} onChange={this.handleOnRangeChange.bind(this, 'min')}/>
                                </div>
                                <div className="field">
                                    <label>Maximum</label>
                                    <input type="text" placeholder="Max" value={this.state.range.max} onChange={this.handleOnRangeChange.bind(this, 'max')}/>
                                </div>
                                <div className="field">
                                    <label> &nbsp;</label>
                                    <button className="ui button" onClick={this.handleToggleRangeChange.bind(this)}>{this.state.rangeChanged ? 'Revert' : 'Apply'}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    : ''
                }
                {this.props.config && this.props.config.displayQueries ?
                    <div className={queryClasses}>
                        <YASQEViewer spec={{value: this.props.spec.query}} />
                    </div>
                    : ''
                }
            </div>
        );
    }
}

export default Facet;
