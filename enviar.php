<?php 
header('Content-Type: application/json'); 

$destinatario = "leoja00@gmail.com";
$asunto = "Contacto desde el sitio web";

$nombre = htmlspecialchars($_POST['nombre'] ?? '');
$email = htmlspecialchars($_POST['email'] ?? '');
$telefono = htmlspecialchars($_POST['telefono'] ?? '');
$duda = htmlspecialchars($_POST['duda'] ?? '');

// Verifica que todos los campos tengan datos
if (!empty($nombre) && !empty($email) && !empty($telefono) && !empty($duda)) {
    $cuerpo = "
        <html>
            <head></head>
            <body>
                <h3>Solicitud de contacto desde el sitio web</h3>
                <p>
                    <strong>Nombre:</strong> $nombre<br>
                    <strong>Correo:</strong> $email<br>
                    <strong>Teléfono:</strong> $telefono<br>
                    <strong>Consulta:</strong> $duda
                </p>
            </body>
        </html>
    ";

    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: $nombre <$email>\r\n";

    // Intenta enviar el correo
    if (mail($destinatario, $asunto, $cuerpo, $headers)) {
        echo json_encode(['success' => true]);
        exit;
    } else {
        echo json_encode(['success' => false, 'message' => 'No se pudo enviar el correo.']);
        exit;
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Faltan datos obligatorios.']);
    exit;
}
?>
