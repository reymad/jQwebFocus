/********************************/
/*	jQuery-webFOCUS.1.0.js			*/
/*	jQuery plugin for webFOCUS  */
/*	by Jesus Rey - 12/12/2012		*/
/*	      - Madrid -						*/
/********************************/

/* FOR HTMLTABLE FORMAT HOLDS */

/*
		!! info: make sure to include the jquery lib b4 this plugin.
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
*/

/*** SECTION 1 - SECCION 1
	info:
		- REGULAR EXPRESION USE.

	info:
		- USO DE EXPRESIONES REGULARES.
*/

/*
	- Allows only the chars that we pass as a regular expression ( only what is inside de [ ] )
	  Example: We only want numbers, letters and spaces: $.wfOnlyTheseChars(event, "a-zA-Z0-9 ")
	  When its used: For keyup, keypress events. cancels the event

	- Solo permite los caracteres que se le pasa como expresion regular (lo de dentro de los [])
	  Ejemplo: Solo queremos que se introduzcan en un input, numeros, letras y espacios: $.wfOnlyTheseChars(event, "a-zA-Z0-9 ")
	  Cuando la usamos: Para eventos keyup, keypress. cancela el evento
*/

$.wfOnlyTheseChars = function(event, expReg){
		
	try{
		
			var kCode     = event.keyCode || event.charCode; //cross browser check
			var actualkey = String.fromCharCode(kCode);
			/*por si meten un " , fallo por cadena sin terminar*/
			switch(actualkey){
					
					case '"':
						if ( eval("!/^(["+expReg+"])$/.test('"+actualkey+"')" ) ) { event.preventDefault() }
					break;
					default:
						if( eval('!/^(['+expReg+'])$/.test("'+actualkey+'")' ) ) { event.preventDefault() }
					break;
			
			}
			
	}catch(err){
		/*...*/alert(err)
	}
	
};

/*
	- It doesn´t allow the chars that we pass as a regular expression ( only what is inside de [ ] )
	  Example: We dont want numbers, letters and spaces: $.wfNotTheseChars(event, "a-zA-Z0-9 ")
	  When its used: For keyup, keypress events. cancels the event

	- No permite los caracteres que se le pasa como expresion regular (lo de dentro de los [])
	  Ejemplo: No queremos que se introduzcan en un input, numeros, letras y espacios: $.wfNotTheseChars(event, "a-zA-Z0-9 ")
	  Cuando la usamos: Para eventos keyup, keypress. cancela el evento
*/
$.wfNotTheseChars = function(event, expReg){
		
		try{
		
			var kCode     = event.keyCode || event.charCode; //cross browser check
		  var actualkey = String.fromCharCode(kCode);
	
  	  if( eval('/^(['+expReg+'])$/.test("'+actualkey+'")' ) ) { event.preventDefault() }
  	  
	  }catch(err){
	  	/*...*/
	  }
		
};

/*
  - Creates a regular expression and returns true or false
    When its used: Wherever we want to check an expression

  - Genera una expresion regular que pasamos y devuelve true si se cumple o false si no
    Cuando la usamos: Cuando queremos comprobar una expresion
*/
$.wfIsExpOnKey = function(event, expReg ){

	try{
		var kCode     = event.keyCode || event.charCode; //cross browser check
		var actualkey = String.fromCharCode(kCode);

		if( eval('/^(['+expReg+'])$/.test("'+actualkey+'")' ) ){ return true }else{ return false; }

	}catch(err){
	  	/*...*/
	}

};

$.wfIsExpOnString = function(validate, expReg ){

	try{

		if( eval('/(['+expReg+'])$/.test("'+validate+'")' ) ){ return true }else{ return false; }

	}catch(err){
		/*...*/
	}

};

/*
	- Pone un caracter a cada lado de un caracter especificado en una cadena, solo si al lado NO tiene
	  un caracter especificado por ejemplo un espacio.
    si queremos espacion a ambos lados, el primero y ultimo desaparecera con $.trim()
 */
