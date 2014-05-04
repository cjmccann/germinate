#pragma strict

var barDisplay : float = 0;
var pos : Vector2 = new Vector2(10, 40);
var size : Vector2 = new Vector2(100, 20);
var progressBarEmpty : Texture2D;
var progressBarFull : Texture2D;

function OnGUI() {
	GUI.Label(Rect(10, 5, Screen.width, Screen.height), "Time: " + Time.time.ToString());

	GUI.BeginGroup(new Rect (pos.x, pos.y, size.x, size.y));
		GUI.Box (Rect (0, 0, size.x, size.y), progressBarEmpty);
	
		GUI.BeginGroup (new Rect(0, 0, size.x * barDisplay, size.y));
			GUI.Box (Rect (0, 0, size.x, size.y), progressBarFull);
		GUI.EndGroup();
	GUI.EndGroup();
}

function Start () {

}

function Update () {
	barDisplay = Time.time * 0.05;
}