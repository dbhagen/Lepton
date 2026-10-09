/* eslint-env jest */
let search

const gistAlphabravo = {
  id: 'gist-alphabravo-001',
  description: 'alphabravo sharedtoken sorting utility',
  language: 'JavaScript',
  filename: 'alphabravo.js'
}

const gistDeltakilo = {
  id: 'gist-deltakilo-002',
  description: 'deltakilo sharedtoken helper script',
  language: 'Python',
  filename: 'deltakilo.py'
}

beforeEach(() => {
  jest.resetModules()
  search = require('../index')
})

describe('fuseSearch', () => {
  test('finds matching gists across description, filename, language and id keys', () => {
    search.resetFuseIndex([
      gistAlphabravo,
      gistDeltakilo,
      { id: 'gist-gammazeta-003', description: 'chart drawing notebook', language: 'TypeScript', filename: 'gammazeta-chart.ts' }
    ])
    search.initFuseSearch()

    const byDescription = search.fuseSearch('alphabravo')
    expect(byDescription).toHaveLength(1)
    expect(byDescription[0].id).toBe('gist-alphabravo-001')

    const byFilename = search.fuseSearch('gammazeta')
    expect(byFilename).toHaveLength(1)
    expect(byFilename[0].filename).toBe('gammazeta-chart.ts')

    const byLanguage = search.fuseSearch('typescript')
    expect(byLanguage).toHaveLength(1)
    expect(byLanguage[0].id).toBe('gist-gammazeta-003')

    const byId = search.fuseSearch('deltakilo')
    expect(byId).toHaveLength(1)
    expect(byId[0].id).toBe('gist-deltakilo-002')

    expect(search.fuseSearch('zuluquebec')).toEqual([])
  })

  test('addToFuseIndex followed by re-init makes the new item findable', () => {
    search.resetFuseIndex([gistAlphabravo, gistDeltakilo])
    search.initFuseSearch()
    expect(search.fuseSearch('alphabravo')).toHaveLength(1)

    search.addToFuseIndex({
      id: 'gist-whiskeyoscar-004',
      description: 'whiskeyoscar color picker',
      language: 'CSS',
      filename: 'whiskeyoscar.css'
    })
    search.initFuseSearch()

    const found = search.fuseSearch('whiskeyoscar')
    expect(found).toHaveLength(1)
    expect(found[0].id).toBe('gist-whiskeyoscar-004')
    expect(search.fuseSearch('alphabravo')).toHaveLength(1)
  })

  test('updateFuseIndex replaces the item with the same id exactly once', () => {
    search.resetFuseIndex([
      { id: 'gist-kilocharlie-001', description: 'chartmarker sharedtoken utility', language: 'JavaScript', filename: 'chartmarker.js' },
      { id: 'gist-romeogolf-002', description: 'romeogolf sharedtoken helper script', language: 'Python', filename: 'romeogolf.py' }
    ])
    search.initFuseSearch()
    expect(search.fuseSearch('sharedtoken')).toHaveLength(2)

    search.updateFuseIndex({
      id: 'gist-kilocharlie-001',
      description: 'gammazeta sharedtoken utility',
      language: 'Rust',
      filename: 'gammazeta.rs'
    })
    search.initFuseSearch()

    expect(search.fuseSearch('chartmarker')).toEqual([])
    const updated = search.fuseSearch('gammazeta')
    expect(updated).toHaveLength(1)
    expect(updated[0].id).toBe('gist-kilocharlie-001')
    expect(updated[0].filename).toBe('gammazeta.rs')
    expect(search.fuseSearch('sharedtoken')).toHaveLength(2)
  })

  test('empty, whitespace and single-character patterns return no results', () => {
    search.resetFuseIndex([gistAlphabravo, gistDeltakilo])
    search.initFuseSearch()

    expect(search.fuseSearch('')).toEqual([])
    expect(search.fuseSearch('   ')).toEqual([])
    expect(search.fuseSearch('a')).toEqual([])
  })
})
