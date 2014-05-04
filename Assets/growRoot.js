#pragma strict

public var rootPrefab : GameObject;
public var roots : int;
public var rootArray : GameObject[];
private var data : Data;
private var index = 0;
public var growCost = .1;

function Start () {	
	roots = 1;
	data = GameObject.Find("Data").GetComponent(Data);
	data.rootCost = growCost;

	//var height = GetComponent(SpriteRenderer).bounds.max.y - GetComponent(SpriteRenderer).bounds.min.y;
	//print("REAL" + height);
}

var growRate = 0.2;
private var timer = 0.0;

function mkRoot() {
	if(data.water >= growCost) {
		data.water -= .1;
		var newRoot : GameObject;
		var newVector : Vector2;
		
		if (roots > 1) {
			rootArray = gameObject.FindGameObjectsWithTag("Root");
			while (true) {
				var rand = Random.Range(0, rootArray.Length);
				var rootSelection : rootClass = rootArray[rand].GetComponent(rootClass);
				if (rootSelection.rootLeft && rootSelection.rootRight && rootSelection.rootCenter) { }
				else {
					newRoot = Instantiate(rootPrefab);
					while (true) {
						var side = Random.Range(0, 3);
						if (side == 0 && !rootSelection.rootLeft) {
							newRoot.transform.parent = rootArray[rand].transform;
							newRoot.transform.localPosition = Vector2(-0.2906262, -0.236388);
							
							rootSelection.rootLeft = true;
							break;
						} else if (side == 1 && !rootSelection.rootCenter) {
							newRoot.transform.parent = rootArray[rand].transform;
							newRoot.transform.localPosition = Vector2(-.03976905, -0.2403101);
							
							rootSelection.rootCenter = true;
							break;
						} else if (side == 2 && !rootSelection.rootRight) {
							newRoot.transform.parent = rootArray[rand].transform;
							newRoot.transform.localPosition = Vector2(.2805354, -0.2403101);
							
							rootSelection.rootRight = true;
							break;
						}
					}
					newRoot.gameObject.tag="Root";
					index++;
					roots++;
					timer = 0.0;
					break;
				}
			}
		} else {
			newRoot = Instantiate(rootPrefab);
			newVector = Vector2(0.1011564, -1.219302);
			roots++;
			index++;
			
			newRoot.gameObject.tag="Root";
			newRoot.transform.parent = transform;
			newRoot.transform.position = newVector;
			timer = 0.0;
		}
		
	}
}

function Update () {
/*
	if (timer > growRate) {
	
		if (Input.GetKey(KeyCode.UpArrow)) {
			if(data.water > growCost) {
				data.water -= .1;
				var newRoot : GameObject;
				var newVector : Vector2;
				
				if (roots > 1) {
					rootArray = gameObject.FindGameObjectsWithTag("Root");
					while (true) {
						var rand = Random.Range(0, rootArray.Length);
						var rootSelection : rootClass = rootArray[rand].GetComponent(rootClass);
						if (rootSelection.rootLeft && rootSelection.rootRight && rootSelection.rootCenter) { }
						else {
							newRoot = Instantiate(rootPrefab);
							while (true) {
								var side = Random.Range(0, 3);
								if (side == 0 && !rootSelection.rootLeft) {
									newRoot.transform.parent = rootArray[rand].transform;
									newRoot.transform.localPosition = Vector2(-0.2906262, -0.236388);
									
									rootSelection.rootLeft = true;
									break;
								} else if (side == 1 && !rootSelection.rootCenter) {
									newRoot.transform.parent = rootArray[rand].transform;
									newRoot.transform.localPosition = Vector2(-.03976905, -0.2403101);
									
									rootSelection.rootCenter = true;
									break;
								} else if (side == 2 && !rootSelection.rootRight) {
									newRoot.transform.parent = rootArray[rand].transform;
									newRoot.transform.localPosition = Vector2(.2805354, -0.2403101);
									
									rootSelection.rootRight = true;
									break;
								}
							}
							newRoot.gameObject.tag="Root";
							index++;
							roots++;
							timer = 0.0;
							break;
						}
					}
				} else {
					newRoot = Instantiate(rootPrefab);
					newVector = Vector2(0.1011564, -1.219302);
					roots++;
					index++;
					
					newRoot.gameObject.tag="Root";
					newRoot.transform.parent = transform;
					newRoot.transform.position = newVector;
					timer = 0.0;
				}
				
			}
		}
	} else {
		timer += Time.deltaTime;
	}*/
}

function FixedUpdate() { 

}