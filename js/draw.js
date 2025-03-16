/**
 ** @desc Отрисовка значений рейкастера
 **/
class Draw {
	wallColor  = new Color(); //Цвет стены
	floorColor = new Color(); //Цвет пола
	skyColor   = new Color( 168 , 217 , 255 ); //Цвет неба
	/**
	 ** @desc Рисует небо
	 **/
	DrawSky() {
		context.fillStyle = this.skyColor.ToString();
		context.fillRect( 0 , 0 , width , heightH );
	}
	/**
	 ** @desc Рисует пол
	 **/
	DrawFloor() {
		for( let y = 0; y < heightH; y++ ) {
			let dist    = y / heightH;
			let	color   = this.floorColor.Multiply( dist );
				color.a = 1;
			this.DrawLine( { x : 0 , z : heightH + y } , { x : width , z : heightH + y } , color.ToString() );
		}
	}
	/**
	 ** @desc Рисует линию
	 ** @vars (Vecto3F) start - начало линии, (Vecto3F) end - конец линии, (Color) color - цвет линии
	 **/
	DrawLine( start , end , color ) {
		context.strokeStyle = color;
		context.strokeWidth = 1;
		context.beginPath();
		context.moveTo( start.x + 0.5 , start.z ); //0.5 для сдвига, чтобы избежать смешивания
		context.lineTo( end.x + 0.5 , end.z );
		context.stroke();
		context.closePath();
	}
	/**
	 ** @desc Рисует стену
	 ** @vars (int) w - номер пикселя по ширине экрана, (float) distance - дистанция до стены, полученная от каста луча
	 **/
	DrawWall( w , distance ) {
		let wallHeight = Math.min( parseInt( camDepth / ( distance ) ) , height ) * 0.5;	
		let distBlack  = 1 - distance / viewDist;
		let	color      = this.wallColor.Multiply( distBlack );
			color.a    = 1;
		this.DrawLine( { x : w , z : heightH - wallHeight } , { x : w , z : heightH + wallHeight } , color.ToString() );
	}
}