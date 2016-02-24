  var scene = new THREE.Scene();
  scene = new THREE.Scene();
        

    // SETUP RENDERER

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0xffffff );                // white background colour
  document.body.appendChild( renderer.domElement );  // add to document canvas 

   // SETUP CAMERA

  var aspect = window.innerWidth/window.innerHeight;
  camera = new THREE.PerspectiveCamera( 45, aspect, 0.1, 20000);   // view angle, aspect ratio, near, far
  scene.add(camera);
  camera.position.set(0,150,400);
  camera.lookAt(scene.position);  

    // CONTROLS
  controls = new THREE.OrbitControls( camera, renderer.domElement );

    // DEFINE UNIT CUBE -- to be reused several times

  var unitCubeGeometry = new THREE.BoxGeometry( 1,1,1 );   

    // SCENE AXES:    (x,y,z) drawn in (red,green,blue)

  var yellowMaterial  = new THREE.MeshBasicMaterial( { color: 0xffff00 } );

  var originBox = new THREE.Mesh( unitCubeGeometry, yellowMaterial );
  scene.add( originBox );

  // var axes = new THREE.AxisHelper(100);
  // scene.add( axes );

      // SKYBOX

var imagePrefix = "images/skybox/";
  var directions  = ["px", "nx", "py", "ny", "pz", "nz"];
  var imageSuffix = ".jpg";
  var skyGeometry = new THREE.CubeGeometry( 5000, 5000, 5000 ); 
  
  // from skybox tutorial

  var materialArray = [];
  for (var i = 0; i < 6; i++)
    materialArray.push( new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
      side: THREE.BackSide
    }));
  var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
  var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
  scene.add( skyBox );

/////////////////////////// THREE.JS ILLUMINATION ////////////////////////////

    // LIGHT SOURCES (simulate sunlight)

  var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
  directionalLight.position.set( 100, 75, 100 );
  directionalLight.castShadow = true;
  directionalLight.shadowDarkness = 1.5;
  scene.add( directionalLight );


    // DEFAULT PHONG MATERIAL  (used by the plane)

  var defaultPhongMaterial = new THREE.MeshPhongMaterial( { 
       ambient: 0x404040, color: 0xffffff, specular: 0x202020, shininess: 40.0});



/////////////////////////// MY SHADERS ////////////////////////////

    // Load plane

    var plane = loadOBJ( 'obj/B-747.obj',2.0, 0,5,0,0,0,0);


//scene.fog = new THREE.Fog( 0xffffff, 10, 5000 );
   
    // SETUP RENDER CALL-BACK


  var render = function () {
    requestAnimationFrame( render );
    renderer.render(scene, camera);
    controls.update();
  };

  render();

