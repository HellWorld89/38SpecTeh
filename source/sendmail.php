<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

// 1. Подключаем автозагрузчик Composer
// Мы поднимаемся на одну папку вверх из source/ в корень, где лежит vendor/
require __DIR__ . '/vendor/autoload.php';

// 2. Теперь классы доступны
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || empty($data['name']) || empty($data['phone'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Некорректные данные']);
    exit;
}

$mail = new PHPMailer(true);

try {
    // --- НАСТРОЙКИ SMTP (ЗАМЕНИТЕ НА СВОИ!) ---
    $mail->isSMTP();
    $mail->Host       = 'smtp.yandex.ru'; 
    $mail->SMTPAuth   = true;
    $mail->Username   = 'specirkutsk@yandex.ru';
    $mail->Password   = 'nmxjtdigbkwgphyg';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom('specirkutsk@yandex.ru', 'Заявка 38СпецТех');
    $mail->addAddress('specirkutsk@yandex.ru', 'Менеджер'); 

    $mail->isHTML(true);
    $mail->Subject = '🔥 Новая заявка с сайта!';
    
    $msg = "
        <h2>Новая заявка с сайта</h2>
        <p><b>Имя:</b> {$data['name']}</p>
        <p><b>Телефон:</b> {$data['phone']}</p>
        <p><b>Техника:</b> {$data['equipment']}</p>
        <p><b>Задача:</b> {$data['task']}</p>
        <p><b>Сроки:</b> {$data['when']}</p>
        <p><b>Адрес:</b> {$data['address']}</p>
        <br>
        <p><small>Страница: {$data['page']}</small></p>
    ";

    $mail->Body = $msg;
    $mail->send();
    echo json_encode(['status' => 'success']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => "Ошибка: {$mail->ErrorInfo}"]);
}