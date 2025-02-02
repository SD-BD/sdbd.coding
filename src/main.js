import plugin from '../plugin.json';

import markdownit from 'markdown-it';
const SideButton = acode.require('sideButton');

class AcodePlugin {
  async init() {
    // Load additional resources if necessary
    this.$markdownItFile = tag("script", {
      src: this.baseUrl + "assets/markdown-it.min.js",
    });

    document.head.append(this.$markdownItFile);

    // Create a side button
    this.sideButton = SideButton({
      text: 'SDBD Coding',
      icon: 'icon.png', // Replace with the actual icon name if required
      onclick: () => this.openPopup(),
      backgroundColor: '#007bff',
      textColor: '#fff',
    });

    // Show the side button
    this.sideButton.show();
  }

  openPopup() {
    // Create popup container
    const popup = window.createElement('div');
    popup.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      width: 300px;
      height: 200px;
      transform: translate(-50%, -50%);
      background-color: white;
      border: 1px solid #ddd;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      padding: 10px;
    `;

    // Create iframe to load the URL
    const iframe = window.open.createElement('iframe');
    iframe.src = 'https://sarkardeveloper.is-best.net/code/load.html';
    iframe.style.cssText = `
      width: 100%;
      height: calc(100% - 30px);
      border: none;
    `;
    popup.appendChild(iframe);

    // Close button for the popup
    const closeButton = window.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.cssText = `
      display: block;
      margin: 10px auto 0;
      background-color: red;
      color: white;
      border: none;
      border-radius: 3px;
      padding: 5px 10px;
      cursor: pointer;
    `;
    closeButton.addEventListener('click', () => {
      popup.remove();
    });
    popup.appendChild(closeButton);

    // Append the popup to the document body
    document.body.appendChild(popup);
  }

  async destroy() {
    // Remove side button and clean up if necessary
    if (this.sideButton) {
      this.sideButton.hide();
    }
  }
}

if (window.acode) {
  const acodePlugin = new AcodePlugin();
  acode.setPluginInit('plugin-id', async (baseUrl) => {
    acodePlugin.baseUrl = baseUrl;
    await acodePlugin.init();
  });
  acode.setPluginUnmount('plugin-id', () => {
    acodePlugin.destroy();
  });
}
