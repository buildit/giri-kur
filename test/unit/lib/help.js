import help from '../../../lib/help';

import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';

chai.use(sinonChai);

describe('Help Messager', () => {
  let consoleStub;

  it('should console log a help message properly', () => {
    const consoleStub = sinon.stub(console, 'log');
    help();
    console.log.restore();

    expect(consoleStub).to.have.been.called;
  });
});
