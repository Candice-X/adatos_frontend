import React from 'react';
import {SiderLayout} from "./SiderLayout";
import {BrowserRouter} from 'react-router-dom';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <SiderLayout />
            </BrowserRouter>
        );

    }
}

export default App;
