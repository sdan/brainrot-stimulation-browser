chrome.webRequest.onHeadersReceived.addListener(
  (details) => {
    const responseHeaders = details.responseHeaders;
    const cspHeader = responseHeaders.find(
      (h) => h.name.toLowerCase() === "content-security-policy"
    );
    if (cspHeader) {
      // Add sdan.io to the media-src directive
      cspHeader.value = cspHeader.value.replace(
        "media-src 'self' *.oaiusercontent.com blob: https://cdn.openai.com https://persistent.oaistatic.com",
        "media-src 'self' *.oaiusercontent.com blob: https://cdn.openai.com https://persistent.oaistatic.com https://brainrot-vscode-ext.sdan.io"
      );
    }
    return { responseHeaders };
  },
  { urls: ["<all_urls>"] },
  ["blocking", "responseHeaders"]
); 