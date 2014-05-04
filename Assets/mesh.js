#pragma strict

function Start () {
	var width = GetComponent(SpriteRenderer).bounds.max.x - GetComponent(SpriteRenderer).bounds.min.x;
	print("REAL ONE" + width);
}

function Update () {

}