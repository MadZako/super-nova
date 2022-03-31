<?php

if(isset($_POST['submit'])) {
    $name = $_POST['name'];
    $subject = $_POST['subject'];
    $mailFrom = $_POST['mail'];
    $message = $_POST['message'];

    $mailTo = "anastasia.ubaka@thebeansgroup.com";
    $headers = "From: ".$mailFrom;
    $messages = "You have received an email from" .$name.".\n\n".$message;
    mail($mailTo, $subject, $messages, $headers);
    header("Location: contact.php?mailsend");
}