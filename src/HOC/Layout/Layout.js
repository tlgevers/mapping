import React from 'react'
import './Layout.css'
import Map from '../../Components/Map/Map'
import ToolTray from '../../Components/ToolTray/ToolTray'


const Layout = (props) => {
    const getMap = (map) => {
        console.log("google map", map);
        return map
    }
    return (
        <div className="layout">
            {props.menuopen ?
                <div className="side-menu">
                    Side Menu
                </div>
                :
                null
            }
            <div className="map-container" style={!props.menuopen ? { width: '100vw' } : null}>
                <Map
                    getMap={getMap}
                    user={props.user}
                />
            </div>
            <ToolTray map={getMap} />
        </div>
    )
}

export default Layout