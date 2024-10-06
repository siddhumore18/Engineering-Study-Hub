let scene, camera, renderer, robot;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('robot-animation').appendChild(renderer.domElement);

    // Create robot
    const robotGeometry = new THREE.BoxGeometry(1, 1.5, 1);
    const robotMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    robot = new THREE.Mesh(robotGeometry, robotMaterial);
    scene.add(robot);

    // Create robot head
    const headGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0x00ffff });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1;
    robot.add(head);

    // Create robot arms
    const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.6, 0, 0);
    leftArm.rotation.z = Math.PI / 2;
    robot.add(leftArm);

    const rightArm = leftArm.clone();
    rightArm.position.set(0.6, 0, 0);
    robot.add(rightArm);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    camera.position.z = 5;

    // Animation
    gsap.to(robot.rotation, {
        y: Math.PI * 2,
        duration: 5,
        repeat: -1,
        ease: "none"
    });

    gsap.to(robot.position, {
        y: 0.5,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut"
    });

    gsap.to([leftArm.rotation, rightArm.rotation], {
        z: Math.PI / 2 - 0.5,
        duration: 0.75,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut"
    });
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();
function onMouseMove(event) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    gsap.to(robot.rotation, {
        x: mouseY * 0.5,
        y: mouseX * 0.5,
        duration: 0.5
    });
}

window.addEventListener('mousemove', onMouseMove, false);
function createParticles() {
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
        colors[i] = Math.random();
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({ 
        size: 0.05, 
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    gsap.to(particles.rotation, {
        y: Math.PI * 2,
        duration: 10,
        repeat: -1,
        ease: "none"
    });
}

// Call this function in the init() function
createParticles();