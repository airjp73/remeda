import { pipe } from './pipe';
import { setPath } from './setPath';

interface SampleType {
  a: {
    b: {
      c: number;
      d?: number;
    };
    e: Array<{ f: { g: number } }>;
    z?: number | undefined;
  };
  x?: number;
  y?: number;
}

const obj: SampleType = {
  a: {
    b: {
      c: 1,
    },
    e: [{ f: { g: 1 } }, { f: { g: 1 } }],
  },
  y: 10,
};

describe('data first', () => {
  describe('array path', () => {
    test('should set a deeply nested value', () => {
      expect<SampleType>(setPath(obj, ['a', 'b', 'c'], 2)).toEqual({
        ...obj,
        a: {
          ...obj.a,
          b: {
            c: 2,
          },
        },
      });
    });

    test('should work nested arrays', () => {
      expect<SampleType>(setPath(obj, ['a', 'e', 1, 'f', 'g'], 2)).toEqual({
        ...obj,
        a: {
          ...obj.a,
          e: [{ f: { g: 1 } }, { f: { g: 2 } }],
        },
      });
    });

    test('should correctly type value argument', () => {
      expect<SampleType>(
        // @ts-expect-error - this path should yield a type of number
        setPath(obj, ['a', 'e', 1, 'f', 'g'], 'hello')
      ).toEqual({
        ...obj,
        a: {
          ...obj.a,
          e: [{ f: { g: 1 } }, { f: { g: 'hello' } }],
        },
      });
    });

    test('should correctly type path argument', () => {
      // @ts-expect-error - 'hello' isn't a valid path
      expect<SampleType>(setPath(obj, ['a', 'hello'], 'hello')).toEqual({
        ...obj,
        a: {
          ...obj.a,
          hello: 'hello',
        },
      });
    });

    test('should work with undefined / optional types', () => {
      expect<SampleType>(setPath(obj, ['a', 'z'], undefined)).toEqual({
        ...obj,
        a: {
          ...obj.a,
          z: undefined,
        },
      });
    });

    test('should support partial paths', () => {
      expect<SampleType>(setPath(obj, ['a', 'b'], { c: 2 })).toEqual({
        ...obj,
        a: {
          ...obj.a,
          b: { c: 2 },
        },
      });
    });

    test('should correctly type partial paths', () => {
      // @ts-expect-error - this path should yield a type of { c: number }
      expect<SampleType>(setPath(obj, ['a', 'b'], 123)).toEqual({
        ...obj,
        a: {
          ...obj.a,
          b: 123,
        },
      });
    });
  });

  describe('string path', () => {
    test('should set a deeply nested value', () => {
      expect<SampleType>(setPath(obj, 'a.b.c', 2)).toEqual({
        ...obj,
        a: {
          ...obj.a,
          b: {
            c: 2,
          },
        },
      });
    });

    test('should work nested arrays', () => {
      expect<SampleType>(setPath(obj, 'a.e[1].f.g', 2)).toEqual({
        ...obj,
        a: {
          ...obj.a,
          e: [{ f: { g: 1 } }, { f: { g: 2 } }],
        },
      });
    });

    test('should correctly type value argument', () => {
      expect<SampleType>(
        // @ts-expect-error - this path should yield a type of number
        setPath(obj, 'a.e[1].f.g', 'hello')
      ).toEqual({
        ...obj,
        a: {
          ...obj.a,
          e: [{ f: { g: 1 } }, { f: { g: 'hello' } }],
        },
      });
    });

    test('should correctly type path argument', () => {
      // @ts-expect-error - 'hello' isn't a valid path
      expect<SampleType>(setPath(obj, 'a.hello', 'hello')).toEqual({
        ...obj,
        a: {
          ...obj.a,
          hello: 'hello',
        },
      });
    });

    test('should work with undefined / optional types', () => {
      expect<SampleType>(setPath(obj, 'a.z', undefined)).toEqual({
        ...obj,
        a: {
          ...obj.a,
          z: undefined,
        },
      });
    });

    test('should support partial paths', () => {
      expect<SampleType>(setPath(obj, 'a.b', { c: 2 })).toEqual({
        ...obj,
        a: {
          ...obj.a,
          b: { c: 2 },
        },
      });
    });

    test('should correctly type partial paths', () => {
      // @ts-expect-error - this path should yield a type of { c: number }
      expect<SampleType>(setPath(obj, 'a.b', 123)).toEqual({
        ...obj,
        a: {
          ...obj.a,
          b: 123,
        },
      });
    });
  });
});

