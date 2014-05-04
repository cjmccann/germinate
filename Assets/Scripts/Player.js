#pragma strict

public var movement: Vector2;
public var speed: Vector2;

function Start () {
	speed = Vector2(50, 50);

}

function Update () {
	var inputX = Input.GetAxis("Horizontal");
	var inputY = Input.GetAxis("Vertical");
	
	movement = Vector2(speed.x * inputX,
					   speed.y * inputY);
}

function FixedUpdate() { 
	rigidbody2D.velocity = movement;
}