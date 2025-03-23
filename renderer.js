const information = document.getElementById("info");

information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()}),`;

const func = async () => {
    const response = await window.versions.ping({id:123})
    console.log(response) // in ra 'pong'
  }

  func();