describe('data last', () => {
  describe('array path', () => {
    test('should set a deeply nested value', () => {
      expect<SampleType>(pipe(obj, setPath(['a', 'b', 'c'], 2))).toEqual({
        ...obj,
        a: {
          ...obj.a,
          b: {
            c: 2,
          },
        },
      });
    });

    test('should work nested arrays', () => {
      expect<SampleType>(
        pipe(obj, setPath(['a', 'e', 1, 'f', 'g'], 2))
      ).toEqual({
        ...obj,
        a: {
          ...obj.a,
          e: [{ f: { g: 1 } }, { f: { g: 2 } }],
        },
      });
    });

    test('should correctly type value argument', () => {
      expect<SampleType>(
        pipe(
          obj,
          // @ts-expect-error - this path should yield a type of number
          setPath(['a', 'e', 1, 'f', 'g'], 'hello')
        )
      ).toEqual({
        ...obj,
        a: {
          ...obj.a,
          e: [{ f: { g: 1 } }, { f: { g: 'hello' } }],
        },
      });
    });

    test('should correctly type path argument', () => {
      // @ts-expect-error - 'hello' isn't a valid path
      expect<SampleType>(pipe(obj, setPath(['a', 'hello'], 'hello'))).toEqual({
        ...obj,
        a: {
          ...obj.a,
          hello: 'hello',
        },
      });
    });

    test('should work with undefined / optional types', () => {
      const t = setPath(['a', 'z'], undefined);
      expect<SampleType>(pipe(obj, t)).toEqual({
        ...obj,
        a: {
          ...obj.a,
          z: undefined,
        },
      });
    });

    test('should support partial paths', () => {
      expect<SampleType>(pipe(obj, setPath(['a', 'b'], { c: 2 }))).toEqual({
        ...obj,
        a: {
          ...obj.a,
          b: { c: 2 },
        },
      });
    });

    test('should correctly type partial paths', () => {
      // @ts-expect-error - this path should yield a type of { c: number }
      expect<SampleType>(pipe(obj, setPath(['a', 'b'], 123))).toEqual({
        ...obj,
        a: {
          ...obj.a,
          b: 123,
        },
      });
    });
  });

  describe('string path', () => {
    test('should set a deeply nested value', () => {
      expect<SampleType>(pipe(obj, setPath('a.b.c', 2))).toEqual({
        ...obj,
        a: {
          ...obj.a,
          b: {
            c: 2,
          },
        },
      });
    });

    test('should work nested arrays', () => {
      expect<SampleType>(pipe(obj, setPath('a.e[1].f.g', 2))).toEqual({
        ...obj,
        a: {
          ...obj.a,
          e: [{ f: { g: 1 } }, { f: { g: 2 } }],
        },
      });
    });

    test('should correctly type value argument', () => {
      expect<SampleType>(
        pipe(
          obj,
          // @ts-expect-error - this path should yield a type of number
          setPath('a.e[1].f.g', 'hello')
        )
      ).toEqual({
        ...obj,
        a: {
          ...obj.a,
          e: [{ f: { g: 1 } }, { f: { g: 'hello' } }],
        },
      });
    });

    test('should correctly type path argument', () => {
      // @ts-expect-error - 'hello' isn't a valid path
      expect<SampleType>(pipe(obj, setPath('a.hello', 'hello'))).toEqual({
        ...obj,
        a: {
          ...obj.a,
          hello: 'hello',
        },
      });
    });

    test('should work with undefined / optional types', () => {
      const t = setPath('a.z', undefined);
      expect<SampleType>(pipe(obj, t)).toEqual({
        ...obj,
        a: {
          ...obj.a,
          z: undefined,
        },
      });
    });

    test('should support partial paths', () => {
      expect<SampleType>(pipe(obj, setPath('a.b', { c: 2 }))).toEqual({
        ...obj,
        a: {
          ...obj.a,
          b: { c: 2 },
        },
      });
    });

    test('should correctly type partial paths', () => {
      // @ts-expect-error - this path should yield a type of { c: number }
      expect<SampleType>(pipe(obj, setPath('a.b', 123))).toEqual({
        ...obj,
        a: {
          ...obj.a,
          b: 123,
        },
      });
    });
  });
});