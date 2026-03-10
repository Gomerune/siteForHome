// Listings Database Manager
class ListingsManager {
    constructor() {
        this.listings = [];
        this.loaded = false;
        this.useAPI = false;
        
        // Встроенные данные (для работы без сервера)
        this.builtinData = [
            {
                "id": 1,
                "title": "2-к квартира, 64 м²",
                "type": "flat",
                "price": 8500000,
                "address": "Челябинск, пр. Ленина, 45",
                "bedrooms": 2,
                "area": 64,
                "floor": "5/12",
                "badge": "В работе",
                "description": "Просторная двухкомнатная квартира в центре города. Развитая инфраструктура, рядом школы, детские сады, торговые центры. Квартира с ремонтом, готова к заселению.",
                "features": ["Кондиционер", "Балкон", "Парковка", "Лифт"],
                "images": [
                    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&auto=format&fit=crop"
                ]
            },
            {
                "id": 2,
                "title": "Дом с участком, 120 м²",
                "type": "house",
                "price": 12300000,
                "address": "Челябинская обл., пос. Рощино",
                "bedrooms": 4,
                "area": 120,
                "land": 6,
                "badge": "Срочно",
                "description": "Загородный дом с земельным участком в экологически чистом районе. Дом построен из кирпича, есть гараж и баня. Отличное место для семейного отдыха.",
                "features": ["Гараж", "Баня", "Сад", "Газ"],
                "images": [
                    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&auto=format&fit=crop"
                ]
            },
            {
                "id": 3,
                "title": "Студия, 32 м²",
                "type": "flat",
                "price": 4200000,
                "address": "Челябинск, ул. Кирова, 88",
                "bedrooms": 1,
                "area": 32,
                "floor": "8/16",
                "badge": "Новинка",
                "description": "Современная студия в новом жилом комплексе. Панорамные окна, дизайнерский ремонт. Идеально для молодёжи или под сдачу.",
                "features": ["Панорамные окна", "Дизайнерский ремонт", "Консьерж", "Спортзал"],
                "images": [
                    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop"
                ]
            },
            {
                "id": 4,
                "title": "3-к квартира, 98 м²",
                "type": "flat",
                "price": 15800000,
                "address": "Челябинск, ул. Вайнера, 12",
                "bedrooms": 3,
                "area": 98,
                "floor": "10/24",
                "badge": "В работе",
                "description": "Роскошная трёхкомнатная квартира в престижном районе. Вид на город, премиальный ремонт, закрытый двор. Все удобства для комфортной жизни.",
                "features": ["Вид на город", "Премиум ремонт", "Закрытый двор", "Подземный паркинг"],
                "images": [
                    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800&auto=format&fit=crop"
                ]
            },
            {
                "id": 5,
                "title": "Гараж, 24 м²",
                "type": "garage",
                "price": 850000,
                "address": "Челябинск, ГСК «Автолюбитель»",
                "area": 24,
                "badge": "Продано",
                "description": "Капитальный гараж в охраняемом кооперативе. Есть смотровая яма, электричество. Удобный подъезд.",
                "features": ["Свет", "Яма", "Охрана", "Ворота"],
                "images": []
            },
            {
                "id": 6,
                "title": "Помещение, 150 м²",
                "type": "commercial",
                "price": 25000000,
                "address": "Челябинск, пр. Комсомольский, 28",
                "area": 150,
                "floor": "1",
                "badge": "В работе",
                "description": "Коммерческое помещение на первой линии. Высокий пешеходный трафик, отдельный вход, витринные окна. Подходит под офис, магазин, салон.",
                "features": ["Первая линия", "Витринные окна", "Отдельный вход", "Парковка"],
                "images": [
                    "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop"
                ]
            },
            {
                "id": 7,
                "title": "1-к квартира, 42 м²",
                "type": "flat",
                "price": 5900000,
                "address": "Челябинск, ул. Труда, 156",
                "bedrooms": 1,
                "area": 42,
                "floor": "7/18",
                "badge": "В работе",
                "description": "Уютная однокомнатная квартира в современном доме. Рядом метро, торговые центры, парки. Отличный вариант для жизни или инвестиций.",
                "features": ["Метро рядом", "ТЦ рядом", "Парк", "Детская площадка"],
                "images": [
                    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?w=800&auto=format&fit=crop"
                ]
            },
            {
                "id": 8,
                "title": "Коттедж, 250 м²",
                "type": "house",
                "price": 28500000,
                "address": "Челябинская обл., пос. Кременкуль",
                "bedrooms": 5,
                "area": 250,
                "land": 12,
                "badge": "Эксклюзив",
                "description": "Роскошный коттедж в элитном посёлке. Авторский проект, качественные материалы, ландшафтный дизайн. Бассейн, сауна, гараж на 2 авто.",
                "features": ["Бассейн", "Сауна", "Гараж на 2 авто", "Ландшафт"],
                "images": [
                    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop"
                ]
            }
        ];
    }

