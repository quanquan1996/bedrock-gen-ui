import { fetchEventSource } from "@microsoft/fetch-event-source";

export const sendMessage = async (prompt, callback) => {
  return await fetchEventSource('/api', {
    method: "POST",
    body: JSON.stringify(prompt),
    credentials: 'include',
    headers: {
      Accept: "text/event-stream",
      'Content-Type': 'application/json'
    },
    onopen(res) {
      if (res.ok && res.status === 200) {
        console.log("Connection made ", res);
      } else if (
        res.status >= 400 &&
        res.status < 500 &&
        res.status !== 429
      ) {
        console.log("Client side error ", res);
      }
    },
    onmessage(event) {
      console.log(event.data)
      try {
        const parsedData = JSON.parse(event.data);
        callback(parsedData)
      } catch (err) {
        console.log(`event data => ${event.data} cannot be parsed to json, error: ${err}`)
      }
    },
    onclose() { },
    onerror(err) {
      console.log("There was an error from server", err);
      throw (err)
    },
  });
}
