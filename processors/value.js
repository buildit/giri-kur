import process from './index';

export const processValue = value => {
  const values = trim(value.value);
  return values.reduce((t, v) => ( t + process(v)), '');
}

const stripLeadingSpaces = collection => {
  let somethingFound = false;
  const finalCollection = [];
  collection.forEach(c => {
    let push = false;
    if (c.type === 'space') {
      push = somethingFound;
    } else {
      somethingFound = true;
      push = true;
    }
    if (push) {
      finalCollection.push(c);
    }
  });
  return finalCollection;
}
const stripTrailingSpaces = collection => {
  collection.reverse();
  let finalCollection = stripLeadingSpaces(collection);
  finalCollection.reverse();
  return finalCollection;
}

const trim = collection => {
  let workingCollection = stripLeadingSpaces(collection);
  workingCollection = stripTrailingSpaces(workingCollection);
  return workingCollection;
}
