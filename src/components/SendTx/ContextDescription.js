import React, { Component } from 'react';
// start: make compatible with react-ui
import {web3, i18n, EthTools, BigNumber} from '../../API'
// end

class ContextDescription extends Component {
  formattedBalance() {
    return EthTools.formatBalance(
      web3.utils.toBN(this.props.value || 0),
      '0,0.00[0000000000000000]',
      'ether'
    );
  }

  calculateTransferValue() {
    const { value, etherPriceUSD } = this.props;

    if (!value || !etherPriceUSD) {
      return;
    }

    const bigValue = web3.utils.isHex(value)
      ? new BigNumber(web3.utils.hexToNumberString(value))
      : new BigNumber(value);
    const fee = bigValue
      .times(etherPriceUSD)
      .dividedBy(new BigNumber('1000000000000000000'));
    //FIXME return this.formatter.format(fee);
    return '250'
  }

  determineTxType() {
    if (this.props.isNewContract) return 'newContract';
    if (this.props.toIsContract) {
      if (this.props.executionFunction === 'transfer(address,uint256)') {
        return 'tokenTransfer';
      } else {
        return 'genericFunctionExecution';
      }
    }
    return 'etherTransfer';
  }

  renderNewContractDescription() {
    const bytesCount = encodeURI(this.props.data).split(/%..|./).length - 1;

    return (
      <div className="context-description__sentence">
        <div>
          Upload <span className="bold">New Contract</span>
        </div>
        <div className="context-description__subtext">
          About {bytesCount} bytes
        </div>
      </div>
    );
  }

  renderTokenTransferDescription() {
    if (this.props.params.length === 0) return;

    const tokenCount = this.props.params[1].value.slice(
      0,
      -Math.abs(this.props.token.decimals)
    );

    const tokenSymbol = this.props.token.symbol || i18n.t('mist.sendTx.tokens');

    return (
      <div className="context-description__sentence">
        {i18n.t('mist.sendTx.transfer')}{' '}
        <span className="bold">
          {tokenCount} {tokenSymbol}
        </span>
      </div>
    );
  }

  renderGenericFunctionDescription() {
    return (
      <div className="context-description__sentence">
        Executing <span className="bold">Contract Function</span>
      </div>
    );
  }

  renderEtherTransferDescription() {
    let conversion;
    if (this.props.network === 'main') {
      const value = this.calculateTransferValue();
      if (value) {
        conversion = <span>About {value} USD</span>;
      }
    } else {
      conversion = (
        <span>
          $0 (<span className="capitalize">{this.props.network}</span>)
        </span>
      );
    }

    return (
      <div className="context-description__sentence">
        <div>
          Transfer <span className="bold">{this.formattedBalance()} ETHER</span>
        </div>
        <div className="context-description__subtext">{conversion}</div>
      </div>
    );
  }

  renderDescription() {
    const txType = this.determineTxType();
    switch (txType) {
      case 'newContract':
        return this.renderNewContractDescription();
      case 'tokenTransfer':
        return this.renderTokenTransferDescription();
      case 'genericFunctionExecution':
        return this.renderGenericFunctionDescription();
      case 'etherTransfer':
        return this.renderEtherTransferDescription();
      default:
        return this.renderEtherTransferDescription();
    }
  }

  render() {
    return (
      <div className="context-description">
        {this.renderDescription()}
        {!!this.props.gasError && (
          <div className="context-description__error">
            Warning: this transaction is likely going to fail and burn your
            fees.
          </div>
        )}
      </div>
    );
  }
}

export default ContextDescription;