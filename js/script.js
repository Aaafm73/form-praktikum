const labs = {
    komputer: 'Laboratorium Komputer',
    peternakan: 'Laboratorium Peternakan',
    perkebunan: 'Laboratorium Perkebunan'
};

const tools = [
    { id: 'KOM-001', name: 'Komputer Desktop', category: 'komputer', description: 'Unit komputer untuk praktikum aplikasi dan pemrograman.' },
    { id: 'KOM-002', name: 'Monitor', category: 'komputer', description: 'Monitor untuk menampilkan display Komputer Desktop.' },
    { id: 'KOM-003', name: 'Mouse', category: 'komputer', description: 'mouse gaming'},
    { id: 'KOM-004', name: 'Keyboard', category: 'komputer', description: 'Keaboard memrban tidak gaming'},
    { id: 'KOM-003', name: 'Proyektor', category: 'komputer', description: 'Proyektor untuk menampilkan materi pembelajaran.' },
    { id: 'KOM-004', name: 'Layar Proyektor', category: 'komputer', description: 'Platform untuk menampilkan display dari proyektor.' },
    { id: 'KOM-005', name: 'Router Jaringan', category: 'komputer', description: 'Perangkat untuk praktikum jaringan komputer.' },
    { id: 'KOM-006', name: 'Printer', category: 'komputer', description: 'Printer untuk praktikum pencetakan dokumen.' },
    { id: 'KOM-007', name: 'Terminal Colokan', category: 'komputer', description: '-.'},
    { id: 'KOM-008', name: 'Kipas Angin', category: 'komputer', description: 'Kipas angin Cosmos Wadesta.'},
    { id: 'KOM-009', name: 'Meja Komputer', category: 'kompter', description: 'Meja untuk setup komputer.'},
    { id: 'KOM-010', name: 'Meja Dosen', category: 'komputer', description: 'Meja dosen lab komputer.'},
    { id: 'KOM-011', name: 'Kursi Lab', category: 'komputer', description: 'Kursi lab komputer.'},
    { id: 'TER-001', name: 'Timbangan Ternak', category: 'peternakan', description: 'Mengukur bobot ternak dalam kegiatan praktikum.' },
    { id: 'TER-002', name: 'Termometer Digital', category: 'peternakan', description: 'Mengukur suhu tubuh hewan secara digital.' },
    { id: 'TER-003', name: 'Inkubator Telur', category: 'peternakan', description: 'Peralatan penetasan telur untuk praktikum.' },
    { id: 'TER-004', name: 'Kandang Portable', category: 'peternakan', description: 'Kandang portabel untuk pengamatan dan penanganan ternak.' },
    { id: 'TER-005', name: 'Alat Pemerah Susu', category: 'peternakan', description: 'Peralatan praktik pemerahan susu.' },
    { id: 'KEB-001', name: 'Cangkul', category: 'perkebunan', description: 'Mengolah tanah dan membuat bedengan.' },
    { id: 'KEB-002', name: 'Sekop Tanaman', category: 'perkebunan', description: 'Memindahkan media tanam dan bibit.' },
    { id: 'KEB-003', name: 'Gunting Pangkas', category: 'perkebunan', description: 'Memangkas ranting dan bagian tanaman.' },
    { id: 'KEB-004', name: 'Sprayer', category: 'perkebunan', description: 'Menyemprotkan air atau larutan perawatan tanaman.' },
    { id: 'KEB-005', name: 'Alat Ukur pH Tanah', category: 'perkebunan', description: 'Memeriksa tingkat keasaman media tanam.' }
];

const navbar = document.querySelector('.navbar-nav');
const menuButton = document.querySelector('#hamburger-menu');
const searchToggle = document.querySelector('#search-toggle');
const searchForm = document.querySelector('#navbar-search-form');
const searchInput = document.querySelector('#navbar-search-input');

if (window.feather) {
    window.feather.replace();
}

