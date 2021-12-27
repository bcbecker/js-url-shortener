//Set this to your registered API key from bit.ly
let apiKey = "";

document.getElementById("shorten-url").addEventListener("click", async () => {
  let urlInput = document.getElementById("url");
  let shortUrl = document.getElementById("short-url");

  const url = await shortenUrl(urlInput.value);

  shortUrl.innerHTML = url;
  copyToClipboard(url);
});

document.getElementById("copy-url").addEventListener("click", (_) => {
  let shortUrl = document.getElementById("short-url").innerHTML;
  copyToClipboard(shortUrl);
});

async function shortenUrl(longUrl) {
  var response = await fetch("https://api-ssl.bitly.com/v4/shorten", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ long_url: longUrl }),
  });

  var json = await response.json();

  return json.link;
}

var copyToClipboard = (str) => navigator.clipboard.writeText(str);
