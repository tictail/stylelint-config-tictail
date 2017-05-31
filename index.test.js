/* eslint-disable no-undef */

const config = require('./index')
const stylelint = require('stylelint')

const validCss = `/**
 * Multi-line comment
 */
.selector-1,
.selector-2,
.selector-3[type='text'] {
  background: linear-gradient(#fff, rgba(0, 0, 0, 0.8));
  box-sizing: border-box;
  color: #333;
  display: block;
}
`

const invalidCss = `a {
  top: .2em;
},
.test{
  background: red !important;
  margin: 0;
  color: blue;
  margin: 0 auto;
}
`

test('It returns no warnings with valid .scss', () => {
  return stylelint
    .lint({
      code: validCss,
      config,
    })
    .then(data => {
      const { results } = data
      const { warnings } = results[0]
      expect(warnings.length).toBe(0)
    })
})

test('It returns warnings with invalid .scss', () => {
  return stylelint
    .lint({
      code: invalidCss,
      config,
    })
    .then(data => {
      const { results } = data
      const { warnings } = results[0]
      expect(warnings.length).toBe(7)
    })
})
