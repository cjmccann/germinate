#pragma strict

public var water : float = 0;
public var sugar : float = 0;
var waterRate : float = 0;
var sugarRate : float = 0;
var pos : Vector2 = new Vector2(10, 40);
var size : Vector2 = new Vector2(100, 20);
var pos2 : Vector2 = new Vector2(10, 80);
var size2 : Vector2 = new Vector2(100, 20);
var progressBarEmpty : Texture2D;
var progressBarFull : Texture2D;
private var branches : float;
private var roots : float;
public var branchCost : float;
public var rootCost : float;

private var branchScript : growTree;
private var rootScript   : growRoot;

function OnGUI() {
	GUI.Label(Rect(10, 5, Screen.width, Screen.height), "Time: " + (Mathf.Round(Time.time*100)/100).ToString());
	GUI.Label(Rect(10, 20, Screen.width, Screen.height), "Water: " + (Mathf.Round(water*100)).ToString());
	
	GUI.BeginGroup(new Rect (pos.x, pos.y, size.x, size.y));
		GUI.Box (Rect (0, 0, size.x, size.y), progressBarEmpty);
	
		GUI.BeginGroup (new Rect(0, 0, size.x * water, size.y));
			GUI.Box (Rect (0, 0, size.x, size.y), progressBarFull);
		GUI.EndGroup();
	GUI.EndGroup();
	
	GUI.Label(Rect(10, 60, Screen.width, Screen.height), "Sugars: " + (Mathf.Round(sugar*100)).ToString());
	
	GUI.BeginGroup(new Rect (pos2.x, pos2.y, size2.x, size2.y));
		GUI.Box (Rect (0, 0, size2.x, size2.y), progressBarEmpty);
		
		GUI.BeginGroup (new Rect(0, 0, size2.x * sugar, size2.y));
			GUI.Box (Rect (0, 0, size2.x, size2.y), progressBarFull);
		GUI.EndGroup();
	GUI.EndGroup();
	
	branchScript = GameObject.Find("Branches").GetComponent(growTree);
	rootScript   = GameObject.Find("RootContainer").GetComponent(growRoot);
	
	var buttonWidth = 100;
	var buttonHeight = 60;
	var buttonX = (Screen.width  - buttonWidth - 10);
	var buttonY = (Screen.height - buttonHeight - 10);
	
	if (GUI.Button(Rect(buttonX, buttonY, buttonWidth, buttonHeight), "Grow Root!\n" + "Cost: " + (rootCost*100).ToString() + " water")) {
		rootScript.mkRoot();  
	}
			   
	buttonX = 10;
	
	if (GUI.Button(Rect(buttonX, buttonY, buttonWidth, buttonHeight), "Grow Branch!\n" + "Cost: " + (branchCost*100).ToString() + " sugar")) {
		branchScript.mkBranch();
	}
			   
	buttonX = buttonX + buttonWidth + 10;
	
	GUI.Button(Rect(buttonX, buttonY, buttonWidth, buttonHeight), 
			   "Harden!\n" + "1 sugar/s\n1 water/s".ToString());
}

function Start () {
	branches = GameObject.Find("Branches").GetComponent(growTree).branches;
	roots = GameObject.Find("RootContainer").GetComponent(growRoot).roots;
}

function Update () {
	branches = GameObject.Find("Branches").GetComponent(growTree).branches;
	roots = GameObject.Find("RootContainer").GetComponent(growRoot).roots;
	waterRate = (.001 * roots) - (.0005 * branches);
	sugarRate = (.001 * (branches/5));
	
	water += waterRate;
	sugar += sugarRate;
}