var camera;
var scene;
var rr;
var board;
var targetx;
var targety;
var source_pos;
var	target_pos;
var	direction; 
var	arrow;


game();
animate();

function game() 

{  
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // camera view set
    camera.rotation.x = 0; // for top view
    camera.position.y = 0; // for top view 
    camera.position.z = 400;
    // camera view set

    // board, striker, red_coin added
    board = new THREE.Mesh(new THREE.CubeGeometry( 300, 300, 10), new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('image.jpg') }));

    striker = new THREE.Mesh(new THREE.CircleGeometry(10,30), new THREE.MeshBasicMaterial({color:'grey', wireframe: false}))
    striker.position.x = 50;
    striker.position.y = -85;
    striker.position.z = 10;
    striker.rotation.x = -camera.rotation.x;

    var red_coin = new THREE.Mesh(new THREE.CylinderGeometry(5,5,1), new THREE.MeshBasicMaterial({color:'red', wireframe: false}))
    red_coin.position.z = 10;
    red_coin.rotation.x = 1-camera.rotation.x;
    scene.add(board, striker, red_coin);
    // board, striker, red_coin added

    // coins added
    var whitecoin1 = new THREE.Mesh(new THREE.CylinderGeometry(5,5,1), new THREE.MeshBasicMaterial({color:'white', wireframe: false}))
    whitecoin1.position.x = 10;
    whitecoin1.position.y = 10;
    whitecoin1.position.z = 10;
    whitecoin1.rotation.x = 1-camera.rotation.x;
    scene.add(whitecoin1);

    var whitecoin2 = new THREE.Mesh(new THREE.CylinderGeometry(5,5,1), new THREE.MeshBasicMaterial({color:'white', wireframe: false}))
    whitecoin2.position.x = 10;
    whitecoin2.position.y = -10;
    whitecoin2.position.z = 10;
    whitecoin2.rotation.x = 1-camera.rotation.x;
    scene.add(whitecoin2);

    var whitecoin3 = new THREE.Mesh(new THREE.CylinderGeometry(5,5,1), new THREE.MeshBasicMaterial({color:'white', wireframe: false}))
    whitecoin3.position.x = -10;
    whitecoin3.position.y = 10;
    whitecoin3.position.z = 10;
    whitecoin3.rotation.x = 1-camera.rotation.x;
    scene.add(whitecoin3);

    var whitecoin4 = new THREE.Mesh(new THREE.CylinderGeometry(5,5,1), new THREE.MeshBasicMaterial({color:'white', wireframe: false}))
    whitecoin4.position.x = -10;
    whitecoin4.position.y = -10;
    whitecoin4.position.z = 10;
    whitecoin4.rotation.x = 1-camera.rotation.x;
    scene.add(whitecoin4);

    var blackcoin1 = new THREE.Mesh(new THREE.CylinderGeometry(5,5,1), new THREE.MeshBasicMaterial({color:'black', wireframe: false}))
    blackcoin1.position.x = 0;
    blackcoin1.position.y = 10;
    blackcoin1.position.z = 10;
    blackcoin1.rotation.x = 1-camera.rotation.x;
    scene.add(blackcoin1);

    var blackcoin2 = new THREE.Mesh(new THREE.CylinderGeometry(5,5,1), new THREE.MeshBasicMaterial({color:'black', wireframe: false}))
    blackcoin2.position.x = 0;
    blackcoin2.position.y = -10;
    blackcoin2.position.z = 10;
    blackcoin2.rotation.x = 1-camera.rotation.x;
    scene.add(blackcoin2);

    var blackcoin3 = new THREE.Mesh(new THREE.CylinderGeometry(5,5,1), new THREE.MeshBasicMaterial({color:'black', wireframe: false}))
    blackcoin3.position.x = 10;
    blackcoin3.position.y = 0;
    blackcoin3.position.z = 10;
    blackcoin3.rotation.x = 1-camera.rotation.x;
    scene.add(blackcoin3);

    var blackcoin4 = new THREE.Mesh(new THREE.CylinderGeometry(5,5,1), new THREE.MeshBasicMaterial({color:'black', wireframe: false}))
    blackcoin4.position.x = -10;
    blackcoin4.position.y = 0;
    blackcoin4.position.z = 10;
    blackcoin4.rotation.x = 1-camera.rotation.x;
    scene.add(blackcoin4);
    // coins added

    // arrow added
    targetx= striker.position.x;
    targety= striker.position.y;
    source_pos = new THREE.Vector3 (striker.position.x , striker.position.y,striker.position.z +15);
	target_pos = new THREE.Vector3 (targetx,targety,striker.position.z+15);
	direction =  new THREE.Vector3 (). sub(target_pos,source_pos);
	arrow = new THREE.ArrowHelper (direction.clone().normalize(),source_pos, 100,'pink');
	scene.add(arrow);
    // arrow added


    rr = new THREE.WebGLRenderer();  // renderer variable
    rr.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( rr.domElement );
    document.addEventListener('keypress', movements);  // execute function on keypress
    render();
}

function animate()
{
    render();
    requestAnimationFrame( animate );
}


function render()
{
    rr.render( scene, camera );
}


function arrowpos() 
{
	scene.remove(arrow);
	source_pos = new THREE.Vector3 (striker.position.x , striker.position.y,striker.position.z+5);
	target_pos = new THREE.Vector3 (targetx,targety,striker.position.z+5);
	direction =  new THREE.Vector3 (). sub(target_pos,source_pos);
	arrow = new THREE.ArrowHelper (direction.clone().normalize(),source_pos, 100,'pink');
	scene.add(arrow);
}

  function movements(event)
 { 
	if(event.keyCode == 37 && striker.position.x >-55) 
	{
		striker.position.x-=1;
    }	

    if(event.keyCode == 39)
	{
		striker.position.x+=1;
    }	
    
    if (event.which == 32 )
    { 
         striker.position.y+=50; 
    }
    
    
	if(event.which == 116){
		camera.position.y = 0;
    		camera.position.z = 400;
    		camera.rotation.x = 0;
		if(camview)
			camview=false;
	}
	else if(event.which == 112){
		camera.position.y = -450;
    		camera.position.z = 400;
    		camera.rotation.x = 0.75;
		if(camview)
			camview=false;
	}
	else if(event.which == 115){
		camview=true;
		setcamera();
	}
 }

 //THREE.Collisions.colliders.push(
 // THREE.CollisionUtils.MeshOBB( cube ) );

 function playsound ()
 {
 	var music = new Audio ("music.wav");
 	music.loop = true;
 	music.play();
 }

playsound();


function setcamera(){
	camera.position.y = striker.position.y;
    camera.position.z = striker.position.z+15;
	camera.position.x = striker.position.x;
    camera.rotation.x = 1;
}
