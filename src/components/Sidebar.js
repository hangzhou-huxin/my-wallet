import React, { Component } from 'react'

import SidebarTab from './SidebarTab'
import NodeInfo from './NodeInfo'

class Sidebar extends Component {
  constructor(props){
    super(props)
    this.handleTabChanged = this.handleTabChanged.bind(this)
  }
  handleTabChanged(tab) {
    this.props.tabChanged(tab)
  }
  render(){
    let tabs = this.props.tabs
    return (
      <aside className="sidebar">
        <nav>
          <ul className="sidebar-menu">
            {tabs.map(tab => {
              return <SidebarTab key={tab.id || tab._id} tab={tab} tabChanged={this.handleTabChanged} selected={this.props.selectedTab.id === tab.id}/>
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
