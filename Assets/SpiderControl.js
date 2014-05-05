#pragma strict

public var SpiderLeftprefab : GameObject;
public var spider : GameObject;
private var rand : int;
private var rand_y : float;
private var rand_x : float;
private var div100 : float;
/*
public var spiderArray : GameObject[];

public var startx : float = -1.519964;
public var starty : float = -0.8390359;

public var newVector : Vector2 = new Vector2(startx, starty);
*/
function Start() {
	makeSpider();
}

function OnGUI(){
	if(GUI.Button(Rect(0, 0, 20, 20), "spider")) {
		makeSpider();  
	}
}

function makeSpider(){
	spider = Instantiate(SpiderLeftprefab);
	rand = Random.Range(1,3);
	div100 = 100.01;
	rand_x = (parseFloat(Random.Range(75,150))/ div100);
	rand_y = (parseFloat(Random.Range(75,125))/ div100);
	if(rand == 2){
		spider.transform.position = Vector2(-1.519964 * rand_x, -1.5390359 * rand_y);
	}
	else {
		spider.transform.position = Vector2(1.519964 * rand_x, -1.5390359 * rand_y);
	}
	spider.transform.parent = transform;
}

function Update () {
}