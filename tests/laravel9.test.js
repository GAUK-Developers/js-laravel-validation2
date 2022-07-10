import rules from "../src/rules";

describe('Laravel 9 rule updates', () => {

    it('Validates: accepted', () => {

        // accepted
        expect(rules['accepted']({ value: 'yes' })).toBeTruthy();
        expect(rules['accepted']({ value: 'on' })).toBeTruthy();
        expect(rules['accepted']({ value: 1 })).toBeTruthy();
        expect(rules['accepted']({ value: true })).toBeTruthy();

        expect(rules['accepted']({ value: 'no' })).toBeFalsy();
        expect(rules['accepted']({ value: 'off' })).toBeFalsy();
        expect(rules['accepted']({ value: 0 })).toBeFalsy();
        expect(rules['accepted']({ value: false })).toBeFalsy();

        expect(rules['accepted']({ value: '123' })).toBeFalsy();
        expect(rules['accepted']({ value: 123 })).toBeFalsy();
        expect(rules['accepted']({ value: 'banana' })).toBeFalsy();
        expect(rules['accepted']({ value: null })).toBeFalsy();
        expect(rules['accepted']({ value: '0' })).toBeFalsy();

    })

    it('Validates: after', () => {

        // after
        expect(rules['after']({ value: '2022-09-12', params: ['2022-08-12'], values: { } })).toBeTruthy();
        expect(rules['after']({ value: '2022-09-12', params: ['date'], values: { date: '2022-08-12' } })).toBeTruthy();

        expect(rules['after']({ value: '2022-09-12', params: ['2022-10-12'], values: { } })).toBeFalsy();
        expect(rules['after']({ value: '2022-09-12', params: ['date'], values: { date: '2022-11-12' } })).toBeFalsy();

    })

    it('Validates: after or equal', () => {

        // after or equal
        expect(rules['after_or_equal']({ value: '2022-09-12', params: ['2022-09-12'], values: { } })).toBeTruthy();
        expect(rules['after_or_equal']({ value: '2022-09-12', params: ['date'], values: { date: '2022-09-12' } })).toBeTruthy();

        expect(rules['after_or_equal']({ value: '2022-09-13', params: ['2022-09-12'], values: { } })).toBeTruthy();
        expect(rules['after_or_equal']({ value: '2022-09-13', params: ['date'], values: { date: '2022-09-12' } })).toBeTruthy();

        expect(rules['after_or_equal']({ value: '2022-09-12', params: ['2022-09-13'], values: { } })).toBeFalsy();
        expect(rules['after_or_equal']({ value: '2022-09-12', params: ['date'], values: { date: '2022-11-13' } })).toBeFalsy();

    })

    // TODO array

    it('Validates: before', () => {

        // after
        expect(rules['before']({ value: '2022-08-12', params: ['2022-09-12'], values: { } })).toBeTruthy();
        expect(rules['before']({ value: '2022-08-12', params: ['date'], values: { date: '2022-09-12' } })).toBeTruthy();

        expect(rules['before']({ value: '2022-10-12', params: ['2022-09-12'], values: { } })).toBeFalsy();
        expect(rules['before']({ value: '2022-10-12', params: ['date'], values: { date: '2022-09-12' } })).toBeFalsy();

    })

    it('Validates: before or equal', () => {

        // after or equal
        expect(rules['before_or_equal']({ value: '2022-09-12', params: ['2022-09-12'], values: { } })).toBeTruthy();
        expect(rules['before_or_equal']({ value: '2022-09-12', params: ['date'], values: { date: '2022-09-12' } })).toBeTruthy();

        expect(rules['before_or_equal']({ value: '2022-09-12', params: ['2022-09-13'], values: { } })).toBeTruthy();
        expect(rules['before_or_equal']({ value: '2022-09-12', params: ['date'], values: { date: '2022-09-13' } })).toBeTruthy();

        expect(rules['before_or_equal']({ value: '2022-09-13', params: ['2022-09-12'], values: { } })).toBeFalsy();
        expect(rules['before_or_equal']({ value: '2022-09-13', params: ['date'], values: { date: '2022-09-12' } })).toBeFalsy();

    })

    it('Validates: boolean', () => {

        // boolean
        expect(rules['boolean']({ value: true, params: [], values: { } })).toBeTruthy();
        expect(rules['boolean']({ value: false, params: [], values: { } })).toBeTruthy();
        expect(rules['boolean']({ value: 1, params: [], values: { } })).toBeTruthy();
        expect(rules['boolean']({ value: 0, params: [], values: { } })).toBeTruthy();
        expect(rules['boolean']({ value: '1', params: [], values: { } })).toBeTruthy();
        expect(rules['boolean']({ value: '0', params: [], values: { } })).toBeTruthy();
        expect(rules['boolean']({ value: 'true', params: [], values: { } })).toBeTruthy();
        expect(rules['boolean']({ value: 'false', params: [], values: { } })).toBeTruthy();

        expect(rules['boolean']({ value: '3', params: [], values: { } })).toBeFalsy();
        expect(rules['boolean']({ value: 23, params: [], values: { } })).toBeFalsy();
        expect(rules['boolean']({ value: 'no', params: [], values: { } })).toBeFalsy();
        expect(rules['boolean']({ value: 'yes', params: [], values: { } })).toBeFalsy();

    })

    it('Validates: date format', () => {

        // date format
        expect(rules['date_format']({ value: '2022-12-01', params: ['YYYY-MM-DD'], values: { } })).toBeTruthy();
        expect(rules['date_format']({ value: '12/01/2022', params: ['YYYY-MM-DD'], values: { } })).toBeFalsy();

    })

    // TODO declined

    // TODO declined_if

    it('Validates: greater than', () => {

        // geater than
        expect(rules['gt']({ value: 5, params: ['minimum_value'], values: { minimum_value: 3 } })).toBeTruthy();
        expect(rules['gt']({ value: 3, params: ['minimum_value'], values: { minimum_value: 3 } })).toBeFalsy();

        expect(rules['gt']({ value: 5, params: ['minimum_value'], values: { minimum_value: '3' } })).toBeTruthy();
        expect(rules['gt']({ value: 3, params: ['minimum_value'], values: { minimum_value: '3' } })).toBeFalsy();

        expect(rules['gt']({ value: 5, params: ['3'], values: { } })).toBeTruthy();
        expect(rules['gt']({ value: -12, params: ['3'], values: { } })).toBeFalsy();
    })

    it('Validates: greater than or equal', () => {

        // greater than or equal
        expect(rules['gte']({ value: 5, params: ['minimum_value'], values: { minimum_value: 5 } })).toBeTruthy();
        expect(rules['gte']({ value: 3, params: ['minimum_value'], values: { minimum_value: 5 } })).toBeFalsy();

        expect(rules['gte']({ value: 5, params: ['minimum_value'], values: { minimum_value: '5' } })).toBeTruthy();
        expect(rules['gte']({ value: 3, params: ['minimum_value'], values: { minimum_value: '5' } })).toBeFalsy();

        expect(rules['gte']({ value: 5, params: ['3'], values: { } })).toBeTruthy();
        expect(rules['gte']({ value: 5, params: ['5'], values: { } })).toBeTruthy();
        expect(rules['gte']({ value: -12, params: ['3'], values: { } })).toBeFalsy();
    })

    // TODO mac address

    it('Validates: multiple of', () => {

        // multiple of
        expect(rules['multiple_of']({ value: 5, params: ['20'], values: { } })).toBeTruthy();
        expect(rules['multiple_of']({ value: 5, params: ['21'], values: { } })).toBeFalsy();
        expect(rules['multiple_of']({ value: 5, params: [20], values: { } })).toBeTruthy();
        expect(rules['multiple_of']({ value: 5, params: [21], values: { } })).toBeFalsy();

    })

    it('Validates: numeric', () => {

        // numeric
        expect(rules['numeric']({ value: 5, params: [], values: { } })).toBeTruthy();
        expect(rules['numeric']({ value: '5', params: [], values: { } })).toBeTruthy();
        expect(rules['numeric']({ value: '12,500', params: [], values: { } })).toBeFalsy();
        expect(rules['numeric']({ value: '12500', params: [], values: { } })).toBeTruthy();
        expect(rules['numeric']({ value: '12.12.12', params: [], values: { } })).toBeFalsy();

    })

    it('Validates: regex', () => {

        // regex
        expect(rules['regex']({ value: '/^banana/', params: [], values: { } })).toBeTruthy();
        expect(rules['regex']({ value: 'hello', params: [], values: { } })).toBeTruthy();
        expect(rules['regex']({ value: '[', params: [], values: { } })).toBeFalsy();

    })

})