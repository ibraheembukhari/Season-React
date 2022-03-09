import React from "react";
import ReactDOM from 'react-dom';
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

class App extends React.Component {

    state = { lat: null, lon: null, errorMessage: '' };

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude, lon: position.coords.longitude }),
            err => this.setState({ errorMessage: err.message })
        );
    }
    // Latitude: {this.state.lat} <br /> Longitude: {this.state.lon}

    renderContent() {

        if (this.state.lat && this.state.lon && !this.state.errorMessage) {
            return <div><SeasonDisplay lat={this.state.lat} lon={this.state.lon} /></div>
        }
        if (!this.state.lat && !this.state.lon && this.state.errorMessage) {
            return <div>Error: {this.state.errorMessage}</div>
        }
        if (!this.state.lon && !this.state.lat && !this.state.errorMessage) {
            return <Spinner />
        }
    }

    render() {
        return (
            <div className="border red">
                {this.renderContent()}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));