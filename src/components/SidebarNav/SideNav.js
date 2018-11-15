import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import ReactDOM from 'react-dom'

import './SideNav.css'

import NodeInfo from '../NodeInfo'

class NavItem extends Component {
  constructor(props){
    super(props)
    this.state = { 
      submenucontainer: {
        'visibility': 'hidden',
        'opacity': 0
      }
    }
  }
  handleMouseLeave = () => {
    this.setState({
      submenucontainer: {
        'visibility': 'hidden',
        'opacity': 0
      }
    })
  }
  handleMouseEnter = () => {
    let el = ReactDOM.findDOMNode(this)   
    this.setState({
      submenucontainer: {
        'visibility': 'visible',
        'opacity': 1,
        'top': (el.offsetTop) + 'px'
      }
    })
  }
  renderSubmenu() {
    let subMenu = []
    let badge = ''
    if(!subMenu){
      return ''
    }
    return (
      <ul className="sub-menu">
        {subMenu.map(menu => {
          return <li key={menu.name}><button className={this.props.selected ? 'selected' : ''}>{menu.name}</button>{badge && <span className="badge">{badge}</span>}</li>
        })}
      </ul>
    )
  }
  render(){
    let badge = ''
    let icon = this.props.item.icon || ''
    let name = this.props.item.name
    let nameFull = ''
    let link = this.props.item.route || (name === 'wallet' ? 'wallet' : 'browser')
    return (
      <li className={'browser'} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
      <header>
        <NavLink to={'/'+link}>
          <button className={"main " + (badge && 'has-badge')}>
            {icon
              ? <img src={icon} draggable="false" />
              : <i className="icon-globe"></i>
            }
          </button>
        </NavLink>
      </header>
      <section className="submenu-container" style={this.state.submenucontainer}>
        <section>
          <header>
            <span title={nameFull}>{name}</span>
            {this.renderSubmenu()}
          </header>
        </section>
      </section>
    </li>
    )
  }
}

class Sidebar extends Component {
  constructor(props){
    super(props)
  }
  render(){
    let tabs = [
      {id: 0, name: 'wallet', icon: 'https://cdn4.iconfinder.com/data/icons/money-13/24/Wallet-2-512.png'}
    ]
    return (
      <aside className="sidebar">
          <nav>
              <ul className="sidebar-menu">
                  {tabs.map(tab => {
                      //return <SidebarTab key={tab.id || tab._id} tab={tab} tabChanged={this.handleTabChanged} selected={this.props.selectedTab.id === tab.id}/>
                      return <NavItem item={tab}></NavItem>
                  })}
              </ul>
          </nav>
          <div id="react__node-info">
              <NodeInfo/>
          </div>
      </aside>
    )
  }
}

export default Sidebar