<?php
$text = urldecode($_GET['text']);
$lang = $_GET['lang'];
if (empty($lang)) $lang = 'es';
$id = $_GET['id'];
$serviceUrl = 'http://translate.google.com/translate_tts';
$url = "$serviceUrl?tl=$lang&q=$text";


$context = stream_context_create(array(
    'http' => array(
        'method' => 'POST',
        'header' => implode("\r\n", array(
            'Content-type: application/x-www-form-urlencoded',
            'Accept-Language: en-us,en;q=0.5', // optional
            'Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7' // optional
        )),
        'content' => http_build_query(array(
            'prev'  =>  '_t',
            'hl'    =>  'en',
            'ie'    =>  'UTF-8',
            'text'  =>  $text,
            'sl'    =>  'es',
            'tl'    =>  'es'
        ))
    )
));
$audio = file_get_contents($serviceUrl, FILE_TEXT, $context);

function writeFile($file, $data) {
    try {
        $fp = fopen($file, 'w');
        fwrite($fp, $data);
        fclose($fp);
    } catch (Exception $e) {
        throw new Exception("UNABLE TO WRITE FILE: $file");
    }
}

//$timestamp = date("Ymdgis");
$audioPath = 'audio';
$mp3 = "$audioPath/$id.mp3";
if (!file_exists($mp3)) {
    writeFile($mp3, $audio);
}

//output path to mp3 file
die($mp3);