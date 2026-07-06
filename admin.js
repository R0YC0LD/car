/* ==========================================================================
   ÇAĞRI NOBLE RENT A CAR - ADMIN LOGIC ENGINE (admin.js)
   Features: Separate Admin Page, Password Gate Session, Vehicle CRUD,
   Testimonials Control, FAQ Management, POS Configurations.
   ========================================================================== */
// Admin Password Credentials
const ADMIN_PASSWORD_PRIMARY = "05admıncagrıamasyarentacar";
const ADMIN_PASSWORD_ASCII = "05admincagriamasyarentacar";

const INITIAL_POS_CONFIG = {
  provider: 'PayTR',
  merchantId: '123456',
  apiKey: 'paytr_live_key_984128941',
  secretKey: 'paytr_secret_key_841294812',
  is3DSecure: true,
  isTestMode: true
};
// NOTE: All vehicle, FAQ and testimonial data is managed exclusively via
// Firestore. Use the Admin Panel to add or edit data.

// Global Admin States
let vehicles = [];
let faqs = [];
let testimonials = [];
let reservations = [];
let posConfig = INITIAL_POS_CONFIG;
let customAdminPassword = ADMIN_PASSWORD_PRIMARY;
let isDbLoading = true;

let isAdminLoggedIn = sessionStorage.getItem('cagri_admin_logged_in') === 'true';
let editingCarId = null;
let editingFaqId = null;
let tempCarImages = [];

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
  updateUIForLoginState();
  initFormInputsFromPOSConfig();

  // Firebase module is type="module" (async) — wait for it to be ready
  function onFirebaseReady() {
    initRealtimeSync();
  }

  if (window.db && window.firestoreTools) {
    onFirebaseReady();
  } else {
    window.addEventListener('firebaseReady', onFirebaseReady, { once: true });
    // Safety timeout
    setTimeout(() => {
      if (!window.db) {
        console.warn('Firebase could not be initialized in Admin Panel.');
        isDbLoading = false;
        renderAdminTable();
      }
    }, 8000);
  }
});


