/**
 ** @desc Сам рейкастер
 **/
class Raycaster {
	/**
	 ** @desc Основной метод, пускает луч по заданному углу и возвращает расстояние, если луч достиг цели или вылетел за пределы карты
	 ** @vars (float) rayAngle - угол луча в радианах
	 **/
	Cast( rayAngle ) {
		let vector             = this.CreateVectorFromAngle( viewDist , rayAngle ); //Создаёт вектор луча используя дистанцию отрисовки и угол 
		let rayCast            = cameraPosition.Copy();                             //Точка стартка луча
		let { split , length } = this.SplitRay( cameraPosition , cameraPosition.Plus( vector ) ); //Разбивает луч на итерации
		for( let d = 0; d < length; d++ ) {
			rayCast = rayCast.Plus( split );
			if( rayCast.x < 0 || rayCast.z < 0 || rayCast.x > level.size.x || rayCast.z > level.size.y || level.CheckCell( rayCast ) ) { //Луч вылетел за пределы уровня или попал в стену, возвращает дистанцию отрисовки
				return cameraPosition.Distance( rayCast );
			}
		}
		return 0;
	}
	/**
	 ** @desc Разбивает луч на итерации и возвращает шаг цикла и длину цикла
	 ** @vars (Vecto3F) vector3f1 - начало луча, (Vecto3F) vector3f1 - конец луча
	 **/
	SplitRay( vector3f1 , vector3f2 ) {
		let diffX  = vector3f2.x - vector3f1.x;
		let diffZ  = vector3f2.z - vector3f1.z;
		let length = Math.max( Math.abs( diffX ) , Math.abs( diffZ ) ); //Берёт максимальный шаг
		length    *= accuracy; //Увеличивает длину на заданную точность луча
		let split  = new Vector3F( diffX / length , 0 , diffZ / length );
		return { split , length };
	}
	/**
	 ** @desc Возвращает вектор по переданным длине и углу
	 ** @vars (float) dist - длина луча, (float) angle - угол луча
	 **/
	CreateVectorFromAngle( dist , angle ) {
		return new Vector3F( dist * Math.cos( angle ) , 0 , dist * Math.sin( angle ) );
	}
}