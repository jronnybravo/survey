<?php
if(isset($_SERVER['HTTP_REFERER'])) {
    $refererUrlParts = parse_url($_SERVER['HTTP_REFERER']);
    $refererDomain = $refererUrlParts['host'];

    if(strtolower($_SERVER['HTTP_HOST']) == strtolower($refererDomain)) {
        $fileUri = $_SERVER["REQUEST_URI"];

        $fullUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") 
            . "://$_SERVER[HTTP_HOST]$fileUri";
        $fullUrlParts = parse_url($fullUrl);
        $urlPathSegments = explode('.', $fullUrlParts['path']);
        $extension = $urlPathSegments[count($urlPathSegments) - 1];

        $contents = '';
        try {
            $fullPath = __DIR__ . $fileUri;
            $mimeType = mime_content_type($fullPath);
            if(in_array($mimeType, ['text/plain', 'text/html'])) {
                if(strtolower($extension) == 'js') {
                    header('Content-Type: application/javascript');
                } else if(strtolower($extension) == 'css') {
                    header('Content-type: text/css');
                }
            } else if($extension == 'png') {
                header('Content-Type: image/png');
            } else if($extension == 'jpg') {
                header('Content-Type: image/jpg');
            }
            readfile($fullPath);
            die;
        } catch(Exception $e) { }
    }
}

echo 'Access Denied';
die;
?>