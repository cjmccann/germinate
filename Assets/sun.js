#pragma strict

var sunrise : Transform;
var sunset  : Transform;
var firstFrame : boolean;
public var dayTime : boolean;

var journeyTime = 20;

private var startTime : float;

function Start () {
	startTime = Time.time;
	dayTime = true;
}

function Update () {
	if (dayTime) {
		var center = (sunrise.position + sunset.position) * 0.5;
		
		center -= Vector3(0, 1, 0);
		
		var riseRelCenter = sunrise.position - center;
		var setRelCenter = sunset.position - center;
		
		var fracComplete = (Time.time - startTime) / journeyTime;
		transform.position = Vector3.Slerp(riseRelCenter, setRelCenter, fracComplete);
		transform.position += center;
		
		if ( transform.position == sunset.position ) {
			transform.position = sunrise.position;
			startTime = Time.time;
		}
	}
}