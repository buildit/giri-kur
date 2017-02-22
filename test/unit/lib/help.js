import { tokenizerHelp, scssGeneratorHelp } from 'lib/help';

import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';

chai.use(sinonChai);

describe('Help Messager', () => {
  it('should console log a tokenizerHelp message properly', () => {
    const consoleStub = sinon.stub(console, 'log');
    tokenizerHelp();
    console.log.restore(); // eslint-disable-line no-console

    expect(consoleStub).to.have.been.called;
  });

  it('should console log a scssGeneratorHelp message properly', () => {
    const consoleStub = sinon.stub(console, 'log');
    scssGeneratorHelp();
    console.log.restore(); // eslint-disable-line no-console

    expect(consoleStub).to.have.been.called;
  });
});
