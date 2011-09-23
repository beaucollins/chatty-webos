if (typeof require == 'undefined') {
  require = IMPORTS.require;
};

var sys = require("sys");
var net = require("net");
var url = require("url");

var ConnectAssistant = function(){
  
}

ConnectAssistant.prototype.run = function(future, subscription){
  var client_assistant = this.controller.service.assistant;
  var args = this.controller.args;
  
  var client = client_assistant.createConnection();
  client.connect(args.port, args.host);
  
  client.on('connect', function(){
    future.result = {
      status:'connect',
      clientId:client.id
    }
  });
  
  client.on('close', function(){
    var f = subscription.get();
    f.result = {
      status:'close'
    }
  })
    
  client.on('data', function(data){
    var f = subscription.get();
    f.result = {
      status:'read',
      data:data.toString('ascii'),
      clientId:client.id
    }
  });
  
  // var client = client_assistant.createConnection(args.port, args.host);
  // future.result = {
  //   returnValue:true,
  //   clientId:client.id
  // }
  // client.on('connect', function(){
  //   future.result = {
  //     returnValue:true,
  //     clientId:client.id
  //   }
  // });
  // client.on('receive', function(messages){
  //   var f = subscription.get();
  //   f.result = {
  //     returnValue: true,
  //     messages: messages
  //   }
  // })
}