    async load() {
        if (this.useAPI) {
            try {
                const response = await fetch('http://localhost:5000/api/listings');
                const data = await response.json();
                this.listings = data;
                this.loaded = true;
                console.log('Данные загружены из API');
                return this.listings;
            } catch (error) {
                console.log('API недоступно, используем встроенные данные');
                this.useAPI = false;
            }
        }
        
        this.listings = this.builtinData;
        this.loaded = true;
        return this.listings;
    }

    getAll() {
        return this.listings;
    }

    async getByType(type) {
        if (this.useAPI) {
            try {
                const response = await fetch(`http://localhost:5000/api/listings/type/${type}`);
                return await response.json();
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            }
        }
        
        if (type === 'all') return this.listings;
        return this.listings.filter(l => l.type === type);
    }

    getById(id) {
        return this.listings.find(l => l.id === parseInt(id));
    }

    getFeatured(limit = 3) {
        return this.listings.filter(l => l.badge !== 'Продано').slice(0, limit);
    }

    formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    getIconByType(type) {
        const icons = {
            flat: 'fa-building',
            house: 'fa-house',
            garage: 'fa-warehouse',
            commercial: 'fa-store'
        };
        return icons[type] || 'fa-building';
    }
}

// Global instance
const listingsDB = new ListingsManager();

// Modal Manager
class ModalManager {
    constructor() {
        this.currentListing = null;
        this.currentImageIndex = 0;
        this.isOpen = false;
        this.init();
    }

