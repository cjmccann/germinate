#pragma strict

public var water : float = 0;
public var sugar : float = 0;
public var treeHp : float = 100;
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
public var harden : boolean;
public var duplicateExists : boolean;
var clone : GameObject;

private var branchScript : growTree;
private var rootScript   : growRoot;

function Start () {
	branches = GameObject.Find("Branches").GetComponent(growTree).branches;
	roots = GameObject.Find("RootContainer").GetComponent(growRoot).roots;
	duplicateExists = false;
}

function Update () {
	branches = GameObject.Find("Branches").GetComponent(growTree).branches;
	roots = GameObject.Find("RootContainer").GetComponent(growRoot).roots;
	waterRate = (.001 * roots) - (.0005 * branches);
	sugarRate = (.001 * (branches/5));
	
	water += waterRate;
	sugar += sugarRate;
	treeHp -= .1;
}

function OnGUI() {
	var largeFont : GUIStyle = new GUIStyle();
	largeFont.fontSize = 22;
	largeFont.normal.textColor = Color.white;
	
	GUI.Label(Rect((Screen.width/2) - 70, 5, Screen.width, Screen.height), "Time: " + (Mathf.Round(Time.time*100)/100).ToString(), largeFont);
	GUI.Label(Rect(10, 20, Screen.width, Screen.height), "Water: " + (Mathf.Round(water*100)).ToString());

	GUI.BeginGroup(new Rect (pos.x, pos.y, size.x, size.y));
		GUI.Box (Rect (0, 0, size.x, size.y), progressBarEmpty);
	
		GUI.BeginGroup (new Rect(0, 0, size.x * water, size.y));
			GUI.Box (Rect (0, 0, size.x, size.y), progressBarFull);
		GUI.EndGroup();
	GUI.EndGroup();
	
	if (waterRate >= 0) {
		GUI.contentColor = Color.green;
		GUI.Label(Rect(43, 40, Screen.width, Screen.height), "+" + (waterRate*100).ToString());
		GUI.contentColor = Color.white;
	} else {
		GUI.contentColor = Color.red;
		GUI.Label(Rect(43, 40, Screen.width, Screen.height), (waterRate*100).ToString());
		GUI.contentColor = Color.white;
	}	
	
	GUI.Label(Rect(10, 60, Screen.width, Screen.height), "Sugars: " + (Mathf.Round(sugar*100)).ToString());
	
	GUI.BeginGroup(new Rect (pos2.x, pos2.y, size2.x, size2.y));
		GUI.Box (Rect (0, 0, size2.x, size2.y), progressBarEmpty);
		
		GUI.BeginGroup (new Rect(0, 0, size2.x * sugar, size2.y));
			GUI.Box (Rect (0, 0, size2.x, size2.y), progressBarFull);
		GUI.EndGroup();
	GUI.EndGroup();
		
	GUI.contentColor = Color.green;
	GUI.Label(Rect(43, 80, Screen.width, Screen.height), "+" + (sugarRate*100).ToString());
	GUI.contentColor = Color.white;
	
	branchScript = GameObject.Find("Branches").GetComponent(growTree);
	rootScript   = GameObject.Find("RootContainer").GetComponent(growRoot);
	
	var buttonWidth = 100;
	var buttonHeight = 60;
	var buttonX = (Screen.width  - buttonWidth - 10);
	var buttonY = (Screen.height - buttonHeight - 10);
	
	GUI.BeginGroup(new Rect(Screen.width - 110, 40, size.x, size.y));
		GUI.Box (Rect (0, 0, size.x, size.y), progressBarEmpty);
		
		GUI.BeginGroup (new Rect(0, 0, treeHp, size.y));
			GUI.Box (Rect (0, 0, size.x, size.y), progressBarFull);
		GUI.EndGroup();
	GUI.EndGroup();
	
	GUI.Label(Rect(Screen.width - 110, 20, Screen.width, Screen.height), "Tree Health:");
	if (treeHp >= 70) {
		GUI.contentColor = Color.green;
		GUI.Label(Rect(Screen.width - 70, 40, Screen.width, Screen.height), (Mathf.Round(treeHp)).ToString());
		GUI.contentColor = Color.white;
	} else if (treeHp >= 35) {
		GUI.contentColor = Color.yellow;
		GUI.Label(Rect(Screen.width - 70, 40, Screen.width, Screen.height), (Mathf.Round(treeHp)).ToString());
		GUI.contentColor = Color.white;
	} else {
		GUI.contentColor = Color.red;
		GUI.Label(Rect(Screen.width - 100, 60, Screen.width, Screen.height), "Danger!", largeFont);
		GUI.Label(Rect(Screen.width - 70, 40, Screen.width, Screen.height), (Mathf.Round(treeHp)).ToString());
		GUI.contentColor = Color.white;
	}
	
	if (GUI.Button(Rect(buttonX, buttonY, buttonWidth, buttonHeight), "Grow Root!\n" + "Cost: " + (rootCost*100).ToString() + " water")) {
		rootScript.mkRoot();  
	}
			   
	buttonX = 10;
	
	if (GUI.Button(Rect(buttonX, buttonY, buttonWidth, buttonHeight), "Grow Branch!\n" + "Cost: " + (branchCost*100).ToString() + " sugar")) {
		branchScript.mkBranch();
	}
			   
	buttonX = buttonX + buttonWidth + 10;
	
	if (GUI.RepeatButton(Rect(buttonX, buttonY, buttonWidth, buttonHeight), 
			   "Harden!\n" + "1 sugar/s\n1 water/s".ToString())) {	
		if (water > 0 && sugar > 0) {
			harden = true;
			water -= .001;
			sugar -= .001;
		}
	} else {
		harden = false;
		duplicateExists = false;
		Destroy (clone, 0);
	}
	
	if(harden && !duplicateExists) {
		duplicateExists = true;
		clone = Instantiate(GameObject.Find("2 - Foreground"));
		clone.transform.localScale.x = 1.35;
		clone.transform.position.x -= .034;
		clone.transform.position.z = 5;
		var cloneSprites : SpriteRenderer[];
		cloneSprites = clone.GetComponentsInChildren.<SpriteRenderer>();
		for (var cloneSprite : SpriteRenderer in cloneSprites) {
			cloneSprite.color = Color.cyan;
		}
	}
	
	if (water <= 0 || sugar <= 0) {
			GUI.contentColor = Color.yellow;
			GUI.Label(Rect(buttonX, buttonY + 5, Screen.width, Screen.height), "Insufficient\nResources", largeFont);
			GUI.contentColor = Color.white;
	}
}