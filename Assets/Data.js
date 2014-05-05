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
public var isAttacked : boolean;
public var attackers : int;
public var duplicateExists : boolean;
var clone : GameObject;
var dayPeriod : float;
var dayTime : boolean;
private var pause : boolean;

var native_width : float = 330;
var native_height : float = 539;

public var raining : boolean;

public var germinateSound : AudioClip;

private var spiders : SpiderControl;
private var branchScript : growTree;
private var rootScript   : growRoot;
private var sunScript : sun;
private var renderers : SpriteRenderer[];
private var fruitArray : GameObject[];

private var rainSystem : ParticleSystem;

private var timer = 0.0;
private var goalTime : int;
private var startTime : int;

private var timeSinceStart : float;

private var gameOver : int;

function Start () {
	branches = GameObject.Find("Branches").GetComponent(growTree).branches;
	roots = GameObject.Find("RootContainer").GetComponent(growRoot).roots;
	spiders = GameObject.Find("4 - Spiders").GetComponent(SpiderControl);
	sunScript = GameObject.Find("Sun").GetComponent(sun);
	rainSystem = GameObject.Find("3 - RainTown").GetComponent(ParticleSystem);
	
	duplicateExists = false;
	isAttacked = false;
	attackers = 0;
	
	goalTime = 9;
	dayPeriod = 8;
	dayTime = true;
	
	raining = false;
	rainSystem.enableEmission = false;
	pause = false;
	
	timeSinceStart = 0.001;
	gameOver = 2;
	Time.timeScale = 1;
	
	fruitArray = gameObject.FindGameObjectsWithTag("Fruit");
	
	for (var fruit : GameObject in fruitArray) {
		fruit.GetComponent(SpriteRenderer).sortingLayerName = "Background";
		fruit.GetComponent(Transform).position.z = 0;
	}
	
}

function spawnTime(timeStamp : float) {
	if (timeStamp > 28) { 
		return 2; 
	} else if (timeStamp > 80) {
		return .5;
	} else { 
		return (10 - ((timeStamp/12) * (timeStamp/12))); 
	}
}

function germinate() {
	fruitArray = gameObject.FindGameObjectsWithTag("Fruit");
	
	for (var fruit : GameObject in fruitArray) {
		fruit.GetComponent(SpriteRenderer).sortingLayerName = "Foreground";
		fruit.GetComponent(Transform).position.z = -1;
	}
	
	Time.timeScale = 0;
	pause = true;
	audio.PlayOneShot(germinateSound);
	
	gameOver = 1;
}

function loseGame() {
	Time.timeScale = 0;
	pause = true;
	audio.PlayOneShot(germinateSound);
	
	gameOver = 0;
}

function Update () {
	if(!pause) {
		branches = GameObject.Find("Branches").GetComponent(growTree).branches;
		roots = GameObject.Find("RootContainer").GetComponent(growRoot).roots;
		
		if (raining) {
			waterRate = (.0001 * (Mathf.Pow(roots, .7)) - (.000001 * branches) * 1.4) * 1.1;
		} else {
			waterRate = (.0001 * (Mathf.Pow(roots, .7)) - (.000001 * branches));
		}
		
		if (dayTime) {
			sugarRate = (.00045 * (Mathf.Pow((branches/5), .8)));
		} else {
			sugarRate = (.00045 * (Mathf.Pow((branches/5), .8))) * .65;
		}

		water += waterRate;
		sugar += sugarRate; 
		
		if(isAttacked) {
			treeHp -= (.1) * attackers;
		}
		
		if(treeHp <= 0) {
			loseGame();
		}

		if (timeSinceStart > goalTime) {
			spiders.makeSpider();
			goalTime = timeSinceStart + spawnTime(timeSinceStart);
		}
		
		if (timeSinceStart > dayPeriod) {
			dayPeriod = timeSinceStart + 8;

			if (sunScript.dayTime == false) {
				renderers = FindObjectsOfType(SpriteRenderer);
				dayTime = true;
				for (var renderer : SpriteRenderer in renderers) {
					renderer.color = Color.white;
				}
			} else {
				renderers = FindObjectsOfType(SpriteRenderer);
				dayTime = false;
				for (var renderer : SpriteRenderer in renderers) {
					renderer.color = Color.magenta;
				}
			}
			
			sunScript.dayTime = !sunScript.dayTime;
		}
		
		if (!raining) {
			var rand = Random.Range(0, 350);
			
			if (rand == 75) {
				raining = true;
				startTime = timeSinceStart;
				rainSystem.enableEmission = true;
			}
		} else {
			if (timeSinceStart > startTime + 6) {
				raining = false;
				rainSystem.enableEmission = false;
			}
		}
		
		timeSinceStart += Time.deltaTime;
	}
}

