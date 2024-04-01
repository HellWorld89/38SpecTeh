<?php

use PHPMailer/PHPMailer/PHPMailer;
use PHPMailer/PHPMailer/Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->isHTML(true);

// От кого письмо
$mail->setFrom('info@fls.guru', 'Вован');
// Кому отправить
$mail->addAddress('sapozhnikovl@yandex.ru');
// Тема письма
$mail->Subject ='Заказ с сайта 38Specteh';

// Тело письма
$body = '<h1>Заявка с сайта</h1>';

if(trim(!empty($_POST['name']))){
  $body.='<p><strong>Имя:</strong>'.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['email']))){
  $body.='<p><strong>Имя:</strong>'.$_POST['email'].'</p>';
}
if(trim(!empty($_POST['phone']))){
  $body.='<p><strong>Имя:</strong>'.$_POST['phone'].'</p>';
}
if(trim(!empty($_POST['message']))){
  $body.='<p><strong>Имя:</strong>'.$_POST['message'].'</p>';
}

$mail->Body = $body;

// Отправка

if (!$mail->send()) {
  $message = 'Ошибка';
} else {
  $message = 'Данные отправлены!';
}

$response = ['message' => $message];

header('Content-type:application/json');
echo json_encode($response);
?>