// Toast System
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: 'ri-checkbox-circle-fill text-emerald-400',
    warning: 'ri-error-warning-fill text-amber-400',
    error: 'ri-close-circle-fill text-red-400',
    info: 'ri-information-fill text-amber-300'
  };

  const toast = document.createElement('div');
  toast.className = `toast-message ${type}`;
  toast.innerHTML = `
    <i class="${icons[type] || icons.info} text-xl"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 50);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// Password Gate Controls
function togglePassVisibility() {
  const input = document.getElementById('admin-pass-input');
  const icon = document.getElementById('pass-eye-icon');
  if (input && icon) {
    if (input.type === 'password') {
      input.type = 'text';
      icon.className = 'ri-eye-off-line text-lg';
    } else {
      input.type = 'password';
      icon.className = 'ri-eye-line text-lg';
    }
  }
}

function processAdminLogin() {
  const passInput = document.getElementById('admin-pass-input');
  if (!passInput) return;

  const enteredPass = passInput.value.trim();

  if (enteredPass === customAdminPassword || enteredPass === ADMIN_PASSWORD_PRIMARY || enteredPass === ADMIN_PASSWORD_ASCII) {
    isAdminLoggedIn = true;
    sessionStorage.setItem('cagri_admin_logged_in', 'true');
    showToast('Giriş Başarılı! Yönetici Paneline Hoş Geldiniz.', 'success');
    updateUIForLoginState();
  } else {
    showToast('Hatalı şifre! Lütfen şifrenizi tekrar kontrol edin.', 'error');
  }
}

function adminLogout() {
  isAdminLoggedIn = false;
  sessionStorage.removeItem('cagri_admin_logged_in');
  showToast('Yönetici oturumu kapatıldı.', 'info');
  updateUIForLoginState();
}

function updateUIForLoginState() {
  const loginSec = document.getElementById('admin-login-sec');
  const mainSec = document.getElementById('admin-main-sec');
  const logoutBtn = document.getElementById('admin-logout-btn');

  if (isAdminLoggedIn) {
    if (loginSec) loginSec.classList.add('hidden');
    if (mainSec) mainSec.classList.remove('hidden');
    if (logoutBtn) logoutBtn.classList.remove('hidden');
    renderAdminTable();
    updateStatsCount();
  } else {
    if (loginSec) loginSec.classList.remove('hidden');
    if (mainSec) mainSec.classList.add('hidden');
    if (logoutBtn) logoutBtn.classList.add('hidden');
  }
}

// Stats counter
function updateStatsCount() {
  const fleetCountElem = document.getElementById('stat-fleet-count');
  const testimCountElem = document.getElementById('stat-testim-count');
  const faqCountElem = document.getElementById('stat-faq-count');

  if (fleetCountElem) fleetCountElem.textContent = `${vehicles.length} Araç`;
  if (testimCountElem) testimCountElem.textContent = `${testimonials.length} Kayıt`;
  if (faqCountElem) faqCountElem.textContent = `${faqs.length} Soru`;
}

// Save Local Storage State
function saveState() {
  // Database caching to local storage is disabled to ensure 100% real-time Firestore sync
}

// Tabs Switcher
function switchAdminTab(target) {
  document.querySelectorAll('.admin-nav-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.admin-sec-view').forEach(s => s.classList.add('hidden'));

  const btn = document.getElementById(`tab-btn-${target}`);
  const sec = document.getElementById(`admin-sec-${target}`);

  if (btn) btn.classList.add('active');
  if (sec) sec.classList.remove('hidden');
}

// Close Modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

// Render Admin Tables
function renderAdminTable() {
  if (isDbLoading) {
    const loadingHtml = `<tr><td colspan="7" class="text-center py-6 text-gray-400"><div class="inline-block w-6 h-6 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin"></div> Veritabanına bağlanılıyor...</td></tr>`;
    const fleetTbody = document.getElementById('admin-fleet-table-body');
    const testimTbody = document.getElementById('admin-testimonials-table-body');
    const faqTbody = document.getElementById('admin-faq-table-body');
    const resTbody = document.getElementById('admin-res-table-body');
    if (fleetTbody) fleetTbody.innerHTML = loadingHtml;
    if (testimTbody) testimTbody.innerHTML = loadingHtml;
    if (faqTbody) faqTbody.innerHTML = loadingHtml;
    if (resTbody) resTbody.innerHTML = loadingHtml;
    return;
  }

  // 1. Fleet
  const fleetTbody = document.getElementById('admin-fleet-table-body');
  if (fleetTbody) {
    fleetTbody.innerHTML = vehicles.map(car => `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 16px;">
            <img src="${car.image}" style="width: 80px; height: 50px; object-fit: cover; border-radius: 10px;">
            <div>
              <strong style="font-size: 0.95rem;">${car.brand} ${car.model}</strong>
              <p style="font-size: 0.7rem; color: #64748B;">${car.year} • Plaka: ${car.plate || '34 CGR XXX'}</p>
            </div>
          </div>
        </td>
        <td style="text-align: center; font-weight: 800; color: var(--noble-gold);">₺${car.price.toLocaleString('tr-TR')}</td>
        <td style="text-align: center; font-weight: 700; color: #64748B;">₺${car.deposit.toLocaleString('tr-TR')}</td>
        <td style="text-align: center;">
          <select onchange="changeVehicleStatusDirect('${car.id}', this.value)" style="padding: 4px 8px; border-radius: 8px; font-size: 0.75rem; font-weight: 800;">
            <option value="Müsait" ${car.status === 'Müsait' ? 'selected' : ''}>Müsait</option>
            <option value="Kirada" ${car.status === 'Kirada' ? 'selected' : ''}>Kirada</option>
            <option value="Bakımda" ${car.status === 'Bakımda' ? 'selected' : ''}>Bakımda</option>
          </select>
        </td>
        <td style="text-align: right;">
          <button onclick="openEditCarModal('${car.id}')" class="btn-noble-outline" style="padding: 6px 12px; font-size: 0.65rem;">Düzenle</button>
          <button onclick="deleteCar('${car.id}')" class="btn-noble-outline" style="padding: 6px 12px; font-size: 0.65rem; color: #EF4444; border-color: rgba(239,68,68,0.2);">Sil</button>
        </td>
      </tr>
    `).join('');
  }

  // 2. Testimonials
  const testimTbody = document.getElementById('admin-testimonials-table-body');
  if (testimTbody) {
    testimTbody.innerHTML = testimonials.map(rev => `
      <tr>
        <td>
          <strong style="font-size: 0.9rem;">${rev.authorName}</strong>
          <p style="font-size: 0.7rem; color: #64748B;">${rev.authorEmail}</p>
          ${rev.isEmailVerified ? `
            <span style="font-size: 0.6rem; font-weight: 800; color: #10B981; background: #ECFDF5; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-top: 2px;">
              ✓ E-POSTA DOĞRULANDI
            </span>
          ` : ''}
        </td>
        <td style="text-align: center; font-weight: 800; color: var(--noble-gold);">${rev.rating} / 5 ⭐</td>
        <td style="max-width: 300px; font-size: 0.75rem; color: #475569;">"${rev.content}"</td>
        <td style="text-align: center;">
          <span class="badge-status ${rev.status === 'Yayında' ? 'available' : 'maintenance'}">
            ${rev.status}
          </span>
        </td>
        <td style="text-align: right; white-space: nowrap;">
          <button onclick="toggleTestimonialVisibility('${rev.id}')" class="btn-noble-outline" style="padding: 6px 12px; font-size: 0.65rem;">
            ${rev.status === 'Yayında' ? '<i class="ri-eye-off-line mr-1"></i> Gizle' : '<i class="ri-eye-line mr-1"></i> Yayınla'}
          </button>
          <button onclick="deleteTestimonial('${rev.id}')" class="btn-noble-outline" style="padding: 6px 12px; font-size: 0.65rem; color: #EF4444; border-color: rgba(239,68,68,0.2);">
            <i class="ri-delete-bin-line"></i> Sil
          </button>
        </td>
      </tr>
    `).join('');
  }

  // 3. FAQ
  const faqTbody = document.getElementById('admin-faq-table-body');
  if (faqTbody) {
    faqTbody.innerHTML = faqs.map(faq => `
      <tr>
        <td>
          <strong style="font-size: 0.9rem;">${faq.q_tr}</strong>
          <p style="font-size: 0.7rem; color: #64748B; font-style: italic;">${faq.q_en}</p>
        </td>
        <td style="max-width: 320px; font-size: 0.75rem; color: #475569;">${faq.a_tr.substring(0, 80)}...</td>
        <td style="text-align: right; white-space: nowrap;">
          <button onclick="openEditFAQModal('${faq.id}')" class="btn-noble-outline" style="padding: 6px 12px; font-size: 0.65rem;">Düzenle</button>
          <button onclick="deleteFAQ('${faq.id}')" class="btn-noble-outline" style="padding: 6px 12px; font-size: 0.65rem; color: #EF4444; border-color: rgba(239,68,68,0.2);">Sil</button>
        </td>
      </tr>
    `).join('');
  }

  // 4. Reservations
  const resTbody = document.getElementById('admin-res-table-body');
  if (resTbody) {
    if (reservations.length === 0) {
      resTbody.innerHTML = `<tr><td colspan="7" class="text-center py-6 text-gray-400">Kayıtlı rezervasyon bulunmamaktadır.</td></tr>`;
    } else {
      resTbody.innerHTML = reservations.map(res => {
        let statusClass = 'available';
        if (res.status === 'Beklemede') statusClass = 'rented';
        else if (res.status === 'İptal Edildi') statusClass = 'maintenance';

        return `
          <tr>
            <td><strong>${res.id}</strong></td>
            <td>
              <strong>${res.customerName}</strong>
              <p style="font-size: 0.7rem; color: #64748B;">${res.customerPhone}</p>
              ${res.customerEmail ? `<p style="font-size: 0.65rem; color: #94A3B8;">${res.customerEmail}</p>` : ''}
            </td>
            <td>${res.carName}</td>
            <td>${res.startDate} / ${res.endDate}</td>
            <td style="font-weight: 800; color: var(--noble-gold);">₺${res.totalPrice.toLocaleString('tr-TR')}</td>
            <td><span class="badge-status ${statusClass}">${res.status}</span></td>
            <td style="text-align: right; white-space: nowrap;">
              <div style="display: inline-flex; gap: 4px; justify-content: flex-end;">
                <button onclick="downloadReservationPDF('${res.id}')" class="btn-noble-outline" style="padding: 4px 8px; font-size: 0.65rem; color: #C5A059; border-color: rgba(197, 160, 89, 0.2);" title="PDF Rezervasyon Fişi İndir">
                  <i class="ri-file-pdf-line"></i> Fiş
                </button>
                ${res.status === 'Beklemede' ? `
                  <button onclick="approveReservation('${res.id}')" class="btn-noble-outline" style="padding: 4px 8px; font-size: 0.65rem; color: #10B981; border-color: rgba(16, 185, 20, 0.2);">Onayla</button>
                ` : ''}
                ${res.status !== 'İptal Edildi' ? `
                  <button onclick="cancelReservation('${res.id}')" class="btn-noble-outline" style="padding: 4px 8px; font-size: 0.65rem; color: #EF4444; border-color: rgba(239, 68, 68, 0.2);">İptal Et</button>
                ` : ''}
                <button onclick="deleteReservation('${res.id}')" class="btn-noble-outline" style="padding: 4px 8px; font-size: 0.65rem; color: #64748B; border-color: rgba(100, 116, 139, 0.2);" title="Sistem Kaydını Tamamen Sil">Sil</button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }
  }
}

