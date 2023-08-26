import style from './Home.module.css'
import { memo, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import React from "react";
import {
    selectVal1,
    setData
} from "./HomeSlice";
import GeoLocation from '../GeoLocation/GeoLocation'


const Home = () => {
    const dispatch = useDispatch();
    const [val1, setVal1State] = useState(useSelector(selectVal1));
    const [data, setDataState] = useState([]);
    const FetchInterval = 5000;
    const apiEndpoint = "https://my.api.mockaroo.com/orders.json?key=e49e6840";
    const [updated, setUpdated] = useState(false);
    const [parcelId, setParcelIdState] = useState("");
    const [rowInfo, setRowInfo] = useState();
    const [long, setLongitude] = useState(0);
    const [lat, setLatitude] = useState(0);
    const [mapKey, setMapKey] = useState(0);


    //updates long and lat positions in state
    const setPosition = (value, e) => {
        setLatitude(value.location_coordinate_latitude);
        setLongitude(value.location_coordinate_longitude);
        setRowInfo(value);
        //reset geolocation component 
        const tempKey = mapKey + 1;
        setMapKey(tempKey % 2);
    }

    //save parcel table data to context
    const saveGlobalState = (event) => {
        dispatch(setData(data));
    }

    //update search id
    const setParcelId = (parcelId) => {
        setParcelIdState(parcelId);
    }

    //fetches JSON data from server
    const getData = () => {
        let timer = setTimeout(() => {
            fetch(
                apiEndpoint)
                .then((res) => res.json())
                .then((json) => {
                    const tempData = data.concat(json);
                    setDataState(tempData);
                    saveGlobalState();
                    setUpdated(true);
                })
        }, FetchInterval);
        return () => clearTimeout(timer)
    }

    //get Api data first time
    useEffect(() => {
        getData();
    }, []);  //,[] for run once

    return (
        <>

            <main className={style.grid_main}>
                <label>Parcel ID: <input value={parcelId} placeholder="1234" onChange={(e) => setParcelId(e.target.value)} className={style.parcel_input}></input></label>

                {updated ?
                    <>
                        <table>
                            <caption>Packet List</caption>
                            <thead>
                                <th>status</th>
                                <th>eta</th>
                                <th>parcel id</th>
                                <th>sender</th>
                                <th>user phone</th>
                                <th>user name</th>
                            </thead>
                            {

                                //data.filter(value =>  value.sender == data.sender ).map((value) => (
                                (parcelId === "" ? data : data.filter(value => value.parcel_id.toLowerCase().includes(parcelId.toLowerCase())))
                                    .map((value) => (
                                        <>
                                            <tr id={value.id} className={style.table_row} onClick={e => setPosition(value, e)}>
                                                <td>{value.status}</td>
                                                <td>{value.eta}</td>
                                                <td>{value.parcel_id}</td>
                                                <td>{value.sender}</td>
                                                <td>{value.user_phone}</td>
                                                <td>{value.user_name}</td>
                                            </tr>
                                        </>
                                    ))
                            }
                        </table>
                    </>
                    : <h3 style={{color:'grey'}}>Waiting for update...</h3>
                }
            </main>

            {lat !== 0 && long !== 0 ?
            <div className={style.grid_geolocation}>
                 <GeoLocation latitude={lat} longitude={long} data={rowInfo} key={mapKey} /> 
            </div>
            : <p style={{color:'grey'}}>Choose Package for location</p>}
        </>
    );
}
export default memo(Home);
