<?php
namespace GDText;

use GDText\Struct\Point;
use GDText\Struct\Rectangle;

class Box{
    protected $im;
    protected $strokeSize = 0;
    protected $strokeColor;
    protected $fontSize = 12;
    protected $fontColor;
    protected $alignX = 'left';
    protected $alignY = 'top';
    protected $textWrapping = TextWrapping::WrapWithOverflow;
    protected $lineHeight = 1.25;
    protected $baseline = 0.2;
    protected $fontFace = null;
    protected $debug = false;
    protected $textShadow = false;
    protected $backgroundColor = false;
    protected $box;
    
    public function __construct(&$image){
        $this->im = $image;
        $this->fontColor = new Color(0, 0, 0);
        $this->strokeColor = new Color(0, 0, 0);
        $this->box = new Rectangle(0, 0, 100, 100);
    }
    
    public function setFontColor(Color $color){
        $this->fontColor = $color;
    }
    
    public function setFontFace($path){
        $this->fontFace = $path;
    }
    
    public function chapeu($path){
        $this->chapeu = $path;
    }
    
    public function backPost($path){
        $this->backPost = $path;
    }
    
    public function estiloTitulo($path){
        $this->estiloTitulo = $path;
    }
    
    public function estiloChapeu($path){
        $this->estiloChapeu = $path;
    }
    
    public function fonteChapeu($path){
        $this->fonteChapeu = $path;
    }
    
    public function corChapeu(Color $color){
        $this->corChapeu = $color;
    }
    
    public function tamanhoChapeu($path){
        $this->tamanhoChapeu = $path;
    }
    
    public function setFontSize($v){
        $this->fontSize = $v;
    }
    
    public function setStrokeColor(Color $color){
        $this->strokeColor = $color;
    }
    
    public function setStrokeSize($v){
        $this->strokeSize = $v;
    }
    
    public function setTextShadow(Color $color, $xShift, $yShift){
        $this->textShadow = array(
            'color' => $color,
            'offset' => new Point($xShift, $yShift)
        );
    }
    
    public function setBackgroundColor(Color $color){
        $this->backgroundColor = $color;
    }
    
    public function setLineHeight($v){
        $this->lineHeight = $v;
    }
    
    public function setBaseline($v){
        $this->baseline = $v;
    }
    
    public function setTextAlign($x = 'left', $y = 'top'){
        
        $xAllowed = array('left', 'right', 'center');
        $yAllowed = array('top', 'bottom', 'center');

        if (!in_array($x, $xAllowed)) {
            throw new \InvalidArgumentException('Invalid horizontal alignement value was specified.');
        }

        if (!in_array($y, $yAllowed)) {
            throw new \InvalidArgumentException('Invalid vertical alignement value was specified.');
        }

        $this->alignX = $x;
        $this->alignY = $y;
    }
    
    public function setBox($x, $y, $width, $height){
        $this->box = new Rectangle($x, $y, $width, $height);
    }
    
    public function enableDebug(){
        $this->debug = true;
    }
    
    public function setTextWrapping($textWrapping){
        $this->textWrapping = $textWrapping;
    }
    
