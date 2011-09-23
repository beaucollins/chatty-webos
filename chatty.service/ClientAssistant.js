if (typeof require === 'undefined') {
  require = IMPORTS.require;
};
var net = require("net");

var ClientManager = function(){
  var id = 0;
  var clients = {};
  
  function createId(){
    id++;
    return id;
  }
  
  this.createConnection = function(){
    var client = new net.Stream();
    client.id = createId();
    clients[client.id] = client;
    return client;
  }
  
  this.getClient = function(clientId){
    return clients[client.id];
  }
  
}



var ClientAssistant = function(){
  this.manager = new ClientManager();
  
}

ClientAssistant.prototype.createConnection = function(){
  var client = this.manager.createConnection();
  return client;
}

ClientAssistant.prototype.getClient = function(clientId){
  return this.manager.getClient(client.id);
}

ClientAssistant.prototype.setup = function(){
  console.log("------> ClientAssistant Setup Executed");
}