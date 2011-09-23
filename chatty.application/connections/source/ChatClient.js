enyo.kind({
  name:"ChatClient",
  kind:'Component',
  published: {
    host:'irc.freenode.net',
    port:6667,
    nick:null,
    username:null,
    password:null,
    name:""
  },
  events: {
    onMessageReceived:"",
    onMessageSent:"",
    onClose:"",
    onConnect:"",
    onFailure:""
  },
  components:[
    { kind:'PalmService', service:'palm://com.redimastudio.chatty.client/', onFailure:'failed', components:[
      { name:'connect', onSuccess:'receivedData', subscribe:true },
      { name:'message', onSuccess:'sentMessage' },
      { name:'close', onSuccess: 'close' }
    ] }
  ],
  connect:function(){
    this.$.connect.call({
      nick:this.nick,
      host:this.host,
      port:this.port
    });
  },
  failed:function(service, response, request){
    this.doFailure(response, request);
  },
  receivedData:function(service, response, request){
    if (response.status == 'connect') {
      this.clientId = response.clientId;
      this.doConnect();
      this.write("NICK " + this.nick + "\r\n" + "USER " + this.nick + " 0 * " + this.name + "\r\n");
    }else if (response.status == 'read') {
      this.doMessageReceived(response.data);
    }else if (response.status == 'close'){
      this.doClose();
    }
  },
  sentMessage:function(service, response, request){
    this.doMessageSent(response.message);
  },
  write:function(data){
    this.$.message.call({
      clientId:this.clientId,
      message:data
    });
  }
});