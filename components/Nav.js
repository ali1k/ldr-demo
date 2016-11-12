'use strict';
import React from 'react';
import {NavLink} from 'fluxible-router';
import {appFullTitle, appShortTitle, enableAuthentication, enableDynamicReactorConfiguration,enableDynamicServerConfiguration,enableDynamicfacetsConfiguration, configDatasetURI} from '../configs/general';

class Nav extends React.Component {
    componentDidMount(){
        let currentComp = this.refs.defaultNavbar;
        $(currentComp).find('.ui.dropdown').dropdown();
    }
    showHelpModal() {
        /*global $*/
        $('.ui.modal').modal('show');
    }
 render() {
        let user = this.context.getUser();
        // console.log(user);
        let userMenu;
        if(enableAuthentication){
            if(user){
                userMenu = <div className="ui right dropdown item">
                                {user.accountName} <i className="dropdown icon"></i>
                                <div className="menu">
                                    <NavLink className="item" routeName="resource" href={'/dataset/' + encodeURIComponent(user.datasetURI) + '/resource/' + encodeURIComponent(user.id)}>Profile</NavLink>
                                    {parseInt(user.isSuperUser) ? <NavLink className="item" routeName="users" href="/users">Users List</NavLink> : ''}
                                    <a href="/logout" className="item">Logout</a>
                                </div>
                            </div>;
            }else{
                userMenu = <div className="ui right item"> <a className="ui mini circular teal button" href="/login">Sign-in</a> &nbsp;  <a href="/register" className="ui mini circular yellow button">Register</a> </div>;
            }
        }
        return (
            <nav ref="defaultNavbar" className="ui blue menu inverted navbar page grid">
                    <NavLink routeName="home" className="brand item" href='http://ld-r.org'>
                        {this.props.loading ? <img src="/assets/img/loader.gif" alt="loading..." style={{height: 30, width: 30}} /> : <img style={{height: 22, width: 22}} className="ui mini image" src="/assets/img/ld-reactor.gif" alt="ld-reactor" />}
                    </NavLink>
                    <a className="item" href="http://ld-r.org/" data-section="home">LD-R</a>
                    <a className="item" href="http://ld-r.org/docs/quickstart.html" data-section="quickstart">
                      Quick Start
                    </a>
                    <NavLink routeName="datasets" className="item" href="/">Demo</NavLink>
                    <div className="right menu">
                        <a href="/public/js/stats.html" className="ui item link" target="_blank" title="components stat">
                                <i className="lab icon"></i>
                        </a>
                        <div className="item link" onClick={this.showHelpModal}>
                                <i className="small help circle icon"></i>
                        </div>
                        {(enableDynamicReactorConfiguration || enableDynamicServerConfiguration || enableDynamicfacetsConfiguration) ?
                            <a href={'/browse/' + encodeURIComponent(configDatasetURI)} className="ui item link" title="Configuration Manager">
                                <i className="ui black settings icon"></i>
                            </a>
                        : ''}
                        <a href="http://github.com/ali1k/ld-r" className="ui item link">
                                <i className="github circle icon"></i> Github
                        </a>
                        {userMenu}
                    </div>
            </nav>
        );
    }
}
Nav.contextTypes = {
    getUser: React.PropTypes.func
};
export default Nav;
