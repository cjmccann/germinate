#pragma strict


public var buttonStartW : int = 145;
public var buttonStartH : int = 150;
public var buttonW : int = 180;
public var buttonH : int = 60;
public var offset_y : int = 50;

public var text_wid : int = 160;
public var text_hi : int = 100;

public var img : Texture;

public var text1 : String;

var native_width : float = 330;
var native_height : float = 539;

function Start () {
}
	
function OnGUI(){
	var rx : float = Screen.width / (native_width);
	var ry : float = Screen.height / (native_height);
	GUI.matrix = Matrix4x4.TRS(Vector3(0, 0, 0), Quaternion.identity, Vector3 (rx, ry, 1));

	GUI.skin.textField.wordWrap = true;
	GUI.skin.textField.alignment = TextAnchor.MiddleCenter;
	GUI.backgroundColor = Color.clear;
//	GUI.skin.button.fontSize=30;

	
	if(GUI.Button(Rect(buttonStartW * .6, buttonStartH * .6, buttonW, buttonH), img	)) {
		Application.LoadLevel(1);
	};
	
	text1 = "Welcome to Germinate! Grow roots and branches to spread your seed. But beware of spiders!";
	
	GUI.TextField(Rect(buttonStartW, buttonStartH + offset_y, text_wid, text_hi), text1 );	
}


function Update () {

}