import '@/styles/_menu.scss'

export default {
  _element: {},
  _button: {},
  _random: Math.round(Math.random() * 100),

  _handleClick () {
    console.log('This will only be called once and the value is: ' + this._random)
  },

  attach () {
    document.body.innerHTML = ''

    this._element = document.createElement('div')
    this._element.classList.add('my-test-class')

    this._button = document.createElement('button')

    const text = Drupal.t('What a lovely button')
    const content = document.createTextNode(text + this._random)

    this._button.appendChild(content)
    this._button.addEventListener('click', () => this._handleClick())

    this._element.appendChild(this._button)

    document.body.appendChild(this._element)
  },

  detach () {
    this._button.removeEventListener('click', () => this._handleClick())
    this._element.parentNode.removeChild(this._element)
  }
}