$.wfSideChar = function( cadena, qchar, charAtSides, charWhen ){

	/*para conservar las comas si hubieran*/
	cadena = cadena.replace(/\,/g,'~');

	cadena = cadena.split('');/*toArray*/

	for(var i=0; i < cadena.length; i++){


			if( cadena[i]==qchar ){

					/*hemos encontrado un QCHAR hay que ver si no hay espacios a ambos lados y si es asi crearlos*/
					if( cadena[i+1]!=charWhen){
							cadena.splice(i+1, 0, charAtSides);
					}
					if( cadena[i-1]!=charWhen){
							cadena.splice(i, 0, charAtSides);
							i++;// para que no ponga dos espacios.
					}

			}

	}
	cad = new String(cadena.toString());
	cad = cad.replace(/\,/g,'');
	/*para conservar las comas si hubieran*/
	cad = cad.replace(/\~/g,',');
	cad = $.trim(cad);

	return cad;

};

/* Elimina el/los caracteres especificados de una cadena*/
$.wfRemoveChar = function( cadena, qchar ){

	var mistring = cadena;

  eval( 'var cad = mistring.replace(/\"'+qchar+'"/g, "")' );

	return cad;

};
/* Transforma en acii los caracteres extraños para pasar a focus */
$.wfChars = function(cadena) {

	 cadena = cadena.replace(/\%/g, '%25');
	 cadena = cadena.replace(/\+/g, '%2B');
	 cadena = cadena.replace(/&/g , '%26');
	 cadena = cadena.replace(/#/g , '%23');
	 cadena = cadena.replace(/Ñ/g , '%D1');
	 cadena = cadena.replace(/ñ/g , '%F1');
	 cadena = cadena.replace(/€/g , '%80');
	 return cadena;

}

/* FUNCIONES PARA GENERAR MAINTAIN Y O COMANDOS DE FOCUS */
/* Generar Maintains, simples, sin campos computados*/
/* Llamada a funcion normal, sin selector: wfMaintainInclude( table, arrayFields, arrayValues) */
$.wfMaintainInclude = function( table, arrayFields, arrayValues){

		 var dir       = dir       || "D:\\";
  	 var nameFile  = nameFile  || "Maintain";
  	 var format    = format    || "fex";

				   var fso, tf;
			     var file = dir+nameFile+"."+format;
			     fso = new ActiveXObject("Scripting.FileSystemObject");
			     tf  = fso.CreateTextFile(file, true);

			     // empezamos a escribir el fex
			     var d = new Date();
			     tf.WriteLine("-* jQuery-webFOCUS generated MAINTAIN - "+d);
			     tf.WriteLine("-SET &ECHO=ALL");
				   tf.WriteLine("-*");
				   // empezamos con el maintain
				   // CABECERA DEL MAINTAIN
				   tf.WriteLine("MAINTAIN FILE "+table);
				   tf.WriteLine("REPOSITION "+table+"."+arrayFields[0]+" INTO PILA");
				   tf.WriteLine("STACK CLEAR PILA");

				   for(var i=0; i<arrayFields.length; i++){

				   	 if(typeof arrayValues[i] == "number"){
				   	  var compute = "COMPUTE PILA."+arrayFields[i]+" = "+arrayValues[i];
				   	  tf.WriteLine(compute);
				   	 }else{
				   	 	var compute = "COMPUTE PILA."+arrayFields[i]+" = '"+arrayValues[i]+"'";
				   	  tf.WriteLine(compute);
				   	 }

				   }

				   tf.WriteLine("INCLUDE "+arrayFields[0]+" FROM PILA");
				   tf.WriteLine("IF FOCERROR NE 0 GOTO FELERROR;");
				   tf.WriteLine("");
				   tf.WriteLine("CASE FELERROR");
				   tf.WriteLine("  ROLLBACK;");
				   tf.WriteLine("ENDCASE");
				   tf.WriteLine("END");
				   tf.WriteLine("");
				   tf.WriteLine("-RUN");
				   tf.WriteLine("?STAT");

		 tf.Close();

		 alert("Fex file created in "+dir);
}


/*** SECTION 2 - SECCION 2
	info:
		- SELECTORS FUNCTIONS - ESTILOS DE INFORME.

	info:
		- FUNCIONES DE SELECTORES - REPORT STYLE.
*/


// borde del informe
$.fn.wfReportBorder = function(num){

  	  this.each(function(){

        $(this).find("table").attr({"border" : num });

      });

}

// report borderColor
$.fn.wfReportBorderColor = function( border ){

  	  this.each(function(){

        $(this).find("table").css({"border" : border });

      });

}
// padding de celdas
$.fn.wfReportPadding = function( num ){

  	  this.each(function(){

        $(this).find("table").attr({ "padding" : num });

      });

}

// espacio de celdas del informe
$.fn.wfReportCellSpacing = function( num ){

  	  this.each(function(){

        $(this).find("table").attr({ "cellspacing" : num });

      });

}

// alinear textos de las cabeceras, center, right, left
$.fn.wfHeaderAlign = function( align ){

  	  this.each(function(){

        $(this).find("table > tbody > tr:eq(0)").css({"text-align" : align });

      });

}

// elegir una columna y alinear su contenido 
$.fn.wfColumnAlign = function( col, align ){
			
			col = parseInt(col) - 1;
			col = col.toString();
			
  	  this.each(function(){

        $(this).find("table > tbody > tr:gt(0)").each(function(){
        
        		$(this).find("td:eq("+col+")").css({"text-align" : align });
        
        });

      });

}



// cebreado para informe con cabecera de columna
$.fn.wfZebraStripes = function( odd, even ){
			
  	  this.each(function(){

        // TR pares
        $(this).find("table > tbody > tr:gt(0):odd").css({"background" : odd });

        // TR impares
        $(this).find("table > tbody > tr:gt(0):even").css({"background" : even });

     });

}

// cebreado para informe sin cabecera de columna
$.fn.wfZebraStripesHeaders = function( odd, even ){
			
			var odd  = odd  || "white";
			var even = even || "lightgrey";
			
  	  this.each(function(){

        // TR pares
        $(this).find("table > tbody > tr:odd").css({"background" : odd });

        // TR impares
        $(this).find("table > tbody > tr:even").css({"background" : even });

     });

}

/* cebrea tds con clases predefinidas */
$.fn.wfTdZebraClass = function(classOdd,classEven){
	
		this.each(function(){

        // TR pares
        $(this).find("table > tbody > tr:gt(0):odd > td").addClass(classOdd);

        // TR impares
        $(this).find("table > tbody > tr:gt(0):even > td").addClass(classEven);

     });

}
/* cebrea tds con clases predefinidas */
$.fn.wfTrZebraClass = function(classOdd,classEven){
	
		this.each(function(){

        // TR pares
        $(this).find("table > tbody > tr:gt(0):odd").addClass(classOdd);

        // TR impares
        $(this).find("table > tbody > tr:gt(0):even").addClass(classEven);

     });

}

/* cebrea tds con clases predefinidas */
$.fn.wfRemoveZebraClass = function(){
	
		this.each(function(){

        // de los tr
        $(this).find("table > tbody > tr").removeClass( $(this).find("table > tbody > tr").attr('class') );

        // de los td
        $(this).find("table > tbody > tr > td").removeClass( $(this).find("table > tbody > tr > td").attr('class') );

     });

}

/*Poner colores a las cabeceras de las columnas. colorDeFondo, colorDeLetra*/
$.fn.wfHeaderColors = function( backgr, color ){


  	  this.each(function(){

        // TR pares
        $(this).find("table >tbody > tr:eq(0)").css({"background" : backgr });

        // TR impares
        $(this).find("table > tbody > tr:eq(0)").css({"color" : color });

     });

}

/*Poner clase a las cabeceras de columnas */
$.fn.wfAddHeaderClass = function(clase){

  	  this.each(function(){

        $(this).find("table >tbody > tr:eq(0)").addClass(clase);

     });

}
/*quitar clase a las cabeceras de columnas */
$.fn.wfRemoveHeaderClass = function(){

  	  this.each(function(){

        $(this).find("table >tbody > tr:eq(0)").removeClass();

     });

}

/*letras header bolder*/
$.fn.wfHeaderBolder = function(){

  	  this.each(function(){
        $(this).find("table > tbody > tr:eq(0)").css({"font-weight" : "bolder" });
      });

}

/*hacer cabeceras fija: filezillas, chromes..., se le pasa on u off*/
$.fn.wfHeaderFixed = function(set){

  	  this.each(function(){
  	  	
        $(this).find("table > tbody > tr:eq(0) > td").css({"position" : set });
      
      });

}

/* GET ROWS */
$.fn.wfGetRow = function(row){

     var $myRow = $(this).find("table > tbody > tr:eq("+row+") > td");

     var RowArray = [];

     $myRow.each(function(index){

     		RowArray[RowArray.length] = $.trim( $(this).text() );

     });

     return RowArray;

}

/* GET CELL FROM A SPECIFIED ROWN AND COLUMN, array. from row[0] and column[0]*/
$.fn.wfGetCell = function(row, column){

     var myCell = $.trim( $(this).find("table > tbody > tr:eq("+row+") > td:eq("+(column-1)+")").text() );

     return myCell;

}

/****
//
//         GENERAR FICHEROS DE TEXTO
//   Genera archivo, por ejemplo a partir de un informe
//   LLamada: $("#divReport").wfGenerateFile(directorio, nombreArchivo, formato(csv, txt,...))
//   nota: Si no se pasan variables crea csv por defecto en D:\\ (Client - Side)
*****/
$.fn.wfGenerateFile = function(dir, nameFile, format, separator, fromRow){

  	 var dir       = dir       || "D:\\";
  	 var nameFile  = nameFile  || "NewFile";
  	 var format    = format    || "csv";
  	 var separator = separator || ";";
  	 var fromRow   = fromRow   || "0";

  	 var fso, tf;
	   var file = dir+nameFile+"."+format;
	   fso = new ActiveXObject("Scripting.FileSystemObject");
	   tf  = fso.CreateTextFile(file, true);

     $(this).find("table > tbody > tr:gt("+fromRow+")").each(function(index){

     		$(this).find("td").each(function(){

     				var campo = $.trim( $(this).text() );

     				tf.Write(campo);
	          tf.Write(separator);

     		});

     		tf.WriteLine("");

     });

     tf.Close();

     alert(format+" '"+nameFile+"' created in "+dir);

}

/* SECCION - PLANTILLAS DE WEBFOCUS

   GENERAR PLANTILLAS CON LOS COMANDOS MAS UTILIZADOS DE FOCUS

	 Util si no tenemos supersesion a mano. Genera un fichero en D:\\ (Por defecto)
	 o donde le pasemos como parametro con los comandos mas utilizados
	 en focus: MAINTAINS, MODIFIES, EDAGET MASTER ETC.
*/

$.wfGenerateTemplate = function(dir){

	   var dir       = dir       || "D:\\";
  	 var nameFile  = "webFOCUS-Template";
  	 var format    = "txt";

		 var fso, tf;
	   var file = dir+nameFile+"."+format;
	   fso = new ActiveXObject("Scripting.FileSystemObject");
	   tf  = fso.CreateTextFile(file, true);
	   var d = new Date();

	   tf.WriteLine("-* jQuery-webFOCUS generated TEMPLATE - "+d);
	   tf.WriteLine("");
		 // define file
		 tf.WriteLine("-* define file");
		 tf.WriteLine("DEFINE FILE nombreTabla");
		 tf.WriteLine("END");
		 tf.WriteLine("");
		 // table file
		 tf.WriteLine("-* table file ");
		 tf.WriteLine("TABLE FILE nombreTabla");
		 tf.WriteLine("PRINT *");
		 tf.WriteLine("IF RECORDLIMIT EQ 10");
		 tf.WriteLine("END");
		 tf.WriteLine("-RUN");
		 tf.WriteLine("-TYPE &LINES");
		 tf.WriteLine("");
		 // modify alta
		 tf.WriteLine("-* modify file alta");
		 tf.WriteLine("MODIFY FILE nombreTabla");
		 tf.WriteLine("COMPUTE FH/HYYMDm=HGETC(10,FH);");
		 tf.WriteLine("FREEFORM campoClave nombreCampo1 nombreCampo2");
		 tf.WriteLine("MATCH campoClave");
		 tf.WriteLine(" ON MATCH REJECT");
		 tf.WriteLine(" ON NOMATCH INCLUDE");
		 tf.WriteLine("DATA");
		 tf.WriteLine("campoClave   = valor,");
		 tf.WriteLine("nombreCampo1 = valor,");
		 tf.WriteLine("nombreCampo2 = valor,");
		 tf.WriteLine("??US_MOD = &&USER,");
		 tf.WriteLine("??FH_MOD = FH, $");
		 tf.WriteLine("END   ");
		 tf.WriteLine("-RUN  ");
		 tf.WriteLine("? STAT");
		 tf.WriteLine("");
		 // modify  baja
		 tf.WriteLine("-* modify file baja");
		 tf.WriteLine("MODIFY FILE nombreTabla");
		 tf.WriteLine("FREEFORM campoClave1 campoClave2");
		 tf.WriteLine("MATCH campoClave1 campoClave2");
		 tf.WriteLine(" ON MATCH DELETE");
		 tf.WriteLine(" ON NOMATCH REJECT");
		 tf.WriteLine("DATA");
		 tf.WriteLine("   campoClave1  = valor,");
		 tf.WriteLine("   campoClave2  = valor, $");
		 tf.WriteLine("END");
		 tf.WriteLine("");
		 tf.WriteLine("MODIFY FILE nombreTabla");
		 tf.WriteLine("COMPUTE FH/HYYMDm=HGETC(10,FH);");
		 tf.WriteLine("FREEFORM campoClave nombreCampo1 nombreCampo2");
		 tf.WriteLine("MATCH campoClave");
		 tf.WriteLine(" ON MATCH UPDATE nombreCampo1 nombreCampo2");
		 tf.WriteLine(" ON NOMATCH REJECT");
		 tf.WriteLine("DATA");
		 tf.WriteLine("   campoClave   = valor,");
		 tf.WriteLine("   nombreCampo1 = valor,");
		 tf.WriteLine("   nombreCampo2 = valor,");
		 tf.WriteLine("   ??US_MOD = &&USER,");
		 tf.WriteLine("   ??FH_MOD = FH, $");
		 tf.WriteLine("END");
		 tf.WriteLine("-RUN");
		 tf.WriteLine("? STAT");
		 tf.WriteLine("");
		 // maintain alta
		 tf.WriteLine("-* maintain alta");
		 tf.WriteLine("MAINTAIN FILE nombreTabla");
		 tf.WriteLine("COMPUTE FH/HYYMDm=HGETC(10,FH);");
		 tf.WriteLine("INFER nombreTabla.campoClave INTO PILA");
		 tf.WriteLine("STACK CLEAR PILA");
		 tf.WriteLine(" COMPUTE PILA.campoClave = valor;");
		 tf.WriteLine(" COMPUTE PILA.nombreCampo1 = valor;");
		 tf.WriteLine(" COMPUTE PILA.nombreCampo2 = valor;");
		 tf.WriteLine(" COMPUTE PILA.??US_MOD = &&USER;");
		 tf.WriteLine(" COMPUTE PILA.??FH_MOD = FH;");
		 tf.WriteLine("INCLUDE campoClave FROM PILA");
		 tf.WriteLine("");
		 tf.WriteLine("IF FOCERROR NE 0 GOTO FELERROR;");
		 tf.WriteLine("");
		 tf.WriteLine("CASE FELERROR");
		 tf.WriteLine(" ROLLBACK;");
		 tf.WriteLine("ENDCASE");
		 tf.WriteLine("");
		 tf.WriteLine("END");
		 tf.WriteLine("-RUN");
		 tf.WriteLine("? STAT");
		 tf.WriteLine("");
		 // maintain baja
		 tf.WriteLine("-* maintain baja");
		 tf.WriteLine("MAINTAIN FILE nombreTabla");
		 tf.WriteLine("REPOSITION nombreTabla.campoClave");
		 tf.WriteLine("STACK CLEAR PILA");
		 tf.WriteLine("FOR 1 NEXT nombreTabla.campoClave INTO PILA");
		 tf.WriteLine(" WHERE campoClave EQ valor");
		 tf.WriteLine("DELETE campoClave  FROM PILA");
		 tf.WriteLine("");
		 tf.WriteLine("IF FOCERROR NE 0 GOTO FELERROR;");
		 tf.WriteLine("");
		 tf.WriteLine("CASE FELERROR");
		 tf.WriteLine(" ROLLBACK;");
		 tf.WriteLine("ENDCASE");
		 tf.WriteLine("");
		 tf.WriteLine("END");
		 tf.WriteLine("-RUN");
		 tf.WriteLine("? STAT");
		 tf.WriteLine("");
		 // maintain modificacion
		 tf.WriteLine("-* maintain modificación");
		 tf.WriteLine("MAINTAIN FILE nombreTabla");
		 tf.WriteLine("COMPUTE FH/HYYMDm=HGETC(10,FH);");
		 tf.WriteLine("REPOSITION nombreTabla.campoClave");
		 tf.WriteLine("STACK CLEAR PILA");
		 tf.WriteLine("FOR 1 NEXT nombreTabla.campoClave INTO PILA");
		 tf.WriteLine(" WHERE campoClave EQ valor");
		 tf.WriteLine(" COMPUTE PILA.nombreCampo1 = valor;");
		 tf.WriteLine(" COMPUTE PILA.nombreCampo2 = valor;");
		 tf.WriteLine(" COMPUTE PILA.??US_MOD = &&USER;");
		 tf.WriteLine(" COMPUTE PILA.??FH_MOD = FH;");
		 tf.WriteLine("UPDATE nombreCampo1 nombreCampo2 FROM PILA");
		 tf.WriteLine("");
		 tf.WriteLine("IF FOCERROR NE 0 GOTO FELERROR;");
		 tf.WriteLine("");
		 tf.WriteLine("CASE FELERROR");
		 tf.WriteLine(" ROLLBACK;");
		 tf.WriteLine("ENDCASE");
		 tf.WriteLine("");
		 tf.WriteLine("END");
		 tf.WriteLine("-RUN");
		 tf.WriteLine("? STAT");
		 tf.WriteLine("");
		 // ex edaget master
		 tf.WriteLine("-* ex edaget master");
		 tf.WriteLine("EX EDAGET MASTER, nombreTabla, $");
		 tf.WriteLine("");
		 // ex edaget focexec
		 tf.WriteLine("-* ex edaget focexec");
		 tf.WriteLine("EX EDAGET FOCEXEC, nombreProcedimiento, $");
		 tf.WriteLine("");
		 // dynam alloc
		 tf.WriteLine("-* dynam alloc file");
		 tf.WriteLine("DYNAM ALLOC FILE archivo DA ruta.archivo SHR REU");
		 tf.WriteLine("");

		 tf.Close();

		 alert("Template generated in "+dir);
}

/* FIN GENERAR PLANTILLA */


/* GENERAR MASTERS */

// Genera un fichero .mas. 
// Le pasamos como parametros: numero de campos, numero de claves.
$.wfGenerateMaster = function( nFields , nKeys, tName){

		 var dir       = dir       || "D:\\";
  	 var nameFile  = tName     || "wfMaster";
  	 var format    = "mas";
     var nFields   = nFields   || 5;
     var nKeys     = nKeys     || 1;
     var tName     = tName     || "TABLENAME"
     
     
		 var fso, tf;
	   var file = dir+nameFile+"."+format;
	   fso = new ActiveXObject("Scripting.FileSystemObject");
	   tf  = fso.CreateTextFile(file, true);
	   var d = new Date();
		 // cabecera
		 tf.WriteLine("-* jQuery-webFOCUS generated MASTER - "+d);
	   tf.WriteLine("");
	   // comienzo master
	   tf.WriteLine("FILE="+tName+", SUFFIX=SQLORA , $");
	   tf.WriteLine("SEGNAME="+tName+" , SEGTYPE=S0 , $");
	   // claves:
	   for (var i=0; i<nKeys; i++){
	   			
	   			tf.WriteLine("FIELD=FIELD"+(i+1)+"  , FIELD"+(i+1)+" , FORMAT , FORMAT , INDEX=I , MISSING=OFF , $");
	   
	   }
	   // campos no clave
	   for (var i=nKeys; i<nFields; i++){
	   
	   			tf.WriteLine("FIELD=FIELD"+(i+1)+"  , FIELD"+(i+1)+" , FORMAT , FORMAT , MISSING=OFF , $");
	   
	   }
		 
		 alert("Master generada en "+dir);
}
