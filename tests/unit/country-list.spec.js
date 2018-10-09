import CountrySuggest from '@/components/Country-Suggest.vue'
import { shallowMount } from '@vue/test-utils'

let testProps = { apiURL: 'https://restcountries.eu/rest/v2/name/{name}?fields=name;flag;',
  flagField: 'flag',
  flagFieldFunction: function (country) {
    return country.flag
  } }

describe('Country Suggestion input tests', () => {
  it('Empty state after render', () => {
    const wrapper = shallowMount(CountrySuggest, {
      propsData: {
        ...testProps
      }
    })
    expect(wrapper.vm.suggestions).toHaveLength(0)
    expect(wrapper.findAll('li.autocomplete-result').length).toBe(0)
  })

  it('Components renders correctly', () => {
    const wrapper = shallowMount(CountrySuggest, {
      propsData: {
        ...testProps
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('Props is correct', () => {
    const wrapper = shallowMount(CountrySuggest, {
      propsData: {
        ...testProps
      }
    })
    expect(wrapper.vm._props.apiURL).toBe(testProps.apiURL)
    expect(wrapper.vm._props.flagField).toBe(testProps.flagField)
  })

  it('Suggestions for "German"', (done) => {
    const wrapper = shallowMount(CountrySuggest, {
      propsData: {
        ...testProps
      }
    })
    const textInput = wrapper.find('input[type="text"]')
    textInput.setValue('German')

    setTimeout(() => {
      expect(wrapper.vm.suggestions).toHaveLength(1)
      const options = wrapper.findAll('li.autocomplete-result')
      expect(options.at(0).text()).toBe('Germany')
      expect(wrapper.element).toMatchSnapshot()
      done()
    }, 1000)
  })

  it('Use function type for flagField', (done) => {
    const wrapper = shallowMount(CountrySuggest, {
      propsData: {
        flagField: testProps.flagFieldFunction
      }
    })
    const textInput = wrapper.find('input[type="text"]')
    textInput.setValue('German')

    setTimeout(() => {
      expect(wrapper.vm.suggestions).toHaveLength(1)
      const option = wrapper.find('li.autocomplete-result img')
      expect(option.attributes('src')).toBe('https://restcountries.eu/data/deu.svg')
      done()
    }, 1000)
  })

  it('Suggestions for "sw"', (done) => {
    const wrapper = shallowMount(CountrySuggest, {
      propsData: {
        ...testProps
      }
    })

    const textInput = wrapper.find('input[type="text"]')
    textInput.setValue('sw')

    setTimeout(() => {
      expect(wrapper.vm.suggestions).toHaveLength(4)
      const options = wrapper.findAll('li.autocomplete-result')
      expect(options.at(0).text()).toBe('Botswana')
      expect(options.at(0).contains('img')).toBe(true)
      expect(wrapper.element).toMatchSnapshot()
      done()
    }, 1000)
  })

  it('Default apiURL and flagField works when props is empty', () => {
    const wrapper = shallowMount(CountrySuggest)
    expect(wrapper.vm._props.apiURL).toBe(testProps.apiURL)
    expect(wrapper.vm._props.flagField).toBe(testProps.flagField)
    expect(wrapper.vm.suggestions).toHaveLength(0)
    expect(wrapper.findAll('li.autocomplete-result').length).toBe(0)
  })
})