    public function draw($text){
        
        if (!isset($this->fontFace)) {
            throw new \InvalidArgumentException('No path to font file has been specified.');
        }

        switch ($this->textWrapping) {
            case TextWrapping::NoWrap:
                $lines = array($text);
                break;
            case TextWrapping::WrapWithOverflow:
            default:
                $lines = $this->wrapTextWithOverflow($text);
                break;
        }

        if ($this->debug) {
            $this->drawFilledRectangle(
                $this->box,
                new Color(rand(180, 255), rand(180, 255), rand(180, 255), 80)
            );
        }

        $lineHeightPx = $this->lineHeight * $this->fontSize;
        $textHeight = count($lines) * $lineHeightPx;

        switch ($this->alignY) {
            case VerticalAlignment::Center:
                $yAlign = ($this->box->getHeight() / 2) - ($textHeight / 2);
                break;
            case VerticalAlignment::Bottom:
                $yAlign = $this->box->getHeight() - $textHeight;
                break;
            case VerticalAlignment::Top:
            default:
                $yAlign = 0;
        }

        $n = 0;
        foreach ($lines as $line) {
            
            if($this->chapeu == 'S' && $n == 0){
                
                $box = $this->calculateBox($line, $this->tamanhoChapeu, $this->fonteChapeu);
                
            } else {
                
                $box = $this->calculateBox($line, $this->getFontSizeInPoints(), $this->fontFace);
                
            }
            switch ($this->alignX) {
                case HorizontalAlignment::Center:
                    $xAlign = ($this->box->getWidth() - $box->getWidth()) / 2;
                    break;
                case HorizontalAlignment::Right:
                    $xAlign = ($this->box->getWidth() - $box->getWidth());
                    break;
                case HorizontalAlignment::Left:
                default:
                    $xAlign = 0;
            }
            $yShift = $lineHeightPx * (1 - $this->baseline);
            
            $xMOD = $this->box->getX() + $xAlign;
            $yMOD = $this->box->getY() + $yAlign + $yShift + ($n * $lineHeightPx);
            
            if($this->chapeu == 'S' &&  $n == 0){
                
                if($this->estiloChapeu == 1){
                    
                    if($this->alignX == 'right'){
                        
                        $xMOD = $this->box->getX() + $xAlign - 40;
                        
                    } elseif($this->alignX == 'left'){
                        
                        $xMOD = $this->box->getX() + $xAlign + 40;
                        
                    } else {
                        
                        $xMOD = $this->box->getX() + $xAlign;
                        
                    }
                    
                    $yMOD = $this->box->getY() + $yAlign + $yShift + ($n * $lineHeightPx) - 20;
                    
                }
                
                if($this->estiloChapeu == 2){
                    
                    $xMOD = 40;
                    
                    $yMOD = $this->box->getY() + $yAlign + $yShift + ($n * $lineHeightPx) - 20;
                    
                }
                
                if($this->estiloChapeu == 3){
                    
                    if($this->alignX == 'left'){
                        
                        $xMOD = 0;
                        
                    } elseif($this->alignX == 'center'){
                        
                        $xMOD = $this->box->getX() + $xAlign - 40;
                        
                    } elseif($this->alignX == 'right'){
                        
                        $xMOD = $this->box->getX() + $xAlign - 60;
                        
                    }
                    
                    $yMOD = $this->box->getY() + $yAlign + $yShift + ($n * $lineHeightPx) - 5;
                    
                }
                
            }
            
            if ($this->debug) {
                
                $this->drawFilledRectangle(
                    new Rectangle(
                        $xMOD,
                        $this->box->getY() + $yAlign + ($n * $lineHeightPx),
                        $box->getWidth(),
                        $lineHeightPx,
                        $this->fontFace
                    ),
                    new Color(rand(1, 180), rand(1, 180), rand(1, 180))
                );
            }
            
            $this->strokeText($xMOD, $yMOD, $line);
            
            if($this->chapeu == 'S' && $n == 0){
                
                if($this->estiloChapeu == 1){
                    
                    $this->drawFilledRectangle(
                        new Rectangle(
                            $xMOD - 20,
                            $yMOD - $box->getHeight() - 10,
                            $box->getWidth() + 40,
                            $box->getHeight() + 20,
                            $this->tamanhoChapeu
                        ),
                        $this->corChapeu
                    );
                    
                    $this->drawInternal(
                        new Point(
                            $xMOD,
                            $yMOD
                        ),
                        new Color(255,255,255),
                        $line,
                        $this->tamanhoChapeu,
                        $this->fonteChapeu
                    );
                    
                }
                
                if($this->estiloChapeu == 2){
                    
                    $this->drawInternal(
                        new Point(
                            $xMOD,
                            $yMOD
                        ),
                        new Color(0,0,0),
                        $line,
                        $this->tamanhoChapeu,
                        $this->fonteChapeu
                    );
                    
                }
                
                if($this->estiloChapeu == 3){
                    
                    if($this->backPost == 'escuro'){
                        
                        $backChapeu = new Color(0,0,0);
                        $corChapeu = new Color(255,255,255);
                        
                    } else {
                        
                        $backChapeu = new Color(245,245,239);
                        $corChapeu = new Color(0,0,0);
                        
                    }
                    
                    $this->drawFilledRectangle(
                        new Rectangle(
                            $xMOD,
                            $yMOD - $box->getHeight() - 10,
                            $box->getWidth() + 80,
                            $box->getHeight() + 20,
                            $this->tamanhoChapeu
                        ),
                        $backChapeu
                    );
                    
                    $this->drawInternal(
                        new Point(
                            $xMOD + 40,
                            $yMOD
                        ),
                        $corChapeu,
                        $line,
                        $this->tamanhoChapeu,
                        $this->fonteChapeu
                    );
                    
                }
                
            } else {
                
                if($this->textShadow !== false){
                    
                    $this->drawInternal(
                        new Point(
                            $xMOD + $this->textShadow['offset']->getX(),
                            $yMOD + $this->textShadow['offset']->getY()
                        ),
                        $this->textShadow['color'],
                        $line,
                        null,
                        $this->fontFace
                    );
                    
                }
                
                if($this->estiloTitulo == 5){
                    
                    if($this->backPost == 'escuro'){
                        
                        $backTitulo = new Color(245,245,239);
                        
                    } else {
                        
                        $backTitulo = new Color(0,0,0);
                        
                    }
                    
                    $this->drawFilledRectangle(
                        new Rectangle(
                            $xMOD - 20,
                            $this->box->getY() + $yAlign + ($n * $lineHeightPx) - 5,
                            $box->getWidth() + 40,
                            $lineHeightPx + 10,
                            $this->fontFace
                        ),
                        $backTitulo
                    );
                    
                }
                
                $this->drawInternal(
                    new Point(
                        $xMOD,
                        $yMOD
                    ),
                    $this->fontColor,
                    $line,
                    null,
                    $this->fontFace
                );
                
            }

            $n++;
        }
    }
    
