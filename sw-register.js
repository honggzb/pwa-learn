// main thread - 注册Service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register("sw.js")
    .then(registration => console.log("Service worker 注册成功: ", registration))
    .catch(error => console.log("Service worker 注册失败: ", error));
}