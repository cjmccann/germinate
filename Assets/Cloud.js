#pragma strict

public var dx : float;

function Start () {
	dx = Random.Range(1, 5) * .01;
}

function Update () {
	if (transform.position.x > 9) {
		transform.position.x = -9;
		transform.position.y = Random.Range(35, 500)/100;
	} else {
		transform.position.x += dx;
	}
}