    protected function wrapTextWithOverflow($text){
        $lines = array();
        $explicitLines = preg_split('/\n|\r\n?/', $text);
        foreach ($explicitLines as $line) {
            $words = explode(" ", $line);
            $line = $words[0];
            for ($i = 1; $i < count($words); $i++) {
                $box = $this->calculateBox($line." ".$words[$i], $this->getFontSizeInPoints(), $this->fontFace);
                if ($box->getWidth() >= $this->box->getWidth()) {
                    $lines[] = $line;
                    $line = $words[$i];
                } else {
                    $line .= " ".$words[$i];
                }
            }
            $lines[] = $line;
        }
        return $lines;
    }
    
    protected function getFontSizeInPoints(){
        return 0.75 * $this->fontSize;
    }

    protected function drawFilledRectangle(Rectangle $rect, Color $color){
        imagefilledrectangle(
            $this->im,
            $rect->getLeft(),
            $rect->getTop(),
            $rect->getRight(),
            $rect->getBottom(),
            $color->getIndex($this->im)
        );
        
        if($this->estiloChapeu == 1){
            
            imagefilledellipse($this->im, $rect->getLeft()+3, $rect->getTop() + ($rect->getHeight()/2), $rect->getHeight(), $rect->getHeight(), $color->getIndex($this->im));
            imagefilledellipse($this->im, $rect->getRight()-3, $rect->getTop() + ($rect->getHeight()/2), $rect->getHeight(), $rect->getHeight(), $color->getIndex($this->im));
            
        }
        
    }
    
    protected function calculateBox($text, $size, $fontface){
        $bounds = imagettfbbox($size, 0, $fontface, $text);

        $xLeft  = $bounds[0];
        $xRight = $bounds[2];
        $yLower = $bounds[1];
        $yUpper = $bounds[5];

        return new Rectangle(
            $xLeft,
            $yUpper,
            $xRight - $xLeft,
            $yLower - $yUpper
        );
    }

    protected function strokeText($x, $y, $text){
        $size = $this->strokeSize;
        if ($size <= 0) return;
        for ($c1 = $x - $size; $c1 <= $x + $size; $c1++) {
            for ($c2 = $y - $size; $c2 <= $y + $size; $c2++) {
                $this->drawInternal(new Point($c1, $c2), $this->strokeColor, $text, null, $this->fontFace);
            }
        }
    }

    protected function drawInternal(Point $position, Color $color, $text, $size, $fontface){
        
        $size = !empty($size) ? $size : $this->getFontSizeInPoints();
        
        imagettftext(
            $this->im,
            $size,
            0, // no rotation
            $position->getX(),
            $position->getY(),
            $color->getIndex($this->im),
            $fontface,
            $text
        );
    }
}