    init() {
        const modalHTML = `
            <div id="propertyModal" class="fixed inset-0 z-[100] hidden">
                <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" id="modalOverlay"></div>
                <div class="absolute inset-0 flex items-center justify-center p-4 z-10 pointer-events-none">
                    <div class="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto my-8 scrollbar-hide pointer-events-auto" id="modalCard">
                        <div id="modalContent"></div>
                    </div>
                </div>
            </div>
        `;

        $('body').append(modalHTML);

        const self = this;
        
        // Close when clicking on overlay (anywhere outside card)
        $('#modalOverlay').on('click', function() {
            self.close();
        });
        
        // Close on escape
        $(document).on('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    open(listing) {
        if (!listing) return;
        if (this.isOpen) return;

        this.currentListing = listing;
        this.currentImageIndex = 0;
        this.isOpen = true;
        const images = listing.images && listing.images.length > 0 ? listing.images : [];

        let sliderHTML = '';
        if (images.length > 0) {
            sliderHTML = `
                <div class="relative mb-6">
                    <div class="overflow-hidden rounded-2xl" style="height: 400px;">
                        <div class="flex transition-transform duration-500 ease-out h-full" id="modalSlider">
                            ${images.map((img, i) => `
                                <div class="w-full flex-shrink-0 h-full">
                                    <img src="${img}" alt="${listing.title}" class="w-full h-full object-cover">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ${images.length > 1 ? `
                        <button class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-accentOrange hover:text-white transition-colors" id="sliderPrev">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <button class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-accentOrange hover:text-white transition-colors" id="sliderNext">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    ` : ''}
                    ${images.length > 1 ? `
                        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2" id="sliderDots">
                            ${images.map((_, i) => `
                                <button class="w-2 h-2 rounded-full transition-all ${i === 0 ? 'bg-white w-6' : 'bg-white/50'}" data-index="${i}"></button>
                            `).join('')}
                        </div>
                    ` : ''}
                    ${images.length > 1 ? `
                        <div class="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                            <span id="imageCounter">1 / ${images.length}</span>
                        </div>
                    ` : ''}
                </div>
            `;
        } else {
            sliderHTML = `
                <div class="bg-gradient-to-br from-deepBlue to-softBlue h-80 rounded-2xl flex items-center justify-center mb-6">
                    <i class="fas ${listingsDB.getIconByType(listing.type)} text-8xl text-white/30"></i>
                </div>
            `;
        }

        let featuresHTML = '';
        if (listing.features && listing.features.length > 0) {
            featuresHTML = `
                <div class="mb-6">
                    <h4 class="font-bold text-deepBlue mb-3"><i class="fas fa-check-circle text-accentOrange mr-2"></i>Особенности</h4>
                    <div class="flex flex-wrap gap-2">
                        ${listing.features.map(f => `<span class="bg-lightBeige px-3 py-2 rounded-lg text-sm text-softBlue">${f}</span>`).join('')}
                    </div>
                </div>
            `;
        }

        let specsHTML = '';
        const specs = [];
        if (listing.bedrooms) specs.push(`<div class="flex items-center gap-2"><i class="fas fa-bed text-accentOrange"></i><div><div class="font-bold text-deepBlue">${listing.bedrooms}</div><div class="text-xs text-gray-500">спальн</div></div></div>`);
        if (listing.area) specs.push(`<div class="flex items-center gap-2"><i class="fas fa-ruler-combined text-accentOrange"></i><div><div class="font-bold text-deepBlue">${listing.area} м²</div><div class="text-xs text-gray-500">площадь</div></div></div>`);
        if (listing.floor) specs.push(`<div class="flex items-center gap-2"><i class="fas fa-layer-group text-accentOrange"></i><div><div class="font-bold text-deepBlue">${listing.floor}</div><div class="text-xs text-gray-500">этаж</div></div></div>`);
        if (listing.land) specs.push(`<div class="flex items-center gap-2"><i class="fas fa-tree text-accentOrange"></i><div><div class="font-bold text-deepBlue">${listing.land} сот.</div><div class="text-xs text-gray-500">участок</div></div></div>`);
        
        if (specs.length > 0) {
            specsHTML = `
                <div class="flex flex-wrap gap-6 mb-6 pb-6 border-b border-gray-100">
                    ${specs.join('')}
                </div>
            `;
        }

        const contentHTML = `
            <div class="p-8">
                ${sliderHTML}
                <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div class="flex-1">
                        <h2 class="text-3xl font-bold text-deepBlue mb-2">${listing.title}</h2>
                        <p class="text-softBlue">
                            <i class="fas fa-location-dot text-accentOrange mr-2"></i>${listing.address}
                        </p>
                    </div>
                    <div class="text-right">
                        <div class="text-3xl font-bold text-accentOrange">${listingsDB.formatPrice(listing.price)} ₽</div>
                        ${listing.badge ? `<span class="inline-block bg-accentOrange text-white px-3 py-1 rounded-full text-sm font-medium mt-2">${listing.badge}</span>` : ''}
                    </div>
                </div>
                ${specsHTML}
                <div class="mb-6">
                    <h4 class="font-bold text-deepBlue mb-3"><i class="fas fa-info-circle text-accentOrange mr-2"></i>Описание</h4>
                    <p class="text-gray-600 leading-relaxed">${listing.description}</p>
                </div>
                ${featuresHTML}
                <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                    <a href="tel:+79080604560" class="btn-accent flex-1 py-3 rounded-xl font-semibold text-center text-lg">
                        <i class="fas fa-phone mr-2"></i>Позвонить
                    </a>
                    <a href="https://vk.com/id763965660" target="_blank" class="btn-outline-accent flex-1 py-3 rounded-xl font-semibold text-center text-lg">
                        <i class="fab fa-vk mr-2"></i>Написать ВКонтакте
                    </a>
                </div>
            </div>
        `;

        $('#modalContent').html(contentHTML);
        
        $('#propertyModal').removeClass('hidden');
        
        // Reset scroll position - use setTimeout to ensure DOM is ready
        setTimeout(() => {
            const modalCard = document.getElementById('modalCard');
            if (modalCard) {
                modalCard.scrollTop = 0;
            }
        }, 0);
        
        // Anime.js animation for opening
        if (typeof anime !== 'undefined') {
            anime({
                targets: '#modalOverlay',
                opacity: [0, 1],
                duration: 300,
                easing: 'easeOutQuad'
            });
            anime({
                targets: '#modalCard',
                scale: [0.9, 1],
                opacity: [0, 1],
                duration: 300,
                easing: 'easeOutQuad'
            });
        }
        
        $('body').css('overflow', 'hidden');

        // Initialize slider events
        this.initSliderEvents();
        this.updateSlider();
    }

    initSliderEvents() {
        $('#sliderPrev').off('click').on('click', () => this.prevImage());
        $('#sliderNext').off('click').on('click', () => this.nextImage());
        $('#sliderDots button').off('click').on('click', (e) => {
            const index = $(e.currentTarget).data('index');
            this.goToImage(index);
        });
    }

    updateSlider() {
        const slider = $('#modalSlider');
        const dots = $('#sliderDots button');
        const counter = $('#imageCounter');
        
        if (slider.length) {
            slider.css('transform', `translateX(-${this.currentImageIndex * 100}%)`);
        }
        
        dots.each((i, dot) => {
            const $dot = $(dot);
            $dot.toggleClass('bg-white', i === this.currentImageIndex);
            $dot.toggleClass('bg-white/50', i !== this.currentImageIndex);
            $dot.toggleClass('w-6', i === this.currentImageIndex);
            $dot.toggleClass('w-2', i !== this.currentImageIndex);
        });
        
        if (counter.length && this.currentListing.images) {
            counter.text(`${this.currentImageIndex + 1} / ${this.currentListing.images.length}`);
        }
    }

    nextImage() {
        if (!this.currentListing || !this.currentListing.images) return;
        this.currentImageIndex = (this.currentImageIndex + 1) % this.currentListing.images.length;
        this.updateSlider();
    }

    prevImage() {
        if (!this.currentListing || !this.currentListing.images) return;
        this.currentImageIndex = (this.currentImageIndex - 1 + this.currentListing.images.length) % this.currentListing.images.length;
        this.updateSlider();
    }

    goToImage(index) {
        this.currentImageIndex = index;
        this.updateSlider();
    }

    close() {
        if (!this.isOpen) return;
        
        // Anime.js animation for closing
        if (typeof anime !== 'undefined') {
            anime({
                targets: '#modalOverlay',
                opacity: 0,
                duration: 200,
                easing: 'easeInQuad'
            });
            anime({
                targets: '#modalCard',
                scale: 0.9,
                opacity: 0,
                duration: 200,
                easing: 'easeInQuad',
                complete: () => {
                    $('#propertyModal').addClass('hidden');
                }
            });
        } else {
            $('#propertyModal').addClass('hidden');
        }
        
        $('body').css('overflow', '');
        this.isOpen = false;
    }
}

// Global instance
const modal = new ModalManager();

// Render functions
function renderListingCard(listing, delay = 0) {
    const hasImages = listing.images && listing.images.length > 0;
    const iconClass = listingsDB.getIconByType(listing.type);
    
    return `
        <div class="listing-card bg-lightBeige rounded-2xl overflow-hidden shadow-lg card-hover" 
             data-aos="fade-up" 
             data-aos-delay="${delay}"
             data-category="${listing.type}">
            <div class="relative h-56 bg-gray-200 cursor-pointer" onclick="openPropertyModal(${listing.id})">
                ${hasImages 
                    ? `<img src="${listing.images[0]}" alt="${listing.title}" class="w-full h-full object-cover" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                       <div class="listing-placeholder absolute inset-0 hidden" style="display:none">
                           <i class="fas ${iconClass} text-6xl text-white/50"></i>
                       </div>`
                    : `<div class="listing-placeholder absolute inset-0">
                           <i class="fas ${iconClass} text-6xl text-white/50"></i>
                       </div>`
                }
                ${listing.badge ? `<span class="listing-badge">${listing.badge}</span>` : ''}
                <div class="absolute bottom-4 right-4 price-tag">
                    ${listingsDB.formatPrice(listing.price)} ₽
                </div>
            </div>
            <div class="card-content p-6">
                <h3 class="font-bold text-xl text-deepBlue mb-2">${listing.title}</h3>
                <p class="text-gray-600 text-sm mb-4">
                    <i class="fas fa-location-dot text-accentOrange mr-2"></i>
                    ${listing.address}
                </p>
                <div class="flex items-center gap-4 text-sm text-softBlue mb-4">
                    ${listing.bedrooms ? `<span><i class="fas fa-bed mr-1"></i> ${listing.bedrooms} спальн${listing.bedrooms === 1 ? 'я' : (listing.bedrooms < 5 ? 'и' : '')}</span>` : ''}
                    ${listing.area ? `<span><i class="fas fa-ruler-combined mr-1"></i> ${listing.area} м²</span>` : ''}
                    ${listing.floor ? `<span><i class="fas fa-layer-group mr-1"></i> ${listing.floor}</span>` : ''}
                    ${listing.land ? `<span><i class="fas fa-tree mr-1"></i> ${listing.land} сот.</span>` : ''}
                </div>
                <div class="card-footer flex gap-3">
                    <button onclick="openPropertyModal(${listing.id})" class="btn-accent flex-1 py-2 rounded-lg font-medium text-center text-sm">
                        <i class="fas fa-eye mr-1"></i> Подробнее
                    </button>
                    <a href="https://vk.com/id763965660" target="_blank" class="btn-outline-accent py-2 px-4 rounded-lg font-medium text-sm">
                        <i class="fab fa-vk"></i>
                    </a>
                </div>
            </div>
        </div>
    `;
}

function renderListings(containerId, listings, startDelay = 0) {
    const $container = $('#' + containerId);
    if (!$container.length) return;
    
    $container.html(listings.map((l, i) => renderListingCard(l, startDelay + i * 100)).join(''));
}

function openPropertyModal(id) {
    const listing = listingsDB.getById(id);
    if (listing) {
        modal.open(listing);
    }
}

// Filter functionality for listings page
async function initFilters() {
    const $filterBtns = $('.filter-btn');
    const $listingsGrid = $('#listingsGrid');
    const $noResults = $('#noResults');
    
    if (!$listingsGrid.length) return;
    
    $filterBtns.on('click', async function() {
        $filterBtns.removeClass('active');
        $(this).addClass('active');
        
        const filter = $(this).data('filter');
        const filtered = await listingsDB.getByType(filter);
        
        if (filtered.length === 0) {
            $listingsGrid.html('');
            $noResults.removeClass('hidden');
        } else {
            $noResults.addClass('hidden');
            $listingsGrid.html(filtered.map((l, i) => renderListingCard(l, i * 100)).join(''));
            if (typeof AOS !== 'undefined') {
                setTimeout(() => AOS.refresh(), 100);
            }
        }
    });
}

// Initialize on page load
$(document).ready(async function() {
    await listingsDB.load();
    
    // Render featured listings on homepage
    const $featuredContainer = $('#featuredListings');
    if ($featuredContainer.length) {
        const featured = listingsDB.getFeatured(3);
        $featuredContainer.html(featured.map((l, i) => renderListingCard(l, i * 100)).join(''));
    }
    
    // Render all listings on listings page
    const $allListingsContainer = $('#listingsGrid');
    if ($allListingsContainer.length) {
        const all = listingsDB.getAll();
        $allListingsContainer.html(all.map((l, i) => renderListingCard(l, i * 100)).join(''));
        initFilters();
    }
    
    // Reinitialize AOS after rendering
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
});
