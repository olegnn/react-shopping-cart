// App.js
import 'bootstrap/dist/css/bootstrap.css';
import 'animate.css/animate.min.css';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Product from '../../src/containers/Product';
import Cart from '../../src/containers/Cart';
import store from './store';



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Product
            options={{
              colour: ['red', 'green'],
            }}
            name="iPad / Tablet case"
            prices={
              {
                '£': 50,
              }
            }
            path="/shop/ipad-case/"
            imagePath="1-483x321.jpeg"
          />
          <Cart productPropsToShow={['colour']} />
        </div>
      </Provider>
    );
  }
}

const mainDiv = document.createElement('div');

document.body.appendChild(mainDiv);

ReactDOM.render(
  <App />,
  mainDiv
);


//<Cart productPropsToShow={['colour']} />;
