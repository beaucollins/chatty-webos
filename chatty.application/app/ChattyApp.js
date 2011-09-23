enyo.kind({
  name:'ChattyApp',
  kind:'enyo.Control',
  components:[
  ],
  create:function(){
    this.inherited(arguments)
  },
  startup:function(){
    this.openConnectionManager();
  },
  relaunch:function(params){
    this.openConnectionManager(params);
  },
  openConnectionManager:function(params){
    var basePath = enyo.fetchAppRootPath();
    enyo.windows.activate(basePath + 'connections/index.html','connections', params);
  },
  createConnection:function(params){
    // host
    // port
    // nick
    // ident
    var client = this.createComponent({
      kind:'IRCClient'
    });
  }
})