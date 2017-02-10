import generate from './generate';

const output = (data, settings = {}) => {
  generate(data, settings.dest);
};

export default output;
