class Api {
  url = 'http://localhost:3000'

  getBoxes() {
    return fetch(`${this.url}/boxes/01.json`).then(response => response.json());
  }
}

export default new Api();
