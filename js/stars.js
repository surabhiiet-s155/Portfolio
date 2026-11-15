/**
 * 3D Golden & Burnt Orange Stars Background System with Three.js
 * Author: Surabhi Subhas Chandra Portfolio
 * Palette: Executive Burnt Orange, Golden Amber, Terracotta, Peach & Warm Cream Fog
 */

(function () {
    let scene, camera, renderer;
    let starGeometry, starMaterial, starField;
    let nebulaGeometry, nebulaMaterial, nebulaField;
    let starCount = 3500;
    let starBaseZ = [];

    // Shooting stars (Golden-Orange Meteors)
    const shootingStars = [];
    const maxShootingStars = 4;

    // Mouse coordinates with smooth lerping
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    // Warp drive state
    let isWarping = false;
    let warpSpeed = 1;
    let normalSpeed = 0.42;
    let currentSpeed = normalSpeed;

    // Create a circular star texture with warm burnt-orange/golden glow
    function createStarTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(254, 215, 170, 0.95)');
        gradient.addColorStop(0.5, 'rgba(194, 65, 12, 0.65)');
        gradient.addColorStop(0.8, 'rgba(180, 83, 9, 0.25)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);

        return new THREE.CanvasTexture(canvas);
    }

    // Create warm amber/apricot nebula dust texture
    function createNebulaTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');

        const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        gradient.addColorStop(0, 'rgba(234, 88, 12, 0.22)');
        gradient.addColorStop(0.4, 'rgba(217, 119, 6, 0.12)');
        gradient.addColorStop(0.7, 'rgba(254, 215, 170, 0.05)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 128, 128);

        return new THREE.CanvasTexture(canvas);
    }

    function init() {
        const container = document.getElementById('canvas-container');
        if (!container) return;

        // Scene & Camera
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0xfaf7f2, 0.00055);

        camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 3500);
        camera.position.z = 1000;

        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const starTexture = createStarTexture();

        // 1. Build Star Field
        starGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        const palette = [
            new THREE.Color('#c2410c'), // Deep Burnt Orange
            new THREE.Color('#ea580c'), // Rich Sunset Orange
            new THREE.Color('#b45309'), // Antique Gold
            new THREE.Color('#d97706'), // Warm Amber
            new THREE.Color('#fb923c'), // Soft Peach
            new THREE.Color('#9a3412')  // Deep Terracotta
        ];

        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;
            const x = (Math.random() - 0.5) * 3200;
            const y = (Math.random() - 0.5) * 2600;
            const z = (Math.random() - 0.5) * 2800;

            positions[i3] = x;
            positions[i3 + 1] = y;
            positions[i3 + 2] = z;
            starBaseZ[i] = z;

            const color = palette[Math.floor(Math.random() * palette.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            sizes[i] = Math.random() * 10 + 6;
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        starMaterial = new THREE.PointsMaterial({
            size: 8.5,
            map: starTexture,
            vertexColors: true,
            transparent: true,
            opacity: 0.88,
            blending: THREE.NormalBlending,
            depthWrite: false
        });

        starField = new THREE.Points(starGeometry, starMaterial);
        scene.add(starField);

        // 2. Build Nebula Field
        const nebulaTexture = createNebulaTexture();
        const nebulaCount = 160;
        nebulaGeometry = new THREE.BufferGeometry();
        const nebPositions = new Float32Array(nebulaCount * 3);
        const nebColors = new Float32Array(nebulaCount * 3);

        const nebColorsPalette = [
            new THREE.Color('#ea580c'),
            new THREE.Color('#fed7aa'),
            new THREE.Color('#d97706'),
            new THREE.Color('#fcd34d')
        ];

        for (let i = 0; i < nebulaCount; i++) {
            const i3 = i * 3;
            nebPositions[i3] = (Math.random() - 0.5) * 2400;
            nebPositions[i3 + 1] = (Math.random() - 0.5) * 2000;
            nebPositions[i3 + 2] = (Math.random() - 0.5) * 2200;

            const c = nebColorsPalette[Math.floor(Math.random() * nebColorsPalette.length)];
            nebColors[i3] = c.r;
            nebColors[i3 + 1] = c.g;
            nebColors[i3 + 2] = c.b;
        }

        nebulaGeometry.setAttribute('position', new THREE.BufferAttribute(nebPositions, 3));
        nebulaGeometry.setAttribute('color', new THREE.BufferAttribute(nebColors, 3));

        nebulaMaterial = new THREE.PointsMaterial({
            size: 180,
            map: nebulaTexture,
            vertexColors: true,
            transparent: true,
            opacity: 0.38,
            blending: THREE.NormalBlending,
            depthWrite: false
        });

        nebulaField = new THREE.Points(nebulaGeometry, nebulaMaterial);
        scene.add(nebulaField);

        window.addEventListener('resize', onWindowResize);
        document.addEventListener('mousemove', onDocumentMouseMove);
        document.addEventListener('touchmove', onDocumentTouchMove, { passive: true });

        setInterval(spawnShootingStar, 3200);

        animate();
    }

    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) * 0.45;
        mouseY = (event.clientY - windowHalfY) * 0.45;
    }

    function onDocumentTouchMove(event) {
        if (event.touches.length > 0) {
            mouseX = (event.touches[0].clientX - windowHalfX) * 0.35;
            mouseY = (event.touches[0].clientY - windowHalfY) * 0.35;
        }
    }

    function spawnShootingStar() {
        if (shootingStars.length >= maxShootingStars || document.hidden) return;

        const lineGeometry = new THREE.BufferGeometry();
        const headX = (Math.random() - 0.5) * 1600;
        const headY = Math.random() * 800 + 200;
        const headZ = (Math.random() - 0.5) * 1000;

        const tailLength = Math.random() * 120 + 80;
        const speed = Math.random() * 18 + 22;

        const points = [
            new THREE.Vector3(headX, headY, headZ),
            new THREE.Vector3(headX - tailLength, headY - tailLength * 0.7, headZ)
        ];

        lineGeometry.setFromPoints(points);

        const lineMaterial = new THREE.LineBasicMaterial({
            color: Math.random() > 0.4 ? 0xc2410c : 0xd97706,
            transparent: true,
            opacity: 0.9,
            linewidth: 2.5
        });

        const star = new THREE.Line(lineGeometry, lineMaterial);
        star.userData = {
            velocity: new THREE.Vector3(-speed, -speed * 0.7, 0),
            opacity: 0.9,
            life: 1.0,
            decay: Math.random() * 0.02 + 0.015
        };

        scene.add(star);
        shootingStars.push(star);
    }

    function updateShootingStars() {
        for (let i = shootingStars.length - 1; i >= 0; i--) {
            const star = shootingStars[i];
            star.position.add(star.userData.velocity);
            star.userData.life -= star.userData.decay;
            star.material.opacity = star.userData.life * 0.9;

            if (star.userData.life <= 0) {
                scene.remove(star);
                star.geometry.dispose();
                star.material.dispose();
                shootingStars.splice(i, 1);
            }
        }
    }

    window.toggleWarpDrive = function () {
        isWarping = !isWarping;
        const warpBtn = document.getElementById('warp-btn');
        if (warpBtn) {
            if (isWarping) {
                warpBtn.classList.add('warping');
                warpBtn.innerHTML = '<i class=\"fa-solid fa-bolt\"></i> Warp Active!';
            } else {
                warpBtn.classList.remove('warping');
                warpBtn.innerHTML = '<i class=\"fa-solid fa-shuttle-space\"></i> Engage Warp';
            }
        }
        return isWarping;
    };

    function animate() {
        requestAnimationFrame(animate);

        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        camera.position.x = targetX * 0.6;
        camera.position.y = -targetY * 0.6;
        camera.lookAt(scene.position);

        if (isWarping) {
            currentSpeed += (18 - currentSpeed) * 0.08;
            starMaterial.size = 14;
        } else {
            currentSpeed += (normalSpeed - currentSpeed) * 0.05;
            starMaterial.size = 8.5;
        }

        const positions = starGeometry.attributes.position.array;
        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;
            positions[i3 + 2] += currentSpeed;

            if (positions[i3 + 2] > 1200) {
                positions[i3 + 2] = -1600;
                positions[i3] = (Math.random() - 0.5) * 3200;
                positions[i3 + 1] = (Math.random() - 0.5) * 2600;
            }
        }
        starGeometry.attributes.position.needsUpdate = true;

        starField.rotation.y += 0.0003;
        starField.rotation.x += 0.00015;

        nebulaField.rotation.y -= 0.00018;
        nebulaField.rotation.z += 0.0001;

        updateShootingStars();

        renderer.render(scene, camera);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
