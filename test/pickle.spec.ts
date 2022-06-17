import { pickle } from '../src/pickle';

import * as chai from 'chai';

const expect = chai.expect;

describe('Testing loading of a boolean', () => {
    it('loads after dumps of `true` should be equivalent to identity' , () => {
        const val = true;
        const dumped = pickle.dumps(val);
        const loaded = pickle.loads(dumped);
        expect(loaded).to.equal(val);
    });
    it('loads after dumps of `false` should be equivalent to identity' , () => {
        const val = false;
        const dumped = pickle.dumps(val);
        const loaded = pickle.loads(dumped);
        expect(loaded).to.equal(val);
    });
});

describe('Testing loading of a number', () => {
    it('loads after dumps of `43` should be equivalent to identity' , () => {
        const val = 43;
        const dumped = pickle.dumps(val);
        const loaded = pickle.loads(dumped);
        expect(loaded).to.equal(val);
    });
});

describe('Testing loading of a string', () => {
    it('loads after dumps of a string should be equivalent to identity' , () => {
        const dumped = pickle.dumps("test");
        const loaded = pickle.loads(dumped);
        expect(loaded).to.equal("test");
    });
});

describe('Testing loading of an array', () => {
    it('loads after dumps of an array should be equivalent to identity' , () => {
        expect(pickle.loads(pickle.dumps(["test"]))).to.eql(["test"]);
    });
    it('loads after dumps of an array containing multiple values should be equivalent to identity' , () => {
        expect(pickle.loads(pickle.dumps(["test1", "test2"]))).to.eql(["test1", "test2"]);
    });
});

describe('Testing loading of an object', () => {
    it('loads after dumps of an object should be equivalent to identity' , () => {
        const dumped = pickle.dumps({key:"test"});
        const loaded = pickle.loads(dumped);
        expect(loaded).to.eql({key:"test"});
    });

    it('loads after dumps of an recursive object should be equivalent to identity' , () => {
        const obj1: any = {
            key1: "test",
            key2: ["item1", "item2"],
        };
        obj1.key3 = obj1;
        const dumped = pickle.dumps(obj1);
        const loaded = pickle.loads(dumped);
        expect(loaded).to.eql(obj1);
    });
});
