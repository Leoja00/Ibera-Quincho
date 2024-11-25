<?php 
	$destinatario="leoja00@gmail.com";
	$asunto="Contacto desde el sitio web";


	$nombre=$_POST['nombre'];
	$email=$_POST['email'];
    $telefono=$_POST['telefono'];
	$duda=$_POST['duda'];


	$cuerpo='
		<html>
			<head>
			</head>
			<body>
				<h3>Solicitud de contacto con Ibera Quincho!</h3>
				<p>
					Nombre: '.$nombre.'<br>
					Correo: '.$email.'<br>
					Telefono: '.$telefono.'<br>
					Consulta: '.$duda.'
				</p>
			</body>
		</html>	
	';

	

	$headers="MIME-Version: 1.0\r\n";
	$headers.="Content-type: text/html;charset=UTF8\r\n";

	//dirrecion remitente
	$headers.="FROM:$nombre <$email>\r\n";

	mail($destinatario,$asunto,$cuerpo,$headers);
	header('Location:index.html#contacto')

 ?> 