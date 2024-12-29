import * as THREE from 'three';
import planetas from './planets.json';


//Ajustes predeterminados. No modificar.
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, .01, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animateAll );
document.body.appendChild( renderer.domElement );



/*

    Aqui empieza el codigo de los planetas.

*/

//ESTRELLA : SOL.

const solValues = planetas.planetas.Sol;
const sunGeometry = new THREE.SphereGeometry( solValues.x, solValues.y, solValues.z ); 
const sunTexture = new THREE.TextureLoader().load('./sun.jpg');
const sunMaterial = new THREE.MeshBasicMaterial( { map: sunTexture } ); // Aplicando la textura
const sol = new THREE.Mesh( sunGeometry, sunMaterial ); 
scene.add( sol );


//PLANETA 1 : MERCURIO
const mercurioValues = planetas.planetas.Mercurio;
const mercurioGeometry = new THREE.SphereGeometry( mercurioValues.x, mercurioValues.y, mercurioValues.z );
const mercurioTexture = new THREE.TextureLoader().load('./mercury.jpg');
const mercurioMaterial = new THREE.MeshBasicMaterial( {map : mercurioTexture} );
const mercurio = new THREE.Mesh( mercurioGeometry, mercurioMaterial);
const radioOrbitaMercurio = 40;
let anguloMercurio = 0;
scene.add( mercurio );


//PLANETA 2 : VENUS
const venusValues = planetas.planetas.Venus;
const venusGeometry = new THREE.SphereGeometry( venusValues.x, venusValues.y, venusValues.z );
const venusTexture = new THREE.TextureLoader().load('./venus.jpg');
const venusMaterial = new THREE.MeshBasicMaterial( {map : venusTexture} );
const venus = new THREE.Mesh( venusGeometry, venusMaterial);
const radioOrbitaVenus = 60;
let anguloVenus = 0;
scene.add( venus );

//Planeta 3 : Tierra
const tierraValues = planetas.planetas.Tierra;
const tierraGeometry = new THREE.SphereGeometry( tierraValues.x, tierraValues.y, tierraValues.z );
const tierraTexture = new THREE.TextureLoader().load('./earth.jpg');
const tierraMaterial = new THREE.MeshBasicMaterial( {map : tierraTexture });
const tierra = new THREE.Mesh( tierraGeometry, tierraMaterial );
const radioOrbitaTierra  = 80;
let anguloTierra = 0;
scene.add( tierra );

//Planeta 4 : Mars
const marsValues = planetas.planetas.Marte;
const marsGeometry = new THREE.SphereGeometry ( marsValues.x, marsValues.y, marsValues.z );
const marsTexture = new THREE.TextureLoader().load('./mars.jpg');
const marsMaterial = new THREE.MeshBasicMaterial( {map : marsTexture} );
const mars = new THREE.Mesh( marsGeometry, marsMaterial );
const radioOrbitaMars = 100;
let anguloMars = 0;
scene.add (mars);


//Animaciones para cada planeta.
function animateSun(){
    sol.rotation.y -= 0.01;
};

//Animacion Mercurio
function animateMercurio(){
    anguloMercurio += 0.01;

    const x = radioOrbitaMercurio * Math.cos(anguloMercurio);
    const z = radioOrbitaMercurio * Math.sin(anguloMercurio);

    mercurio.position.set(x,0,z);

    mercurio.rotation.y -= 0.01;
}


//Animacion Venus
function animateVenus(){    
    // Incrementar el ángulo para simular el movimiento de Venus
    anguloVenus += 0.008; // Controla la velocidad del movimiento

    // Calcular la nueva posición de Venus usando coordenadas polares
    const x = radioOrbitaVenus * Math.cos(anguloVenus); // X es el coseno del ángulo
    const z = radioOrbitaVenus * Math.sin(anguloVenus); // Z es el seno del ángulo

    // Actualizar la posición de Venus
    venus.position.set(x, 0, z); // No movemos en Y para mantener a Venus en el plano de la órbita

    // Hacer que Venus también gire sobre su propio eje (esto es opcional)
    venus.rotation.y -= 0.01;
}

function animateTierra(){
    anguloTierra += 0.005;
    const x = radioOrbitaTierra * Math.cos(anguloTierra);
    const z = radioOrbitaTierra * Math.sin(anguloTierra);

    tierra.position.set(x, 0, z);

    tierra.rotation.y -= 0.01;
}

function animateMars(){
    anguloMars += 0.004;
    const x = radioOrbitaMars * Math.cos(anguloMars);
    const z = radioOrbitaMars * Math.sin(anguloMars);
    mars.position.set(x, 0, z);
    mars.rotation.y += 0.01;
}



// Cámara de la página, movemos en Y para ver mejor el movimiento
camera.position.set( 0, 200, 10 ); // Mover la cámara más arriba en el eje Y
// También puedes ajustar la orientación de la cámara si lo deseas
camera.lookAt( 0, 20, 20 ); // Asegura que la cámara mire hacia el centro de la escena (el Sol)





//Modificar para cada uno de los planetas.
function animateAll() {
    animateSun();
    animateMercurio();
    animateVenus();
    animateTierra();
    animateMars();
    renderer.render( scene, camera );
    
}
