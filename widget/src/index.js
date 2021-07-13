import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const WidgetDivs = document.querySelectorAll('.widget');

WidgetDivs.forEach(Div => {
    ReactDOM.render(
        <React.StrictMode>
            <App elem={Div}/>
        </React.StrictMode>,
        Div
    );
});

