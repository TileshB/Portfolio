import React, { Component } from 'react';
import "./loading.scss"

class Loading extends Component {
    state = {  }
    render() { 
        return ( <div  className="loading-page">
            <div class="lds-ripple"><div></div><div></div></div>
            <h2 className="central-text">Loading all the Megaborps...</h2>
        </div> );
    }
}
 
export default Loading;