// CRUD - Fleet status changer
async function changeVehicleStatusDirect(carId, newStatus) {
  if (window.db && window.firestoreTools) {
    try {
      const { doc, updateDoc } = window.firestoreTools;
      const docRef = doc(window.db, "vehicles", carId);
      await updateDoc(docRef, { status: newStatus });
      showToast(`Araç durumu "${newStatus}" olarak değiştirildi.`, 'success');
    } catch (err) {
      console.error("Firebase sync error:", err);
      showToast('Araç durumu güncellenirken bir hata oluştu.', 'error');
    }
  }
}

// CRUD - Delete car
async function deleteCar(carId) {
  if (confirm('Bu aracı filodan tamamen silmek istediğinize emin misiniz?')) {
    if (window.db && window.firestoreTools) {
      try {
        const { doc, deleteDoc } = window.firestoreTools;
        await deleteDoc(doc(window.db, "vehicles", carId));
        showToast('Araç filodan silindi.', 'warning');
      } catch (err) {
        console.error("Firebase sync error:", err);
        showToast('Araç silinirken bir hata oluştu.', 'error');
      }
    }
  }
}

// CRUD - Testimonials controls
async function toggleTestimonialVisibility(reviewId) {
  const rev = testimonials.find(t => t.id === reviewId);
  if (!rev) return;
  const newStatus = rev.status === 'Yayında' ? 'Gizli' : 'Yayında';

  if (window.db && window.firestoreTools) {
    try {
      const { doc, updateDoc } = window.firestoreTools;
      await updateDoc(doc(window.db, "testimonials", reviewId), { status: newStatus });
      showToast(`Yorum durumu "${newStatus}" olarak güncellendi.`, 'success');
    } catch (err) {
      console.error("Firebase sync error:", err);
      showToast('Yorum durumu güncellenirken bir hata oluştu.', 'error');
    }
  }
}

