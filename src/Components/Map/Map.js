/* global google */
import React from 'react';
import * as firebase from "firebase/app";
import './Map.css'
import { withRouter } from 'react-router-dom'
import * as fs from '../../Firebase/Firestore/Firestore'
import * as gm from '../../GoogleMaps/GoogleMaps'

export const latLng = (lat, lng) => {
    // console.log("lat", lat, "lng", lng);

    let marker = new google.maps.LatLng(lat, lng)
    return marker
}

class Map extends React.Component {
    constructor(props) {
        super(props)
        global.map = null
    }
    // TODO: access api key from file
    loadTheMap = () => {
        let url = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDP9Z6fB0rTihdj4D2iMg-fwTq7hzE47x4&callback=initMap'
        console.log(url)
        this.loadJS(url)
        this.loadPoints()
    }

    loadJS = (src) => {
        var ref = window.document.getElementsByTagName("script")[0];
        var script = window.document.createElement("script");
        script.src = src;
        script.async = true;
        ref.parentNode.insertBefore(script, ref);
    }

    componentDidMount() {
        if (firebase.apps.length) {
            console.log("firebase.apps", firebase.apps.length)
            firebase.auth().onAuthStateChanged((user) => {
                console.log("user: ", user);
                if (!user) this.props.history.pushState("/")
            })

        }
        window.initMap = this.initMap;
        this.loadTheMap()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user) {
            this.getPoints()
        }
    }

    placePoint = (e) => {
        var marker = new google.maps.Marker({
            position: e,
            map: global.map
        })
    }

    addPoint = (e) => {
        this.placePoint(e.latLng)
        fs.writePoint(this.props.user, e.latLng)
    }

    getPoints = () => {
        console.log("getPoints");
        let points = fs.getPoints(this.props.user, this.loadPoints)
    }

    loadPoints = (points) => {
        if (points) {
            points.forEach((i) => {
                let marker = latLng(i.point._lat, i.point._long)
                // console.log("marker", marker);
                this.placePoint(marker)
            })
        }
    }

    initMap = () => {
        var ll = latLng(34.269456, -86.224540);
        global.map = new google.maps.Map(document.getElementById('map'), {
            center: ll,
            zoom: 10,
            controlSize: 22,
            mapTypeId: google.maps.MapTypeId.TERRAIN,
            styles: [
                {
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        }
                    ]
                },
                {
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#616161"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#bdbdbd"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#eeeeee"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#e5e5e5"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#dadada"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#616161"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#e5e5e5"
                        }
                    ]
                },
                {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#eeeeee"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#acd4ff"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                }
            ]
        });
        global.map.addListener('click', (e) => this.addPoint(e))
        this.props.getMap(global.map)
        console.log('google map', global.map);
    }

    render() {
        return (
            <div>
                <div id="map" className="actual-map"></div>
            </div>
        )
    }
}

export default withRouter(Map)