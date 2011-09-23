enyo.kind({
  name:'ConnectionManager',
  kind:'VFlexBox',
  components:[
    {kind:'HFlexBox', flex:1, components:[
      { kind:'VFlexBox', flex:1, components:[
        {kind:'Header', content:'Config'},
        {flex:1, components:[
          {kind:'Input', name:'nick', autoCapitalize:'lowercase', hint:'Nick', value:'sammydavisjr'},
          {kind:'Input', name:'host', autoCapitalize:'lowercase', hint:'Host', value:'irc.freenode.net'},
          {kind:'Input', name:'port', autoCapitalize:'lowercase', hint:'Port', value:'6667'}
        ]},
        {kind:'Toolbar', components:[
          { caption:'Connect', onclick:'connect' }
        ]}
      ]},
      { kind:'VFlexBox', flex:2, components:[
        {kind:'Header', content:'Log'},
        { kind:'Scroller', flex:1, components:[
          { name:'log', className:'log', allowHtml:true}
        ]},
        { kind:'Toolbar', components:[
          { caption:"Join Room" }
        ] }
      ]}
    ]}
  ],
  connect: function(sender){
    this.appendLog("<p>Connecting ...</p>");
    this.createComponent({
      name:'irc_client',
      kind:'IRCClient',
      host:this.$.host.value,
      port:this.$.port.value,
      nick:this.$.nick.value,
      onMessageSent: "messageSent",
      onMessageReceived: "messageReceived",
      onConnect: "connected"
    });
    this.$.irc_client.connect();
    this.appendLog("<p>Connecting ...</p>");
  },
  messageSent:function(sender, message){
    this.appendLog("<p>=&gt; " + message.split("\r\n").join("<br>") + "</p>");
  },
  messageReceived:function(sender, message){
    this.appendLog("<p>&lt;= " + message.split("\r\n").join("<br>") + "</p>");
  },
  connected: function(sender){
    this.appendLog("<p>Connected</p>");
  },
  failed: function(sender, response, request){
    this.appendLog("<p>" + enyo.json.stringify(response) + "</p>");
  },
  appendLog:function(message){
    this.$.log.setContent(this.$.log.content + message);
  }
});