async function deleteTestimonial(reviewId) {
  if (confirm('Bu yorumu sistemden silmek istiyor musunuz?')) {
    if (window.db && window.firestoreTools) {
      try {
        const { doc, deleteDoc } = window.firestoreTools;
        await deleteDoc(doc(window.db, "testimonials", reviewId));
        showToast('Yorum silindi.', 'warning');
      } catch (err) {
        console.error("Firebase sync error:", err);
        showToast('Yorum silinirken bir hata oluştu.', 'error');
      }
    }
  }
}

// CRUD - Add/Edit Car Modal
function openAddCarModal() {
  editingCarId = null;
  tempCarImages = [];
  
  const modal = document.getElementById('add-car-modal');
  if (!modal) return;

  document.getElementById('add-car-modal-title').textContent = 'Filoya Yeni Araç Ekle';
  document.getElementById('new-car-brand').value = '';
  document.getElementById('new-car-model').value = '';
  document.getElementById('new-car-price').value = '';
  document.getElementById('new-car-deposit').value = '';
  document.getElementById('new-car-images-urls').value = '';
  document.getElementById('new-car-thumbs-preview').innerHTML = '';
  document.getElementById('new-car-prestige').checked = false;
  
  modal.classList.add('active');
}

function openEditCarModal(carId) {
  const car = vehicles.find(v => v.id === carId);
  if (!car) return;

  editingCarId = carId;
  tempCarImages = car.images ? [...car.images] : [car.image];

  const modal = document.getElementById('add-car-modal');
  if (!modal) return;

  document.getElementById('add-car-modal-title').textContent = 'Araç Detaylarını Düzenle';
  document.getElementById('new-car-brand').value = car.brand;
  document.getElementById('new-car-model').value = car.model;
  document.getElementById('new-car-price').value = car.price;
  document.getElementById('new-car-deposit').value = car.deposit;
  document.getElementById('new-car-category').value = car.category;
  document.getElementById('new-car-fuel').value = car.fuel;
  document.getElementById('new-car-images-urls').value = tempCarImages.join('\n');
  document.getElementById('new-car-prestige').checked = car.isPrestige || false;

  renderCarThumbsPreview();
  modal.classList.add('active');
}

// Handle local file uploads (multiple images)
function handleMultipleFileSelect(event) {
  const files = event.target.files;
  if (!files || files.length === 0) return;

  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      tempCarImages.push(e.target.result);
      renderCarThumbsPreview();
      // Auto write to the text area
      const textVal = document.getElementById('new-car-images-urls');
      if (textVal) {
        textVal.value = tempCarImages.filter(img => !img.startsWith('data:')).join('\n');
      }
    };
    reader.readAsDataURL(file);
  });
  showToast(`${files.length} fotoğraf yüklendi.`, 'success');
}

function renderCarThumbsPreview() {
  const container = document.getElementById('new-car-thumbs-preview');
  if (!container) return;

  container.innerHTML = tempCarImages.map((img, index) => `
    <div style="position: relative; width: 68px; height: 50px;">
      <img src="${img}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px; border: 1px solid #C5A059;">
      <button type="button" onclick="removeTempCarImage(${index})" style="position: absolute; -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px); top: -4px; right: -4px; width: 18px; height: 18px; background: rgba(239,68,68,0.85); color: white; border-radius: 50%; font-size: 10px; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer;">&times;</button>
    </div>
  `).join('');
}

function removeTempCarImage(index) {
  tempCarImages.splice(index, 1);
  renderCarThumbsPreview();
  const textVal = document.getElementById('new-car-images-urls');
  if (textVal) {
    textVal.value = tempCarImages.filter(img => !img.startsWith('data:')).join('\n');
  }
}

