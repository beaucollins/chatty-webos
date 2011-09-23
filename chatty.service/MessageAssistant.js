if (typeof require == 'undefined') {
  require = IMPORTS.require;
};

var MessageAssistant = function(){
  
}

MessageAssistant.prototype.run = function(future){
  var client_assistant = this.controller.service.assistant;
  var args = this.controller.args;
  var client = client_assistant.getClient(args.clientId);
  
  client.write(args.message);
  future.result = {
    status:'sent',
    message:args.message,
    clientId:client.id
  };
  
}