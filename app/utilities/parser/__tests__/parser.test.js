/* eslint-env jest */
const { descriptionParser, addLangPrefix, parseLangName, addCustomTagsPrefix, parseCustomTags } = require('../index')

describe('descriptionParser', () => {
  test('parses legacy style title, description and custom tags', () => {
    expect(descriptionParser('[my_title] my_description #tags: a, b, c')).toEqual({
      title: 'my_title',
      description: ' my_description ',
      customTags: '#tags: a, b, c'
    })
  })

  test('parses twitter style hashtags and keeps the hashtag tail in the description', () => {
    expect(descriptionParser('[my_title] my_description #tag1 #tag2')).toEqual({
      title: 'my_title',
      description: ' my_description #tag1 #tag2',
      customTags: '#tags:tag1, tag2'
    })
  })

  test('falls back to the no-description defaults for null and empty payloads', () => {
    expect(descriptionParser(null)).toEqual({ title: '', description: 'No description', customTags: '' })
    expect(descriptionParser('')).toEqual({ title: '', description: 'No description', customTags: '' })
  })
})

describe('language prefix helpers', () => {
  test('addLangPrefix prefixes a non-empty language', () => {
    expect(addLangPrefix('JavaScript')).toBe('lang@JavaScript')
  })

  test('addLangPrefix trims surrounding whitespace', () => {
    expect(addLangPrefix('  Rust  ')).toBe('lang@Rust')
  })

  test('addLangPrefix maps an empty payload to Other', () => {
    expect(addLangPrefix('')).toBe('lang@Other')
  })

  test('parseLangName strips the prefix and round-trips with addLangPrefix', () => {
    expect(parseLangName('lang@JavaScript')).toBe('JavaScript')
    expect(parseLangName(addLangPrefix('JavaScript'))).toBe('JavaScript')
  })

  test('parseLangName passes through payloads without the prefix', () => {
    expect(parseLangName('python')).toBe('python')
  })
})

describe('custom tag helpers', () => {
  test('addCustomTagsPrefix trims and prefixes, and parseCustomTags round-trips', () => {
    expect(addCustomTagsPrefix(' a, b ')).toBe('#tags:a, b')
    expect(parseCustomTags(addCustomTagsPrefix(' a, b '))).toEqual(['a', 'b'])
  })

  test('parseCustomTags splits CJK commas like ASCII commas', () => {
    expect(parseCustomTags('#tags:a，b、c')).toEqual(['a', 'b', 'c'])
  })

  test('parseCustomTags trims tags and filters out empties', () => {
    expect(parseCustomTags('#tags:  a ,,  b  ')).toEqual(['a', 'b'])
  })

  test('parseCustomTags returns an empty list for non-prefixed, prefix-only and null payloads', () => {
    expect(parseCustomTags('a, b')).toEqual([])
    expect(parseCustomTags('#tags:')).toEqual([])
    expect(parseCustomTags(null)).toEqual([])
  })
})