if (navbar && menuButton) {
    menuButton.addEventListener('click', (event) => {
        const isOpen = navbar.classList.toggle('active');
        menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (event) => {
        if (!menuButton.contains(event.target) && !navbar.contains(event.target)) {
            navbar.classList.remove('active');
            menuButton.setAttribute('aria-expanded', 'false');
        }
    });
}

if (searchToggle && searchForm && searchInput) {
    searchToggle.addEventListener('click', () => {
        const isOpen = searchForm.hidden;
        searchForm.hidden = !isOpen;
        searchToggle.setAttribute('aria-expanded', String(isOpen));

        if (isOpen) searchInput.focus();
    });
}

const catalogGrid = document.querySelector('#catalog-grid');

if (catalogGrid) {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('kategori');
    const query = (params.get('q') || '').trim().toLocaleLowerCase('id');
    const filteredTools = tools.filter((tool) => {
        const matchesCategory = !category || tool.category === category;
        const searchableText = `${tool.id} ${tool.name} ${tool.description} ${labs[tool.category]}`.toLocaleLowerCase('id');
        return matchesCategory && (!query || searchableText.includes(query));
    });
    const title = document.querySelector('#catalog-title');
    const description = document.querySelector('#catalog-description');
    if (searchInput) searchInput.value = params.get('q') || '';

    if (category && labs[category]) {
        title.textContent = `Alat ${labs[category]}`;
        description.textContent = query
            ? `Hasil pencarian "${params.get('q').trim()}" di ${labs[category]}.`
            : `Daftar alat yang tersedia di ${labs[category]}.`;
    } else if (query) {
        title.textContent = 'Hasil Pencarian';
        description.textContent = `Hasil untuk "${params.get('q').trim()}".`;
    } else {
        title.textContent = 'Semua Alat';
        description.textContent = 'Pilih alat berdasarkan ID dan laboratorium, lalu tekan Pinjam untuk mengisi formulir.';
    }

    if (filteredTools.length === 0) {
        catalogGrid.innerHTML = '<p class="catalog-empty">Tidak ada alat yang cocok dengan pencarian atau kategori tersebut.</p>';
    } else {
        catalogGrid.innerHTML = filteredTools.map((tool) => `
            <article class="tool-card">
                <div class="tool-card-topline">
                    <span class="tool-id">ID ${tool.id}</span>
                    <span class="tool-category">${labs[tool.category]}</span>
                </div>
                <h2>${tool.name}</h2>
                <p>${tool.description}</p>
                <a class="button button-primary" href="pinjam.html?alat=${encodeURIComponent(tool.id)}">Pinjam alat</a>
            </article>
        `).join('');
    }
}

const borrowForm = document.querySelector('#borrow-form');

if (borrowForm) {
    const selectedId = new URLSearchParams(window.location.search).get('alat');
    const selectedTool = tools.find((tool) => tool.id === selectedId);
    const toolIdInput = document.querySelector('#alat-id');
    const toolNameInput = document.querySelector('#alat-nama');
    const dateInput = document.querySelector('#tanggal');
    const status = document.querySelector('#form-status');
    const submitButton = borrowForm.querySelector('[type="submit"]');
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    dateInput.value = today;

    if (selectedTool) {
        toolIdInput.value = selectedTool.id;
        toolNameInput.value = `${selectedTool.name} (${selectedTool.id})`;
    } else {
        toolNameInput.value = 'Pilih alat melalui katalog terlebih dahulu';
        status.textContent = 'Alat tidak ditemukan. Kembali ke katalog untuk memilih alat.';
        submitButton.disabled = true;
    }

    borrowForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!borrowForm.reportValidity()) return;
        status.textContent = 'Form sudah lengkap. Permintaan Peminjaman sedang diproses...';
        // Pengiriman permintaan memerlukan koneksi ke server. nanti dibuat kapan-kapan kalo lagi mood
    });
}