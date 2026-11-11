<?php
header('Content-Type: text/plain; charset=utf-8');

$vars = [
    'HTTP_HOST',
    'SERVER_NAME',
    'SERVER_ADDR',
    'SERVER_PORT',
    'HTTPS',
    'REQUEST_SCHEME',
    'REQUEST_URI',
    'DOCUMENT_ROOT',
    'SCRIPT_FILENAME',
];

foreach ($vars as $var) {
    echo $var . ' = ';
    var_export($_SERVER[$var] ?? null);
    echo PHP_EOL;
}