// Save Car
async function saveCarFromModal() {
  const brand = document.getElementById('new-car-brand').value.trim();
  const model = document.getElementById('new-car-model').value.trim();
  const price = parseInt(document.getElementById('new-car-price').value);
  const deposit = parseInt(document.getElementById('new-car-deposit').value) || 0;
  const category = document.getElementById('new-car-category').value;
  const fuel = document.getElementById('new-car-fuel').value;
  const urlInput = document.getElementById('new-car-images-urls').value.trim();
  const isPrestige = document.getElementById('new-car-prestige').checked;

  // Combine text urls and reader base64 images
  let textUrls = urlInput ? urlInput.split('\n').map(u => u.trim()).filter(Boolean) : [];
  let allImages = [...textUrls, ...tempCarImages.filter(img => img.startsWith('data:'))];
  
  if (allImages.length === 0) {
    allImages.push('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&w=800&q=80&fit=crop');
  }

  const mainImage = allImages[0];

  const carData = {
    brand,
    model,
    price,
    deposit,
    category,
    fuel,
    image: mainImage,
    images: allImages,
    isPrestige,
    transmission: 'Otomatik',
    seats: category === 'SUV' ? 5 : category === 'Spor' ? 2 : 5,
    luggage: category === 'SUV' ? 5 : 3,
    power: '220 HP',
    acceleration: '6.8s (0-100)',
    topSpeed: '240 km/h',
    badge: 'Luxury VIP',
    plate: '34 CGR ' + Math.floor(100 + Math.random() * 900),
    features: ['Deri Döşeme', 'Cam Tavan', 'Yeni Nesil Kokpit']
  };

  // If this car is marked as prestige, reset all other cars' prestige flag
  if (isPrestige) {
    if (window.db && window.firestoreTools) {
      try {
        const { collection, getDocs, doc, updateDoc } = window.firestoreTools;
        const snap = await getDocs(collection(window.db, "vehicles"));
        for (let d of snap.docs) {
          if (d.id !== editingCarId && d.data().isPrestige) {
            await updateDoc(doc(window.db, "vehicles", d.id), { isPrestige: false });
          }
        }
      } catch (err) {
        console.warn("Failed to reset other prestige flags in Firebase:", err);
        showToast('Diğer prestij araçlar güncellenirken hata oluştu.', 'error');
      }
    }
  }

  if (editingCarId) {
    // Sync to Firebase
    if (window.db && window.firestoreTools) {
      try {
        const { doc, updateDoc } = window.firestoreTools;
        await updateDoc(doc(window.db, "vehicles", editingCarId), carData);
        showToast('Araç kaydı başarıyla güncellendi!', 'success');
      } catch (err) {
        console.error("Firebase sync error:", err);
        showToast('Araç güncellenirken bir hata oluştu.', 'error');
      }
    }
  } else {
    const newCarId = 'car-' + Date.now();
    const newCar = {
      id: newCarId,
      status: 'Müsait',
      ...carData
    };
    // Sync to Firebase
    if (window.db && window.firestoreTools) {
      try {
        const { doc, setDoc } = window.firestoreTools;
        await setDoc(doc(window.db, "vehicles", newCarId), newCar);
        showToast('Yeni VIP araç filoya eklendi!', 'success');
      } catch (err) {
        console.error("Firebase sync error:", err);
        showToast('Araç eklenirken bir hata oluştu.', 'error');
      }
    }
  }

  closeModal('add-car-modal');
}

// CRUD - FAQ operations
function openAddFAQModal() {
  editingFaqId = null;
  const modal = document.getElementById('add-faq-modal');
  if (!modal) return;

  document.getElementById('add-faq-modal-title').textContent = 'SSS Yeni Soru & Cevap Ekle';
  document.getElementById('new-faq-q-tr').value = '';
  document.getElementById('new-faq-q-en').value = '';
  document.getElementById('new-faq-a-tr').value = '';
  document.getElementById('new-faq-a-en').value = '';
  
  modal.classList.add('active');
}

function openEditFAQModal(faqId) {
  const faq = faqs.find(f => f.id === faqId);
  if (!faq) return;

  editingFaqId = faqId;
  const modal = document.getElementById('add-faq-modal');
  if (!modal) return;

  document.getElementById('add-faq-modal-title').textContent = 'SSS Soruyu Düzenle';
  document.getElementById('new-faq-q-tr').value = faq.q_tr;
  document.getElementById('new-faq-q-en').value = faq.q_en;
  document.getElementById('new-faq-a-tr').value = faq.a_tr;
  document.getElementById('new-faq-a-en').value = faq.a_en;

  modal.classList.add('active');
}

async function saveFAQFromModal() {
  const q_tr = document.getElementById('new-faq-q-tr').value.trim();
  const q_en = document.getElementById('new-faq-q-en').value.trim();
  const a_tr = document.getElementById('new-faq-a-tr').value.trim();
  const a_en = document.getElementById('new-faq-a-en').value.trim();

  if (!q_tr || !a_tr) {
    showToast('Lütfen soru ve cevap metnini doldurunuz.', 'warning');
    return;
  }

  const faqData = {
    q_tr,
    q_en: q_en || q_tr,
    a_tr,
    a_en: a_en || a_tr
  };

  if (editingFaqId) {
    if (window.db && window.firestoreTools) {
      try {
        const { doc, updateDoc } = window.firestoreTools;
        await updateDoc(doc(window.db, "faqs", editingFaqId), faqData);
        showToast('Soru kaydı güncellendi.', 'success');
      } catch (err) {
        console.error("Firebase sync error:", err);
        showToast('Soru güncellenirken bir hata oluştu.', 'error');
      }
    }
  } else {
    const newFAQId = 'faq-' + Date.now();
    const newFAQ = {
      id: newFAQId,
      ...faqData
    };
    if (window.db && window.firestoreTools) {
      try {
        const { doc, setDoc } = window.firestoreTools;
        await setDoc(doc(window.db, "faqs", newFAQId), newFAQ);
        showToast('Yeni soru başarıyla eklendi.', 'success');
      } catch (err) {
        console.error("Firebase sync error:", err);
        showToast('Soru eklenirken bir hata oluştu.', 'error');
      }
    }
  }

  closeModal('add-faq-modal');
}

async function deleteFAQ(faqId) {
  if (confirm('Bu soruyu silmek istediğinize emin misiniz?')) {
    if (window.db && window.firestoreTools) {
      try {
        const { doc, deleteDoc } = window.firestoreTools;
        await deleteDoc(doc(window.db, "faqs", faqId));
        showToast('Soru silindi.', 'warning');
      } catch (err) {
        console.error("Firebase sync error:", err);
        showToast('Soru silinirken bir hata oluştu.', 'error');
      }
    }
  }
}

