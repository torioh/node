// WebSocketサーバに接続
var ws = new WebSocket('ws://localhost:8888/');

//var ws = new WebSocket('ws://182.48.61.34:8888/');

// 発言イベント
input_chat.onkeydown = function(event) {
  // エンターキーを押したとき
  if (event.keyCode === 13 && input_chat.value.length > 0) {
    
    // ユーザー名が記入されているとき
    if (input_user_name.value != '') {

       ws.send(JSON.stringify({
          type: 'chat',
        user: input_user_name.value,
        text: input_chat.value
        }));
    input_chat.value = '';
    msg_error.textContent = '';
    }else{
        msg_error.textContent = 'user name is empty';
        //msg_error.style.color = "red";
        $("#msg_error").css({"color":"red"}).hide().fadeIn(500);
    }
  }
};


// メッセージ受信イベントを処理
ws.onmessage = function(event){

  // 受信メッセージをパース
  var data = JSON.parse(event.data);
  //var user_name = data.user ? data.user : "anonymous";

  // メッセージの背景設定
  var msg_color = (input_user_name.value === data.user) ? 'alert alert-info' : 'alert';


  var item = $('<li>').append(
        $('<div>').addClass(msg_color).append(
    //$('<div>').addClass('alert alert-info').append(
        $('<i>').addClass('icon-user').after(data.user + " "),
        $('<small>').append(data.time))
        .append($('<li>').text(data.text))
        );
   
   // 効果オン再生
   document.getElementById("sound").play();


  // $('#chat-history').popover({animation:false,
  //   placement:"top",
  //   content:data.text,
  //   trigger:"hover"
  //   }).prepend(item);
    $('#chat-history').prepend(item).hide().fadeIn(500);


}