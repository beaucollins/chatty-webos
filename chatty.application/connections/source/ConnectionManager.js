enyo.kind({
  name:'ConnectionManager',
  kind:'VFlexBox',
  components:[
    {name:'irc_client', kind:'ChatClient', onMessageSent:'messageSent', onMessageReceived:'messageReceived', onConnect:'connected'},
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
        { name:'composer', kind:"HFlexBox", components:[
          { name:"messageInput", kind: 'Input', flex:1, oninput:'checkMessage', onkeypress:'sendOnEnter' },
          { name:'sendButton', kind: 'Button', caption:'Send', onclick:"sendMessage", disabled:true }
        ] }
      ]}
    ]}
  ],
  connect: function(sender){
    var chat_client = this.$.irc_client;
    chat_client.setHost(this.$.host.value);
    chat_client.setPort(this.$.port.value);
    chat_client.setNick(this.$.nick.value);
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
    this.$.scroller.scrollToBottom();
  },
  checkMessage:function(sender, event, value){
    if (value && value.trim() != "") {
      this.$.sendButton.setDisabled(false);
    };
  },
  sendOnEnter:function(sender, event){
    if (event.which == 13) {
      this.sendMessage(sender, event, this.$.messageInput.value);
      event.preventDefault();
    };
  },
  sendMessage:function(sender, event, value){
    this.$.messageInput.setValue('');
    this.$.irc_client.write(value + "\r\n");
  }
});