// Cancel reservation
async function cancelReservation(resId) {
  if (confirm('Bu kiralama siparişini / rezervasyonunu iptal etmek istediğinize emin misiniz?')) {
    const res = reservations.find(r => r.id === resId);
    if (res) {
      if (window.db && window.firestoreTools) {
        try {
          const { doc, updateDoc } = window.firestoreTools;
          await updateDoc(doc(window.db, "reservations", resId), { status: 'İptal Edildi' });
          showToast('Rezervasyon iptal edildi.', 'warning');
        } catch (err) {
          console.error("Firebase reservation cancellation error:", err);
          showToast('Rezervasyon iptal edilirken bir hata oluştu.', 'error');
        }
      }
    }
  }
}

// Approve reservation
async function approveReservation(resId) {
  const res = reservations.find(r => r.id === resId);
  if (res) {
    if (window.db && window.firestoreTools) {
      try {
        const { doc, updateDoc } = window.firestoreTools;
        await updateDoc(doc(window.db, "reservations", resId), { status: 'Onaylandı' });
        showToast('Rezervasyon onaylandı.', 'success');
      } catch (err) {
        console.error("Firebase reservation approval error:", err);
        showToast('Rezervasyon onaylanırken bir hata oluştu.', 'error');
      }
    }
  }
}

// Delete reservation record
async function deleteReservation(resId) {
  if (confirm('Bu rezervasyon kaydını veritabanından kalıcı olarak silmek istediğinize emin misiniz? (Bu işlem geri alınamaz)')) {
    if (window.db && window.firestoreTools) {
      try {
        const { doc, deleteDoc } = window.firestoreTools;
        await deleteDoc(doc(window.db, "reservations", resId));
        showToast('Rezervasyon kaydı silindi.', 'info');
      } catch (err) {
        console.error("Firebase reservation deletion error:", err);
        showToast('Rezervasyon silinirken bir hata oluştu.', 'error');
      }
    }
  }
}

