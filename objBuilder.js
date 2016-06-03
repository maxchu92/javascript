/* ==================================================================
	Object Builder JavaScript [v1.00 BETA]
	Created by: Max Chu [2015/07/09]
	Last modified by: Max Chu [2015/07/09]
================================================================== */

//Build object by invoking function
//Desc: Automatically generate hierarchical objects by defined strings.
//Instruction: Seperate the levels of objects by dot (".") without spaces.
//Ex: ObjBuilder('MyLibrary.Controls.Textbox...');
/*Result: 
	//It will automatically generate hierarchical objects like below.
	
	MyLibrary = {
		Controls : {
			Textbox: {}
		}
	};

	//Then you can directly call "MyLibrary.Controls.Textbox", it will return Object {}
*/

function ObjBuilder(varObjPath) {
	try {
		var arrObj = varObjPath.split('.'); //Split strings into array.
		var objLast = window; //Set the first object as window.
		var rgxNonAlphaNum = /[^A-Za-z0-9]/g; //Regex for non-alphanumeric.

		for (var i = 0; i < arrObj.length; i++) {
			if (rgxNonAlphaNum.test(arrObj[i])) { //if non-alphanumeric exist in the string.
				throw { message: 'Object "' + arrObj[i] + '" in "' + varObjPath + '" is invalid!' };
			}
			if (objLast[arrObj[i]] === undefined) {
				objLast[arrObj[i]] = {};
			}
			objLast = objLast[arrObj[i]]; //Set current object as last object.
		}
		return objLast;
	} catch (ex) {
		console.log(
			'Unable to build object "' + varObjPath + '".\n' +
			'Error: ' + ex.message
		);
	}
}