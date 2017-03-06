var dbThis = function(cbk, self){
  var _self = this;
  this.stack = {};
  this.count = 0;
  var id = encodeURIComponent(self.req.__post.id) || '',
    password = encodeURIComponent(self.req.__post.password) || '',
    to = self.req.__post.to || '',
    host = self.req.__post.host || '',
    title = self.req.__post.title || '',
    text = self.req.__post.text || '';

  var nodemailer = require("nodemailer");
  // 开启一个 SMTP 连接池
  var smtpTransport = nodemailer.createTransport('smtps://' + id + '%40' + host + '.com:' + password + '@' + host);
  // 设置邮件内容
  var mailOptions = {
    from: 'yy <' + id + '@' + host + '.com>', // 发件地址
    to: to, // 收件列表
    subject: title, // Subject line
    text: text, // plaintext body
    html: text // html body
  }
  // 发送邮件
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        db.dbResult(this, function(_self){
          return cbk(null ,{'data' : error});
        });
    }else{
        db.dbResult(this, function(_self){
          return cbk(null ,{'data' : 1});
        });
    }
    smtpTransport.close(); // 如果没用，关闭连接池
  });


}
exports.dbThis = dbThis;