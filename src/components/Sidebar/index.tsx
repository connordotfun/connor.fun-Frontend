import * as React from 'react'
import { MessageStore } from '../../stores/messageStore';
import { observer, inject } from 'mobx-react';

import InfoCard from '../../components/InfoCard'

import './index.css'
import logo from '../../assets/logo.png'
import Region from '../../models/Region';
import { observable } from 'mobx';

interface SidebarProps {
    messageStore?: MessageStore
    google?: {map: google.maps.Map, maps: any}
}

@inject('messageStore')
@observer
class Sidebar extends React.Component<SidebarProps> {
    @observable private _$expandedCards: Map<string, boolean> = new Map()
    render() {
        let cards: React.ReactNode[] = []
        if (this.props.messageStore) {
                this.props.messageStore.$latestMessages.forEach(
                    (region, id) => (
                        cards.push(
                            <InfoCard
                                key={id}
                                data={region}
                                onClick={() => this._zoomToRegion(region.region)}
                                expanded={this._$expandedCards.get(id)}
                            />
                        )
                    )
                )
        }
        return(
            <div className="sidebar">
                <img src={logo} alt="FORECAST" className="branding"/>
                <div className="region-cards">
                    {cards}
                </div>
            </div>
        )
    }

    private _zoomToRegion(region: Region) {
        this._$expandedCards.set(region.ID, !this._$expandedCards.get(region.ID))
        if (this.props.google && this._$expandedCards.get(region.ID)) {
            this.props.google.map.setZoom(10)
            this.props.google.map.setCenter({lat: region.centerLat, lng: region.centerLon})
        }
    }
}

export default Sidebar