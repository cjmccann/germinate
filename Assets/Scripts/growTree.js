#pragma strict

public var speed = .5;
public var branchPrefab : GameObject;
public var reverseBranchPrefab : GameObject;
public var pos: Vector2;
public var qTo: Quaternion;
public var consecRight : int;
public var consecLeft  : int;
public var branches : int;

function Start () {
	pos = transform.position;
	qTo = transform.rotation;
	print(transform.position);
	
	consecRight = 1;
	consecLeft  = 0;
	
	branches = 1;
	
	//var height = GetComponent(SpriteRenderer).bounds.max.y - GetComponent(SpriteRenderer).bounds.min.y;
	//print("REAL" + height);
}

var growRate = 0.2;
private var timer = 0.0;

function Update () {
	if (timer > growRate) {
		if (Input.GetKey(KeyCode.UpArrow)) {
			var newBranch : GameObject;
			var newVector : Vector2;
			var rand = Random.Range(1, 3);
			var doLeft = false;
			var doRight = false;
			
			if (rand == 1) {
				doLeft = true;
			} else {
				doRight = true;
			}
			
			if (consecLeft == 2) {
				doRight = true;
				doLeft = false;
			} else if (consecRight == 2) {
				doLeft = true;
				doRight = false;
			}
			
			if(doLeft) {
				newBranch = Instantiate(reverseBranchPrefab);
				newVector = Vector2(0.1696949 + .1 - 0.381, -0.5299823 - .29);
				consecRight = 0;
				consecLeft++;
				branches++;
			} else {
				newBranch = Instantiate(branchPrefab);
				newVector = Vector2(0.1696949 + .1, -0.5299823 - .29);
				consecLeft = 0;
				consecRight++;
				branches++;
			}
			newBranch.transform.parent = transform;
			newBranch.transform.position = newVector;

			transform.position = Vector2( transform.position.x, transform.position.y + .14);
			timer = 0.0;
			
			if (branches == 5) {
				print("zoom out");
				Camera.main.orthographicSize += Camera.main.orthographicSize * .2;
				branches = 0;
			}
		}
	} else {
		timer += Time.deltaTime;
		}
	}

function FixedUpdate() { 

}