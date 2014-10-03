require 'mandrill'  

$m_client = Mandrill::API.new ENV['MANDRILL_KEY']

message = {  
 :subject=> "Hello from the Mandrill API",  
 :from_name=> "Your name",  
 :text=>"Hi message, how are you?",  
 :to=>[  
   {  
     :email=> "ben.brostoff@gmail.com",  
     :name=> "Recipient1"  
   }  
 ],  
 :html=>"<html><h1>Hi <strong>message</strong>, how are you?</h1></html>",  
 :from_email=>"ben.brostoff@gmail.com"  
}  

$m_client.messages.send message