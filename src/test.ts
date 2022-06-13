import { Pickle } from 'pickle.ts';

const test = "blabla";
const pickle = Pickle();
const dumped = pickle.dumps(test);
console.log(dumped);