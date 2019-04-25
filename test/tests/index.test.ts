function sum(a: number, b: number) {
  return a + b
}

describe('index', () => {
  test('basic', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
