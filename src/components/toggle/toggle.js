class Toggle extends HTMLElement {
  constructor() {
    super()

    let selectedLanguage = 'en'
    const idAttribute = this.getAttribute('id')
    const lightAttribute =
      this.getAttribute('light') === 'true' ? 'army-toggle-light' : ''
    const template = document.createElement('template')

    if (!idAttribute) {
      console.log(
        'please check your markup. the toggle component is missing an id attribute'
      )
      return
    }

    template.innerHTML = `
      <style>
        @import './component.scss';
      </style>

      <label class="army-toggle ${lightAttribute}">
        <input type="hidden" name="toggle-1" value="en" />
        <div class="army-toggle-text-left">En</div>
        <input type="checkbox" name="toggle-1" value="es"/>
        <div class="army-toggle-text-right">Esp</div>
      </label>
    `

    this.appendChild(template.content.cloneNode(true))

    this.addEventListener('click', () => {
      selectedLanguage = selectedLanguage === 'en' ? 'es' : 'en'

      this.dispatchEvent(
        new CustomEvent('selected-language', {
          detail: { name: selectedLanguage },
          composed: true,
        })
      )
    })
  }
}

window.customElements.define('toggle-button', Toggle)