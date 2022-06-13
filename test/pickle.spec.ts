import { pickle } from '../src/pickle';

import * as chai from 'chai';

const expect = chai.expect;

describe('Testing loading of a string', () => {
    it('loads after dumps of a string should be equivalent to identity' , () => {
        expect(pickle.loads(pickle.dumps("test"))).to.equal("test");
    });
});
