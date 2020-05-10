import React, { Component } from 'react';
import { Client, Config, CheckoutAPI } from '@adyen/api-library';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getPaymentMethods() {
    const config = new Config();
    config.apiKey = 'AQEyhmfxK4zJbBZDw0m/n3Q5qf3VaY9UCJ1+XWZe9W27jmlZiniYHPZ+YtXG9dYfNdwN0H8QwV1bDb7kfNy1WIxIIkxgBw==-uA2G0DS73SlmB4EHi/YNndhli7KlCMjXHbMmm8stboc=-djvcdM2gNHq9dSvC';
    config.merchantAccount = 'TestAccountNY';
    const client = new Client({
      config,
      httpClient: {
        async request(endpoint, json, config, isApiKeyRequired, requestOptions) {
          const response = await axios({
            method: 'POST',
            url: endpoint,
            data: JSON.parse(json),
            headers: {
              "X-API-Key": config.apiKey,
              "Content-type": "application/json"
            },
          });
          return response.data;
        }
      }
    });
    client.setEnvironment("TEST");
    const checkout = new CheckoutAPI(client);
    const paymentResponse = checkout.paymentMethods({
      amount: {
        currency: "USD",
        value: 1000,
      },
      countryCode: "US",
      shopperLocale: "en-US",
      channel: "Web",
      merchantAccount: config.merchantAccount
    }).then(res => res);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">Hello World</header>
        <div className="paymentMethods">
          <button onClick={this.getPaymentMethods}> Get Payment Methods </button>
        </div>
      </div>
    )
  }
}

export default App;
