#pragma strict

private var hitTree : boolean = false;
private var fromLeft : boolean;
private var velocity: float;
private var velocity_y: float;
private var hasAttacked : boolean;
private var hasStoppedAttacking : boolean;
private var leaving : boolean;
public var spiderSound : AudioClip;

private var data : Data;

function Start () {
	GetComponent(SpriteRenderer).sortingLayerName = "Background";
	data = GameObject.Find("Data").GetComponent(Data);
	
	velocity = (.01) + (Time.time * 0.1 * .001);
	velocity_y = velocity;
	
	transform.rotation.y = 0;
	if(transform.position.x > 0){
		fromLeft = false;
		velocity = -1 * velocity;
		transform.rotation.y = 180;
	}
	else {
		fromLeft = true;
	}
	
	hasAttacked = false;
	hasStoppedAttacking = false;
	leaving = false;
}

function Update () {
	if((fromLeft == true) && (transform.position.x > -0.21) && !leaving) {
		if (data.harden) {
			leaving = true;
			velocity = -.01;
			transform.rotation.y = 180;
			if (!hasStoppedAttacking) {
				data.isAttacked = false;
				if (data.attackers != 0) {
					data.attackers--;
					hasStoppedAttacking = true;
				}
			}
		} else {
			velocity = 0.0;
			if (!hasAttacked) {
				data.attackers++;
				hasAttacked = true;
				data.isAttacked = true;
			}
		}
	} else if((fromLeft == false) && (transform.position.x < .31 ) && !leaving){
		if (data.harden) {
			leaving = true; 
			velocity = .01;
			transform.rotation.y = 0;
			if (!hasStoppedAttacking) {
				data.isAttacked = false;
				if (data.attackers != 0) {
					data.attackers--;
					hasStoppedAttacking = true;
				}
			}
		} else {
			velocity = 0.0;
			if (!hasAttacked) {
				data.attackers++;
				hasAttacked = true;
				data.isAttacked = true;
			}
		}
	}
	
	if(transform.position.y >= -.95){
		velocity_y = 0;
		GetComponent(SpriteRenderer).sortingLayerName = "Foreground";
		audio.PlayOneShot(spiderSound);
	}

	transform.position.x += velocity;
	transform.position.y += velocity_y;
}