function OnGUI() {

	var rx : float = Screen.width / (native_width * .680);
	var ry : float = Screen.height / (native_height * .680);
	GUI.matrix = Matrix4x4.TRS(Vector3(0, 0, 0), Quaternion.identity, Vector3 (rx, ry, 1));

	var largeFont : GUIStyle = new GUIStyle();
	largeFont.fontSize = 22;
	largeFont.normal.textColor = Color.white;
	
	GUI.Label(Rect(95, 5, 330, 539), "Time: " + (Mathf.Round(timeSinceStart*100)/100).ToString(), largeFont);
	GUI.Label(Rect(10, 20, 330, 539), "Water: " + (Mathf.Round(water*100)).ToString());

	GUI.BeginGroup(new Rect (pos.x, pos.y, size.x, size.y));
		GUI.Box (Rect (0, 0, size.x, size.y), progressBarEmpty);
	
		GUI.BeginGroup (new Rect(0, 0, size.x * water, size.y));
			GUI.Box (Rect (0, 0, size.x, size.y), progressBarFull);
		GUI.EndGroup();
	GUI.EndGroup();
	
	if (waterRate >= 0) {
		GUI.contentColor = Color.green;
		GUI.Label(Rect(43, 40, Screen.width, Screen.height), "+" + (waterRate*100).ToString("F3"));
		GUI.contentColor = Color.white;
	} else {
		GUI.contentColor = Color.red;
		GUI.Label(Rect(43, 40, Screen.width, Screen.height), (waterRate*100).ToString("F3"));
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
	GUI.Label(Rect(43, 80, Screen.width, Screen.height), "+" + (sugarRate*100).ToString("F3"));
	GUI.contentColor = Color.white;
	
	branchScript = GameObject.Find("Branches").GetComponent(growTree);
	rootScript   = GameObject.Find("RootContainer").GetComponent(growRoot);
	
	var buttonWidth = 100;
	var buttonHeight = 60;
	var buttonX = (330  - buttonWidth - 10);
	var buttonY = (539 - buttonHeight - 10);
	
	GUI.BeginGroup(new Rect(220, 40, size.x, size.y));
		GUI.Box (Rect (0, 0, size.x, size.y), progressBarEmpty);
		
		GUI.BeginGroup (new Rect(0, 0, treeHp, size.y));
			GUI.Box (Rect (0, 0, size.x, size.y), progressBarFull);
		GUI.EndGroup();
	GUI.EndGroup();
	
	GUI.Label(Rect(220, 20, Screen.width, Screen.height), "Tree Health:");
	if (treeHp >= 70) {
		GUI.contentColor = Color.green;
		GUI.Label(Rect(260, 40, Screen.width, Screen.height), (Mathf.Round(treeHp)).ToString());
		GUI.contentColor = Color.white;
	} else if (treeHp >= 35) {
		GUI.contentColor = Color.yellow;
		GUI.Label(Rect(260, 40, Screen.width, Screen.height), (Mathf.Round(treeHp)).ToString());
		GUI.contentColor = Color.white;
	} else {
		GUI.contentColor = Color.red;
		GUI.Label(Rect(230, 60, Screen.width, Screen.height), "Danger!", largeFont);
		GUI.Label(Rect(260, 40, Screen.width, Screen.height), (Mathf.Round(treeHp)).ToString());
		GUI.contentColor = Color.white;
	}
	
	if(!pause) {
		if (GUI.Button(Rect(buttonX, buttonY, buttonWidth, buttonHeight), "Grow Root!\n" + "Cost: " + (rootCost*100).ToString() + " water")) {
			rootScript.mkRoot();  
		}
		
		buttonX = 10;
		
		if (GUI.Button(Rect(buttonX, buttonY, buttonWidth, buttonHeight), "Grow Branch!\n" + "Cost: " + (branchCost*100).ToString() + " sugar")) {
			branchScript.mkBranch();
		}
				   
		buttonX = buttonX + buttonWidth + 10;
		
		if (GUI.RepeatButton(Rect(buttonX - 5, buttonY, buttonWidth, buttonHeight), 
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

	if ((water*100) >= 100 && (sugar*100) >= 100 && !pause) {
		if (GUI.Button(Rect(10, 388, 308.55, 75), "GERMINATE!")) {
			germinate();
		}
	}
	
	
	if (pause) {
		var score = ((water*100) * (waterRate*10000)) + ((sugar*100) * (sugarRate*10000)) + branches + roots + timeSinceStart;
		
	
		switch (gameOver) {
			case 1:
				GUI.Box(new Rect(45, 200, 240, 160), "CONGRATULATIONS! You produced\nfruit and your species lives on!\nYour score is:\nWater: + " + Mathf.Round(water*100) + " * " + Mathf.Round(waterRate*10000) + " (water intake)" + 
				"\nSugar: + " + Mathf.Round(sugar*100) + " * " + Mathf.Round(sugarRate*10000) + " (sugar intake)\nBranches: + " + branches + "\nRoots: + " + roots +
				"\nTime: + " + timeSinceStart.ToString("F3") + "\n-----------" +
				"\nTotal Score = " + score.ToString("F3"));
				if (GUI.Button(Rect(45, 365, 240, 40), "Play again?")) {
					Application.LoadLevel(0);
				}
				break;
			case 0:
				GUI.Box(new Rect(45, 200, 240, 160), 
				"GAME OVER\nSorry, you've been overrun.\nYour score is:\nWater: + " + Mathf.Round(water*100) + " * " + Mathf.Round(waterRate*10000) + " (water intake)" + 
				"\nSugar: + " + Mathf.Round(sugar*100) + " * " + Mathf.Round(sugarRate*10000) + " (sugar intake)\nBranches: + " + branches + "\nRoots: + " + roots +
				"\nTime: + " + timeSinceStart.ToString("F3") + "\n-----------" +
				"\nTotal Score = " + score.ToString("F3"));
				if (GUI.Button(Rect(45, 365, 240, 40), "Play again?")) {
					Application.LoadLevel(0);
				}
				break;
		}
	}
}