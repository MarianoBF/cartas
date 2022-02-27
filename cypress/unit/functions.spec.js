describe('Unit Test FizzBuzz', () => {
    function numsExpectedToEq(arr, expected) {
      arr.forEach((num) => {
        expect(fizzbuzz(num)).to.eq(expected)
      })
    }
  
    it.only('returns "fizz" when number is multiple of 3', () => {
      numsExpectedToEq([9, 12, 18], 'fizz')
    })
  
    it('returns "buzz" when number is multiple of 5', () => {
      numsExpectedToEq([10, 20, 25], 'buzz')
    })
  
    it('returns "fizzbuzz" when number is multiple of both 3 and 5', () => {
      numsExpectedToEq([15, 30, 60], 'fizzbuzz')
    })
  })