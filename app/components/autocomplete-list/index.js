import './index.scss';
import {GetWeather} from '../../services/index.js';
import React, {PropTypes} from 'react';
import localStore from 'store';

import {WEATHER_LIST, STORE_NAME} from '../../constants/index.js';

class AutocompleteList extends React.Component {
    constructor (props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
        this.closest = this.closest.bind(this);
        this.getWheather = this.getWheather.bind(this);
        this.addItemToStore = this.addItemToStore.bind(this);
    }
    closest (el, selector) {
        let matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

        while (el) {
            if (matchesSelector.call(el, selector)) {
                break;
            }
            el = el.parentElement;
        }
        return el;
    }
    addItemToStore (data, name) {
        let store = localStore.get(STORE_NAME) || [];
        let item = {
            temperature: data.currently.temperature,
            name: name
        };

        store.push(item);
        this.props.updateWeatherList(store, WEATHER_LIST)
        localStore.set(STORE_NAME, store);
    }
    getWheather (lat, lng, name) {
        GetWeather(lat, lng, name, this.addItemToStore);
    }
    clickHandler ({target}) {
        let itemWrap = this.closest(target, '.list-item-wrap');
        let attrData = itemWrap.dataset;

        this.getWheather(attrData.lat, attrData.lng, attrData.name);
    }
    render () {
        return (<ul className="autocomplete-list">
        {
            this.props.list.map((item, idx) => {
                return (<li key={idx} className="list-item-wrap" 
                        data-name={item.formatted_address} 
                        data-lat={item.geometry.location.lat} 
                        data-lng={item.geometry.location.lng}>
                    <span onClick={this.clickHandler}>{item.formatted_address}</span>
                </li>)
            })
        }
        </ul>);
    }
}

AutocompleteList.propTypes = {
    list: PropTypes.array.isRequired,
    updateWeatherList: PropTypes.func
}

export default AutocompleteList;