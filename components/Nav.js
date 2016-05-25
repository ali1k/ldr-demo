'use strict';
import React from 'react';
import {NavLink} from 'fluxible-router';
import {appFullTitle, appShortTitle, enableAuthentication} from '../configs/general';

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
        if(user){
            userMenu = <div className="ui right dropdown item">
                            {user.accountName} <i className="dropdown icon"></i>
                            <div className="menu">
                                <NavLink className="item" routeName="resource" href={'/dataset/' + encodeURIComponent(user.graphName) + '/resource/' + encodeURIComponent(user.id)}>Profile</NavLink>
                                {parseInt(user.isSuperUser) ? <NavLink className="item" routeName="users" href="/users">Users List</NavLink> : ''}
                                <a href="/logout" className="item">Logout</a>
                            </div>
                        </div>;
        }
        return (
            <nav ref="defaultNavbar" className="ui blue menu inverted navbar page grid">
                    <a className="brand item" href="http://ld-r.org/"><img style={{height: 20, width: 20}} className="ui mini image" src="/assets/img/ld-reactor.gif" alt="ld-reactor" /></a>
                    <a className="item" href="http://ld-r.org/" data-section="home">LD-R</a>
                    <a className="item" href="http://ld-r.org/docs/quickstart.html" data-section="quickstart">
                      Quick Start
                    </a>
                    <NavLink routeName="datasets" className="item" activeclassName="active" href="/">Demo</NavLink>
                    <div className="right menu">
                        <div className="item link" onClick={this.showHelpModal}>
                                <i className="small help circle icon"></i>
                        </div>
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
