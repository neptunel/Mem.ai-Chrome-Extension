import { MemClient } from "@mem-labs/mem-node";
const text = document.getElementById('mem-text');
const saveButton = document.getElementById('mem-save-button');
const apiKey = document.getElementById('mem-api-key');

chrome.tabs && chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const url = tabs[0].url
  const title = tabs[0].title
  document.getElementById("mem-text").innerHTML = title + "\n" + url;
})

saveButton.addEventListener('click', () => {
  if (apiKey.value === '') {
    document.getElementById("api-key-message").innerHTML = "Please enter your API key!";
  }
  else {
    const memClient = new MemClient({
      apiAccessToken: apiKey.value,
    });

    const apiCallPromise = new Promise((resolve, reject) => {
      const apiCall = memClient.createMem({
        content: text.value
      });

      apiCall.then((response) => {
        console.log(response);
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });

    apiCallPromise.then((response) => {
      document.getElementById("output").style="color:green";
      document.getElementById("output").innerHTML = "Great! Mem successfully created.";
      console.log(response);
    }).catch((error) => {
      document.getElementById("output").style="color:red";
      document.getElementById("output").innerHTML = "Error! Make sure your API key is correct!";
      console.error(error);
    });

  }
});

