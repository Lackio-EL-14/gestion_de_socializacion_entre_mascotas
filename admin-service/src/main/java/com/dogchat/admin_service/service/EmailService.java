package com.dogchat.admin_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;



@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void enviarStrike(
            String destino,
            String nombre,
            int strikes,
            String motivo,
            String comentario
    ) {

        SimpleMailMessage mensaje = new SimpleMailMessage();

        mensaje.setTo(destino);

        mensaje.setSubject("Advertencia en DogChat");

        mensaje.setText(
            "Hola " + nombre + ",\n\n" +

            "Tu cuenta recibió un strike.\n\n" +

            "Motivo del reporte: " + motivo + "\n" +

            "Comentario del reporte: " +
            (comentario != null ? comentario : "Sin comentario") + "\n\n" +

            "Cantidad actual de strikes: " + strikes + "\n\n" +

            "Por favor respeta las normas de la comunidad."
        );

        mailSender.send(mensaje);
    }

    public void enviarBaneo(
            String destino,
            String nombre,
            String motivo,
            String comentario
    ) {

        SimpleMailMessage mensaje = new SimpleMailMessage();

        mensaje.setTo(destino);

        mensaje.setSubject("Cuenta suspendida en DogChat");

        mensaje.setText(
            "Hola " + nombre + ",\n\n" +

            "Tu cuenta fue suspendida por incumplir las normas de la comunidad.\n\n" +

            "Motivo del reporte: " + motivo + "\n" +

            "Comentario del reporte: " +
            (comentario != null ? comentario : "Sin comentario")
        );

        mailSender.send(mensaje);
    }
}