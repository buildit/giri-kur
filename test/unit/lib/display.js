/* eslint no-console: 0 */
import * as display from 'lib/display';

import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';

chai.use(sinonChai);

describe('Logger/Console display', () => {
  let consoleStub;

  beforeEach(() => {
    consoleStub = sinon.stub(console, 'log');
  });

  it('should not display or log if nothing has been enabled', () => {
    display.display('foo');
    display.log('foo');
    console.log.restore(); // eslint-disable-line no-console
    expect(consoleStub).not.to.have.been.called;
  });
  it('should only display, not log, if only display is enabled', () => {
    display.enableDisplay();
    display.display('foo');
    display.log('foo');
    display.disableDisplay();
    console.log.restore(); // eslint-disable-line no-console
    expect(consoleStub).to.have.been.calledOnce;
  });
  it('should only display, not log, if only logging is enabled', () => {
    display.enableLog();
    display.display('foo');
    display.log('foo');
    display.disableLog();
    console.log.restore(); // eslint-disable-line no-console
    expect(consoleStub).to.have.been.calledOnce;
  });
  it('should only display and log, if both are enabled', () => {
    display.enableLog();
    display.enableDisplay();
    display.display('foo');
    display.log('foo');
    console.log.restore(); // eslint-disable-line no-console
    expect(consoleStub).to.have.been.calledTwice;
  });
});
