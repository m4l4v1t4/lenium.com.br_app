<?php

if (!empty($_SERVER['HTTP_HOST'])) {
    $_SERVER['SERVER_NAME'] = preg_replace(
        '/:\d+$/',
        '',
        $_SERVER['HTTP_HOST']
    );
}

/*
 * Simula HTTPS apenas no ambiente local.
 */
$_SERVER['HTTPS'] = 'on';
$_SERVER['REQUEST_SCHEME'] = 'https';
$_SERVER['SERVER_PORT'] = '443';

return false;
