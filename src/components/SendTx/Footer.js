import React, { Component } from 'react';
// start: make compatible with react-ui
import {i18n} from '../../API'
// end
class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pw: ''
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSubmit(this.state);
    this.setState({ pw: '' });
  };

  render() {
    const { gasPrice, gasError, estimatedGas, unlocking } = this.props;

    if (!estimatedGas || !gasPrice || gasPrice === 0 || gasPrice === '0x0') {
      return null;
    }

    if (unlocking) {
      return (
        <div className="footer--unlocking">
          <h2>{i18n.t('mist.sendTx.unlocking')}</h2>
        </div>
      );
    }

    return (
      <div className="footer">
        <form
          onSubmit={this.handleSubmit}
          className={gasError ? 'footer__form error' : 'footer__form'}
        >
          <input
            className="footer__input"
            type="password"
            value={this.state.pw}
            onChange={e => this.setState({ pw: e.target.value })}
            placeholder={i18n.t('mist.sendTx.enterPassword')}
          />

          <button
            className={gasError ? 'footer__btn error' : 'footer__btn'}
            disabled={!this.state.pw}
            type="submit"
          >
            {i18n.t('mist.sendTx.execute')}
          </button>
        </form>
      </div>
    );
  }
}

export default Footer;