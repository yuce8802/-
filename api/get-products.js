<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VortinT | Children's Furniture & Storage</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700;900&family=Noto+Sans+SC:wght@500;900&display=swap');
        body { font-family: 'Inter', 'Noto Sans SC', sans-serif; background-color: #FAFAFA; }
        .hero-gradient { background: linear-gradient(to r, #2563eb, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .logo-shadow { filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.08)); }
    </style>
</head>
<body>

    <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 p-4">
        <div class="max-w-6xl mx-auto flex justify-between items-center">
            <img src="https://res.cloudinary.com/dpr2pn5rs/image/upload/v1775785448/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260313164434_36_18_pwgssq.jpg" 
                 class="h-16 md:h-24 w-auto logo-shadow rounded-xl transition-all">
            
            <div class="flex items-center space-x-4 md:space-x-8">
                <a href="mailto:contact@vortexd.com">
                    <img src="https://res.cloudinary.com/dpr2pn5rs/image/upload/v1775814017/%E5%9B%BE%E7%89%87_20260410173931_74_2_eddwfs.png" 
                         class="h-10 md:h-12 w-auto grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
                </a>

                <button onclick="toggleLang()" id="langBtn" class="bg-blue-600 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg">
                    EN / 中文
                </button>
            </div>
        </div>
    </nav>

    <header class="max-w-6xl mx-auto px-6 py-20 text-center md:text-left">
        <h1 class="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
            Smart Space <br><span class="hero-gradient italic">For Kids.</span>
        </h1>
        <p class="mt-8 text-xl text-gray-400 font-medium">
            <span id="sub-title-pre">专注于</span> 
            <span id="typed" class="text-black font-extrabold border-b-8 border-blue-500/20"></span>
        </p>
    </header>

    <main class="max-w-6xl mx-auto px-6 pb-24">
        <div id="loading" class="text-center py-20">
            <div class="inline-block w-8 h-8 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <div id="product-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"></div>
    </main>

    <footer class="max-w-6xl mx-auto px-6 py-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">
        <p>© 2026 VORTINT STUDIO. ALL RIGHTS RESERVED.</p>
        <div class="mt-4 md:mt-0 space-x-6">
            <a href="mailto:contact@vortexd.com" class="hover:text-blue-600">Email Us</a>
            <a href="https://ncn9cn4hfp6k.feishu.cn/base/RjAGbIVhKaRI0usUsGnc9lwPnBg" target="_blank" class="hover:text-blue-600">Admin</a>
        </div>
    </footer>

    <script>
        let currentLang = 'en';
        let allProducts = [];
        const API_URL = "/api/get-products"; 
        let typedInstance;

        const i18n = {
            zh: { pre: "专注于", typed: ['毛绒玩具收纳.', '儿童阅读空间.', '垂直弹力绳设计.'], btn: "立即查看 →" },
            en: { pre: "Focusing on", typed: ['Plush Toy Storage.', 'Reading Spaces.', 'Vertical Elastic Cords.'], btn: "Shop Now →" }
        };

        function initTyped() {
            if (typedInstance) typedInstance.destroy();
            typedInstance = new Typed('#typed', {
                strings: i18n[currentLang].typed,
                typeSpeed: 50, backSpeed: 30, loop: true
            });
        }

        async function fetchProducts() {
            try {
                const response = await fetch(API_URL);
                allProducts = await response.json();
                document.getElementById('loading').style.display = 'none';
                renderProducts();
            } catch (e) {
                document.getElementById('loading').innerHTML = `<p class="text-gray-300">Syncing data...</p>`;
            }
        }

        function renderProducts() {
            const grid = document.getElementById('product-grid');
            document.getElementById('sub-title-pre').innerText = i18n[currentLang].pre;
            
            grid.innerHTML = allProducts.map(item => {
                const p = item.fields;
                const imgUrl = Array.isArray(p.image) ? p.image[0].url : p.image;
                const displayName = (currentLang === 'en' && p.name_en) ? p.name_en : p.name;
                
                return `
                <a href="${p.link || '#'}" target="_blank" class="group bg-white rounded-[3rem] p-5 shadow-sm hover:shadow-2xl transition-all duration-500 block">
                    <div class="aspect-[4/5] overflow-hidden rounded-[2.2rem] bg-gray-50 mb-8">
                        <img src="${imgUrl}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                    </div>
                    <div class="px-4 pb-4 text-left">
                        <h3 class="text-2xl font-black text-gray-900 tracking-tight leading-tight">${displayName || 'New Collection'}</h3>
                        <p class="mt-6 text-blue-600 font-black text-[10px] uppercase tracking-widest border-b-2 border-blue-100 inline-block group-hover:border-blue-600 transition-all">${i18n[currentLang].btn}</p>
                    </div>
                </a>`;
            }).join('');
        }

        function toggleLang() {
            currentLang = currentLang === 'en' ? 'zh' : 'en';
            renderProducts();
            initTyped();
            localStorage.setItem('vortint_lang', currentLang);
        }

        window.onload = () => {
            const savedLang = localStorage.getItem('vortint_lang');
            if (savedLang) currentLang = savedLang;
            initTyped();
            fetchProducts();
        };
    </script>
</body>
</html>
