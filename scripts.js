var client = new Paho.MQTT.Client("ws://broker.hivemq.com:8000/mqtt", "myClientId");
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

function onConnect() {
    console.log("---🟢 MQTT CONNECTED! 🟢---");    
    client.subscribe  ("rst_hotel/#");
  }

function onConnectionLost(responseObject) {
if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
}
}
function onMessageArrived(message) {
    var topic = message.destinationName;
    var payload = message.payloadString;
  
    console.log("Message received:", topic, payload);
    const currentUrl = window.location.href;
    switch(topic){
        case "rst_hotel/parking-available":
        localStorage.setItem("parking-available", payload);
        // console.log(payload);
        break;
        case "rst_hotel/room/temp":
        localStorage.setItem("temp", payload);
        break;
        case "rst_hotel/room/hum":
        localStorage.setItem("hum", payload);
        break;
        case "rst_hotel/gas_detect":
        alert("Gas Detect!!!")
        break;
    }
    switch (currentUrl) {
        case "http://127.0.0.1:5501/parking.html":
            document.getElementById("parking-available").innerHTML = localStorage.getItem("parking-available");
          break;
        case "http://127.0.0.1:5501/iot_room.html":
            document.getElementById("temp_num").innerHTML = localStorage.getItem("temp");
            document.getElementById("hum_num").innerHTML = localStorage.getItem("hum");
          break;
      }
}
function connectMQTT(){
    client.connect({onSuccess:onConnect});
}
function requiredData(){
    message = new Paho.MQTT.Message("1");
    message.destinationName = "rst_hotel-requiredData";
    client.send(message);
    console.log("Data Required!")
}
function light_pub(data,chanel){
    message = new Paho.MQTT.Message(String(data));
    message.destinationName = "rst_hotel/room/light"+chanel;
    client.send(message);
}
function iot_public(data,id){
    message = new Paho.MQTT.Message(String(data));
    message.destinationName = "rst_hotel/room/"+id;
    client.send(message);
}