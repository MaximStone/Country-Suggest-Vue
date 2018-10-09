<template>
    <div class="autocomplete">
        <input type="text" @cut="inputChanged" @change="inputChanged" @input="inputChanged" v-model="value"/>
        <ul class="autocomplete-results" v-show="isMenuVisible">
            <li class="autocomplete-result" v-for="(country, i) in suggestions" :key="i" @click="countryClickHandler(country)">
                <img :src="getFlag(country)" /> <span v-html="boldSelectedResult(country)"></span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'Country-Suggest',
  props: {
    apiURL: {
      type: String,
      default: 'https://restcountries.eu/rest/v2/name/{name}?fields=name;flag;'
    },
    flagField: {
      default: 'flag'
    },
    delay: {
      type: Number,
      default: 600
    }
  },
  data: function () {
    return {
      suggestions: [],
      value: '',
      inputTimeout: 0,
      request: null
    }
  },
  methods: {
    getSuggestions: function () {
      this.suggestions.length = 0
      this.request = new XMLHttpRequest()
      this.request.onload = this.requestListener
      this.request.open('GET', this.getApiURLFormatted(this.value), true)
      this.request.send()
    },
    inputChanged: function () {
      if (!this.value) {
        this.suggestions.length = 0
      }
      clearTimeout(this.inputTimeout)
      setTimeout(this.getSuggestions, this.delay)
    },
    requestListener: function () {
      this.suggestions = JSON.parse(this.request.responseText)
      this.request = null
    },
    getFlag: function (item) {
      if (typeof this.flagField === 'function') {
        return this.flagField(item)
      } else {
        return item[this.flagField]
      }
    },
    getApiURLFormatted: function (name) {
      return this.apiURL.replace('{name}', name)
    },
    boldSelectedResult: function (country) {
      let regExp = new RegExp(this.value, 'i')
      return country.name.replace(regExp, '<span class="bold"">$&</span>')
    },
    countryClickHandler: function (country) {
      this.value = country.name
    }
  },
  computed: {
    isMenuVisible: function () {
      return this.suggestions.length > 0 && this.value !== this.suggestions[0].name
    }
  }

}
</script>

<style scoped>
    .autocomplete {
        position: relative;
        width: 100%;
    }

    .autocomplete input[type=text] {
        width: 100%;
    }

    .autocomplete-results {
        padding: 0;
        margin: 0;
        border: 1px solid #eeeeee;
        width: 100%;
        overflow: hidden;
    }

    .autocomplete-result {
        list-style: none;
        text-align: left;
        padding: 4px 2px;
        width: 100%;
        cursor: pointer;
    }

    .autocomplete-result >>> img {
        max-width: 16px;
        margin-right: 5px;
    }

    .autocomplete-result >>> span.bold {
        font-weight: bold;
    }

    .autocomplete-result:hover {
        background-color: #eaebea;
    }
</style>
