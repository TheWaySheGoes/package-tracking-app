import { React, memo, useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';



const GeoLocation = ({ latitude, longitude, data }) => {
    const [position, setPosition] = useState([latitude, longitude]);
    const [info, setInfo] = useState(data);

    useEffect(() => {
        setPosition([latitude, longitude]);
    }, [latitude, longitude]);

    useEffect(() => {
        setInfo(info);
    }, [info]);

    const customIcon = new L.Icon({
        iconUrl: 'package-icon.png', //in public fodler
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
        crossOrigin: true

    });

    return (
        <MapContainer
            center={position}
            zoom={10}
            style={{ min_width: '100%', height: 'auto' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {position && (
                <Marker position={position} icon={customIcon} >
                    <Popup autoClose={false}>
                        Status: {info.status}<br/>
                        Eta: {info.eta}<br/>
                        Sender: {info.sender}<br/>
                        {info.location_name}<br/>
                        Phone: {info.user_phone}<br/>
                        Name: {info.user_name}<br/>
                    </Popup>
                </Marker>
            )}
        </MapContainer>
    );
}


export default memo(GeoLocation);