// PDF Receipt Generator for Admin Panel
function downloadReservationPDF(pnr) {
  if (typeof html2pdf === 'undefined') {
    showToast('PDF yükleme kütüphanesi hazır değil, lütfen sayfayı yenileyip tekrar deneyin.', 'warning');
    return;
  }

  const res = reservations.find(r => r.id === pnr);
  if (!res) {
    showToast('Rezervasyon bulunamadı!', 'error');
    return;
  }

  const car = vehicles.find(c => `${c.brand} ${c.model}` === res.carName) || INITIAL_VEHICLES.find(c => `${c.brand} ${c.model}` === res.carName) || { price: res.totalPrice / 3 };
  const dailyRate = car.price;
  
  // Calculate duration
  const start = new Date(res.startDate);
  const end = new Date(res.endDate);
  const diffTime = Math.abs(end - start);
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 3;

  let discountPerc = 0;
  if (days >= 14) discountPerc = 0.20;
  else if (days >= 7) discountPerc = 0.10;
  else if (days >= 3) discountPerc = 0.05;

  const subtotal = Math.round(dailyRate * days * (1 - discountPerc));
  const extrasTotal = Math.max(0, Math.round((res.totalPrice / 1.2) - subtotal));
  const vat = Math.round((subtotal + extrasTotal) * 0.20);
  const grandTotal = res.totalPrice;

  const receiptContainer = document.createElement('div');
  receiptContainer.style.background = '#FFFFFF';
  receiptContainer.style.color = '#121214';
  receiptContainer.style.fontFamily = 'Georgia, serif';
  receiptContainer.style.width = '180mm';
  receiptContainer.style.padding = '20px';
  receiptContainer.style.boxSizing = 'border-box';

  receiptContainer.innerHTML = `
    <!-- Header -->
    <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #C5A059; padding-bottom: 12px; margin-bottom: 16px;">
      <div>
        <h1 style="font-family: serif; font-size: 22px; margin: 0; color: #121214; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">ÇAĞRI NOBLE RENT A CAR</h1>
        <p style="font-size: 11px; color: #64748B; margin: 3px 0 0 0;">Lüks VIP Araç Kiralama Hizmetleri • Amasya Merkez</p>
        <p style="font-size: 10px; color: #64748B; margin: 2px 0 0 0;">Tel: +90 535 000 00 00 | Web: cagrirentacar.com</p>
      </div>
      <div style="text-align: right;">
        <h2 style="font-size: 16px; margin: 0; color: #C5A059; font-weight: bold; letter-spacing: 0.05em;">REZERVASYON FİŞİ</h2>
        <p style="font-size: 11px; margin: 4px 0 0 0;"><strong>PNR:</strong> ${res.id}</p>
        <p style="font-size: 10px; color: #64748B; margin: 2px 0 0 0;"><strong>Tarih:</strong> ${res.createdAt}</p>
      </div>
    </div>

    <!-- Info Grid -->
    <div style="display: flex; gap: 15px; margin-bottom: 16px;">
      <!-- Customer Info -->
      <div style="flex: 1; border: 1px solid #E2E8F0; padding: 10px; border-radius: 8px; font-size: 11px;">
        <h3 style="font-size: 12px; margin-top: 0; margin-bottom: 6px; color: #121214; border-bottom: 1px solid #E2E8F0; padding-bottom: 4px; font-weight: bold; letter-spacing: 0.02em;">MÜŞTERİ BİLGİLERİ</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 2px 0; color: #64748B; width: 35%;">Adı Soyadı:</td><td style="font-weight: bold;">${res.customerName}</td></tr>
          <tr><td style="padding: 2px 0; color: #64748B;">Telefon:</td><td style="font-weight: bold;">${res.customerPhone}</td></tr>
          <tr><td style="padding: 2px 0; color: #64748B;">E-posta:</td><td>${res.customerEmail || '---'}</td></tr>
          <tr><td style="padding: 2px 0; color: #64748B;">Durum:</td><td style="font-weight: bold; color: ${res.status === 'Onaylandı' ? '#10B981' : res.status === 'Beklemede' ? '#F59E0B' : '#EF4444'};">${res.status}</td></tr>
        </table>
      </div>
      
      <!-- Vehicle Info -->
      <div style="flex: 1; border: 1px solid #E2E8F0; padding: 10px; border-radius: 8px; font-size: 11px;">
        <h3 style="font-size: 12px; margin-top: 0; margin-bottom: 6px; color: #121214; border-bottom: 1px solid #E2E8F0; padding-bottom: 4px; font-weight: bold; letter-spacing: 0.02em;">KİRALANAN ARAÇ</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 2px 0; color: #64748B; width: 35%;">Araç Modeli:</td><td style="font-weight: bold;">${res.carName}</td></tr>
          <tr><td style="padding: 2px 0; color: #64748B;">Alış Tarihi:</td><td style="font-weight: bold;">${res.startDate}</td></tr>
          <tr><td style="padding: 2px 0; color: #64748B;">İade Tarihi:</td><td style="font-weight: bold;">${res.endDate}</td></tr>
          <tr><td style="padding: 2px 0; color: #64748B;">Süre:</td><td style="font-weight: bold;">${days} Gün</td></tr>
        </table>
      </div>
    </div>

    <!-- Pricing Table -->
    <div style="border: 1px solid #E2E8F0; padding: 10px; border-radius: 8px; margin-bottom: 16px;">
      <h3 style="font-size: 12px; margin-top: 0; margin-bottom: 6px; color: #121214; border-bottom: 1px solid #E2E8F0; padding-bottom: 4px; font-weight: bold; letter-spacing: 0.02em;">ÜCRET DETAYLARI</h3>
      <table style="width: 100%; font-size: 11px; border-collapse: collapse;">
        <thead>
          <tr style="border-bottom: 1px solid #E2E8F0; color: #64748B; font-weight: bold;">
            <th style="text-align: left; padding: 4px 0;">Hizmet / Açıklama</th>
            <th style="text-align: right; padding: 4px 0;">Günlük</th>
            <th style="text-align: right; padding: 4px 0;">Süre</th>
            <th style="text-align: right; padding: 4px 0;">Toplam</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 6px 0;">${res.carName} Kiralama Bedeli</td>
            <td style="text-align: right;">₺${dailyRate.toLocaleString('tr-TR')}</td>
            <td style="text-align: right;">${days} Gün</td>
            <td style="text-align: right;">₺${(dailyRate * days).toLocaleString('tr-TR')}</td>
          </tr>
          ${discountPerc > 0 ? `
          <tr style="color: #10B981;">
            <td style="padding: 4px 0;">Kiralama Süresi İndirimi (-%${discountPerc * 100})</td>
            <td style="text-align: right;">-</td>
            <td style="text-align: right;">-</td>
            <td style="text-align: right;">-₺${Math.round(dailyRate * days * discountPerc).toLocaleString('tr-TR')}</td>
          </tr>
          ` : ''}
          ${extrasTotal > 0 ? `
          <tr>
            <td style="padding: 4px 0;">Ekstra Güvence & Konfor Paketleri</td>
            <td style="text-align: right;">-</td>
            <td style="text-align: right;">-</td>
            <td style="text-align: right;">₺${extrasTotal.toLocaleString('tr-TR')}</td>
          </tr>
          ` : ''}
          <tr style="border-top: 1px solid #E2E8F0; font-weight: bold;">
            <td colspan="3" style="padding: 6px 0; text-align: right;">Ara Toplam:</td>
            <td style="padding: 6px 0; text-align: right;">₺${(subtotal + extrasTotal).toLocaleString('tr-TR')}</td>
          </tr>
          <tr>
            <td colspan="3" style="padding: 2px 0; text-align: right; color: #64748B;">KDV (%20):</td>
            <td style="padding: 2px 0; text-align: right; color: #64748B;">₺${vat.toLocaleString('tr-TR')}</td>
          </tr>
          <tr style="font-size: 13px; font-weight: bold; color: #C5A059; border-top: 2px double #C5A059;">
            <td colspan="3" style="padding: 8px 0; text-align: right;">GENEL TOPLAM (KDV Dahil):</td>
            <td style="padding: 8px 0; text-align: right;">₺${grandTotal.toLocaleString('tr-TR')}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Notes -->
    <div style="font-size: 9px; color: #64748B; text-align: justify; line-height: 1.4; margin-bottom: 25px; padding: 8px; background: #F8FAFC; border-radius: 6px;">
      <strong>ÖNEMLİ KİRALAMA NOTLARI:</strong> Bu belge rezervasyon onay fişidir. Kiracının aracı teslim alırken 21 yaşını doldurmuş, en az 2 yıllık geçerli ehliyete sahip olması gereklidir. Premium araçlarda 25 yaş ve 5 yıllık ehliyet şartı aranır. Teslimat sırasında sürücü adına kredi kartı ibrazı ve depozito provizyonu zorunludur. İptaller kiralama saatinden 24 saat öncesine kadar ücretsizdir.
    </div>

    <!-- Signatures -->
    <div style="display: flex; justify-content: space-between; font-size: 10px; text-align: center; margin-top: 20px;">
      <div style="width: 45%;">
        <p style="margin-bottom: 35px; color: #64748B;">Müşteri / Kiracı</p>
        <p style="font-weight: bold; border-top: 1px solid #121214; padding-top: 4px; margin: 0;">${res.customerName}</p>
      </div>
      <div style="width: 45%;">
        <p style="margin-bottom: 35px; color: #64748B;">Çağrı Noble Rent A Car</p>
        <p style="font-weight: bold; border-top: 1px solid #121214; padding-top: 4px; margin: 0;">Yetkili Kaşe / İmza</p>
      </div>
    </div>
  `;

  const opt = {
    margin:       [10, 10, 10, 10],
    filename:     `Cagri_Noble_Rezervasyon_${pnr}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true, logging: false },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().from(receiptContainer).set(opt).save();
  showToast('PDF Rezervasyon Fişi İndiriliyor...', 'success');
}

window.approveReservation = approveReservation;
window.deleteReservation = deleteReservation;
window.downloadReservationPDF = downloadReservationPDF;
window.cancelReservation = cancelReservation;

// POS & Config Settings
function initFormInputsFromPOSConfig() {
  const providerSelect = document.getElementById('pos-provider');
  const merchantInput = document.getElementById('pos-merchant-id');
  const apiKeyInput = document.getElementById('pos-api-key');
  const secretKeyInput = document.getElementById('pos-secret-key');
  const secureCheck = document.getElementById('pos-3d-secure');
  const testCheck = document.getElementById('pos-test-mode');

  if (providerSelect) providerSelect.value = posConfig.provider;
  if (merchantInput) merchantInput.value = posConfig.merchantId;
  if (apiKeyInput) apiKeyInput.value = posConfig.apiKey;
  if (secretKeyInput) secretKeyInput.value = posConfig.secretKey;
  if (secureCheck) secureCheck.checked = posConfig.is3DSecure;
  if (testCheck) testCheck.checked = posConfig.isTestMode;
}

function savePOSConfig() {
  const provider = document.getElementById('pos-provider').value;
  const merchantId = document.getElementById('pos-merchant-id').value.trim();
  const apiKey = document.getElementById('pos-api-key').value.trim();
  const secretKey = document.getElementById('pos-secret-key').value.trim();
  const is3DSecure = document.getElementById('pos-3d-secure').checked;
  const isTestMode = document.getElementById('pos-test-mode').checked;

  posConfig = {
    provider,
    merchantId,
    apiKey,
    secretKey,
    is3DSecure,
    isTestMode
  };

  saveState();
  showToast('Sanal POS yapılandırması kaydedildi.', 'success');
}

function updateAdminPassword() {
  const passInput = document.getElementById('new-admin-pass');
  if (!passInput) return;

  const newPass = passInput.value.trim();
  if (newPass.length < 5) {
    showToast('Güvenlik için şifre en az 5 karakter olmalıdır.', 'warning');
    return;
  }

  customAdminPassword = newPass;
  saveState();
  passInput.value = '';
  showToast('Yönetici şifresi güncellendi!', 'success');
}
function initRealtimeSync() {
  if (window.db && window.firestoreTools && window.firestoreTools.onSnapshot) {
    const { collection, onSnapshot } = window.firestoreTools;

    // 1. Listen to Vehicles
    onSnapshot(collection(window.db, "vehicles"), (snapshot) => {
      const dbVehicles = [];
      snapshot.forEach((doc) => {
        dbVehicles.push({ ...doc.data(), id: doc.id });
      });
      vehicles = dbVehicles;
      isDbLoading = false;
      saveState();
      renderAdminTable();
      updateStatsCount();
    });

    // 2. Listen to Testimonials
    onSnapshot(collection(window.db, "testimonials"), (snapshot) => {
      const dbTestimonials = [];
      snapshot.forEach((doc) => {
        dbTestimonials.push({ ...doc.data(), id: doc.id });
      });
      testimonials = dbTestimonials;
      saveState();
      renderAdminTable();
      updateStatsCount();
    });

    // 3. Listen to FAQs
    onSnapshot(collection(window.db, "faqs"), (snapshot) => {
      const dbFaqs = [];
      snapshot.forEach((doc) => {
        dbFaqs.push({ ...doc.data(), id: doc.id });
      });
      faqs = dbFaqs;
      saveState();
      renderAdminTable();
      updateStatsCount();
    });

    // 4. Listen to Reservations
    onSnapshot(collection(window.db, "reservations"), (snapshot) => {
      const dbReservations = [];
      snapshot.forEach((doc) => {
        dbReservations.push({ ...doc.data(), id: doc.id });
      });
      reservations = dbReservations;
      saveState();
      renderAdminTable();
    });
  }
}
