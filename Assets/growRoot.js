#pragma strict

public var rootPrefab : GameObject;
public var roots : int;
public var rootArray = [];
public 

function Start () {	
	roots = 1;
	
	//var height = GetComponent(SpriteRenderer).bounds.max.y - GetComponent(SpriteRenderer).bounds.min.y;
	//print("REAL" + height);
}

var growRate = 0.2;
private var timer = 0.0;

function Update () {
	if (timer > growRate) {
		if (Input.GetKey(KeyCode.UpArrow)) {
			var newRoot : GameObject;
			var newVector : Vector2;
			
			if (roots > 1) {
				while (true) {
					var rand = Random.Range(0, roots);
					var rootSelection = rootArray[rand].GetComponent("rootClass");
					if (rootSelection.full) { }
					else {
						newRoot = Instantiate(rootPrefab);
						while (true) {
							var side = Random.Range(0, 3);
							if (side == 0 && !rootSelection.rootLeft) {
								newVector = Vector2(-.2903818, -0.2403101);
								rootArray.push(newRoot);
								roots++;
								
								newRoot.transform.parent = rootArray[rand];
								newRoot.transform.position = newVector;
								break;
							} else if (side == 1 && !rootSelection.rootCenter) {
								newVector = Vector2(-.03976905, -0.2403101);
								rootArray.push(newRoot);
								roots++;
								
								newRoot.transform.parent = rootArray[rand];
								newRoot.transform.position = newVector;
								break;
							} else if (side == 2 && !rootSelection.rootCenter) {
								newVector = Vector2(.2805354, -0.2403101);
								rootArray.push(newRoot);
								roots++;
								
								newRoot.transform.parent = rootArray[rand];
								newRoot.transform.position = newVector;
								break;
							}
						}
						timer = 0.0;
						break;
					}
				}
			} else {
				newRoot = Instantiate(rootPrefab);
				newVector = Vector2(.02620226, -.3690214);
				rootArray.push(newRoot);
				roots++;
				
				newRoot.transform.parent = transform;
				newRoot.transform.position = newVector;
				timer = 0.0;
			}
			
		}
	} else {
		timer += Time.deltaTime;
		}
	}

function FixedUpdate() { 

}