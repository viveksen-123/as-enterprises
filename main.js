/**
 * AS ENTERPRISES - Interactive Core Scripts
 * CP PLUS Authorized Dealer & Computer Solutions
 * Kokta Transport Nagar, Bhopal
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Constants & Contact Configuration ---
  const WHATSAPP_NUMBER = '917007937097';
  const ALT_PHONE = '9039179374';
  const EMAIL_ID = 'asenterprises2026as@gmail.com';

  // --- Mobile Navigation ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // --- Sticky Navbar Shadow & Back To Top ---
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      scrollTopBtn?.classList.add('visible');
    } else {
      scrollTopBtn?.classList.remove('visible');
    }
  });

  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- Hero Section Feature Tabs ---
  const heroTabBtns = document.querySelectorAll('.hero-tab-btn');
  const heroTabContents = document.querySelectorAll('.hero-tab-content');

  heroTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      heroTabBtns.forEach(b => b.classList.remove('active'));
      heroTabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // --- Services Filter Functionality ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- Interactive Estimator Tabs (CCTV vs Computer) ---
  const calcTabs = document.querySelectorAll('.calc-tab');
  const calcPanels = document.querySelectorAll('.calc-panel');

  calcTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      calcTabs.forEach(t => t.classList.remove('active'));
      calcPanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const panelId = tab.getAttribute('data-panel');
      const targetPanel = document.getElementById(panelId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // --- CCTV Estimator Logic ---
  const cctvCalcForm = document.getElementById('cctvCalcForm');
  const cctvPremisesSummary = document.getElementById('cctvPremisesSummary');
  const cctvCamerasSummary = document.getElementById('cctvCamerasSummary');
  const cctvTypeSummary = document.getElementById('cctvTypeSummary');
  const cctvStorageSummary = document.getElementById('cctvStorageSummary');
  const cctvPriceDisplay = document.getElementById('cctvPriceDisplay');
  const sendCctvWhatsappBtn = document.getElementById('sendCctvWhatsappBtn');

  function calculateCCTV() {
    if (!cctvCalcForm) return;

    const premisesEl = cctvCalcForm.querySelector('input[name="cctvPremises"]:checked');
    const camerasEl = cctvCalcForm.querySelector('input[name="cctvCameras"]:checked');
    const typeEl = cctvCalcForm.querySelector('input[name="cctvType"]:checked');
    const storageEl = cctvCalcForm.querySelector('input[name="cctvStorage"]:checked');
    const installationEl = document.getElementById('cctvIncludeInstall');

    const premises = premisesEl ? premisesEl.value : 'Home / Residence';
    const cameraCount = camerasEl ? parseInt(camerasEl.value) : 4;
    const cameraType = typeEl ? typeEl.value : '2MP Full HD';
    const storage = storageEl ? storageEl.value : '1TB Surveillance HDD';
    const includeInstall = installationEl ? installationEl.checked : true;

    // Pricing Model (Standard competitive Bhopal market pricing)
    let basePricePerCamera = 1500;
    if (cameraType.includes('Color Night Vision')) basePricePerCamera = 2100;
    if (cameraType.includes('Smart Audio')) basePricePerCamera = 2600;
    if (cameraType.includes('PTZ')) basePricePerCamera = 4800;

    let dvrPrice = cameraCount <= 4 ? 2800 : cameraCount <= 8 ? 4400 : 7500;

    let storagePrice = 1800;
    if (storage.includes('1TB')) storagePrice = 3400;
    if (storage.includes('2TB')) storagePrice = 4900;
    if (storage.includes('4TB')) storagePrice = 7800;

    let powerSupplyPrice = cameraCount <= 4 ? 900 : 1600;
    let cablingAndAccessories = cameraCount * 450;
    let installationFee = includeInstall ? cameraCount * 400 : 0;

    const totalEstimate = (cameraCount * basePricePerCamera) + dvrPrice + storagePrice + powerSupplyPrice + cablingAndAccessories + installationFee;

    // Update Live Summary Text
    if (cctvPremisesSummary) cctvPremisesSummary.textContent = premises;
    if (cctvCamerasSummary) cctvCamerasSummary.textContent = `${cameraCount} Camera Setup + CP PLUS DVR/NVR`;
    if (cctvTypeSummary) cctvTypeSummary.textContent = cameraType;
    if (cctvStorageSummary) cctvStorageSummary.textContent = `${storage} (24x7 Recording)`;
    if (cctvPriceDisplay) cctvPriceDisplay.textContent = `₹${totalEstimate.toLocaleString('en-IN')}`;

    // Update WhatsApp link
    if (sendCctvWhatsappBtn) {
      const message = `Hello AS Enterprises,\nI need a quotation for CP PLUS CCTV Installation in Bhopal:\n- Premises: ${premises}\n- Cameras: ${cameraCount} Cameras\n- Type: ${cameraType}\n- Storage: ${storage}\n- Onsite Installation: ${includeInstall ? 'Yes (Included)' : 'No'}\n- Estimated Price: ₹${totalEstimate.toLocaleString('en-IN')}\nPlease contact me to confirm survey & final pricing.`;
      sendCctvWhatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    }
  }

  if (cctvCalcForm) {
    cctvCalcForm.addEventListener('change', calculateCCTV);
    calculateCCTV(); // Initial calculation
  }

  // --- PC / Laptop Build & Service Estimator Logic ---
  const pcCalcForm = document.getElementById('pcCalcForm');
  const pcPurposeSummary = document.getElementById('pcPurposeSummary');
  const pcCpuSummary = document.getElementById('pcCpuSummary');
  const pcRamSummary = document.getElementById('pcRamSummary');
  const pcMonitorSummary = document.getElementById('pcMonitorSummary');
  const pcPriceDisplay = document.getElementById('pcPriceDisplay');
  const sendPcWhatsappBtn = document.getElementById('sendPcWhatsappBtn');

  function calculatePC() {
    if (!pcCalcForm) return;

    const purposeEl = pcCalcForm.querySelector('input[name="pcPurpose"]:checked');
    const cpuEl = pcCalcForm.querySelector('input[name="pcCpu"]:checked');
    const ramEl = pcCalcForm.querySelector('input[name="pcRam"]:checked');
    const monitorEl = pcCalcForm.querySelector('input[name="pcMonitor"]:checked');
    const osInstallEl = document.getElementById('pcOsInstall');

    const purpose = purposeEl ? purposeEl.value : 'Office & Business';
    const cpu = cpuEl ? cpuEl.value : 'Intel Core i5 / Ryzen 5';
    const ram = ramEl ? ramEl.value : '16GB RAM + 512GB NVMe SSD';
    const monitor = monitorEl ? monitorEl.value : '22-inch Borderless FHD IPS';
    const includeOS = osInstallEl ? osInstallEl.checked : true;

    // Pricing calculation
    let cpuBase = 12000;
    if (cpu.includes('Core i3')) cpuBase = 9500;
    if (cpu.includes('Core i7')) cpuBase = 24500;
    if (cpu.includes('Workstation')) cpuBase = 38000;

    let ramStorageBase = 4500;
    if (ram.includes('8GB')) ramStorageBase = 2800;
    if (ram.includes('32GB')) ramStorageBase = 8500;

    let monitorBase = 6500;
    if (monitor.includes('None')) monitorBase = 0;
    if (monitor.includes('24-inch')) monitorBase = 8800;
    if (monitor.includes('27-inch')) monitorBase = 14500;

    let motherBoardCasePsu = 9000;
    let serviceCharge = includeOS ? 700 : 0;

    const totalPcPrice = cpuBase + ramStorageBase + monitorBase + motherBoardCasePsu + serviceCharge;

    // Update Summary
    if (pcPurposeSummary) pcPurposeSummary.textContent = purpose;
    if (pcCpuSummary) pcCpuSummary.textContent = cpu;
    if (pcRamSummary) pcRamSummary.textContent = ram;
    if (pcMonitorSummary) pcMonitorSummary.textContent = monitor;
    if (pcPriceDisplay) pcPriceDisplay.textContent = `₹${totalPcPrice.toLocaleString('en-IN')}`;

    // WhatsApp Message
    if (sendPcWhatsappBtn) {
      const message = `Hello AS Enterprises,\nI am looking for a Computer / PC Build in Bhopal:\n- Purpose: ${purpose}\n- Processor: ${cpu}\n- Memory & Storage: ${ram}\n- Display: ${monitor}\n- Windows/Software Setup: ${includeOS ? 'Yes' : 'No'}\n- Approx Estimate: ₹${totalPcPrice.toLocaleString('en-IN')}\nPlease send me the best brand availability and final deal!`;
      sendPcWhatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    }
  }

  if (pcCalcForm) {
    pcCalcForm.addEventListener('change', calculatePC);
    calculatePC(); // Initial calculation
  }

  // --- Modal Service Booking ---
  const bookingModal = document.getElementById('bookingModal');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalServiceSelect = document.getElementById('modalServiceSelect');
  const modalBookingForm = document.getElementById('modalBookingForm');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service');
      if (serviceName && modalServiceSelect) {
        modalServiceSelect.value = serviceName;
      }
      bookingModal?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  closeModalBtn?.addEventListener('click', () => {
    bookingModal?.classList.remove('active');
    document.body.style.overflow = '';
  });

  bookingModal?.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
      bookingModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Modal Form Submission -> WhatsApp
  modalBookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('modalName')?.value.trim();
    const phone = document.getElementById('modalPhone')?.value.trim();
    const service = document.getElementById('modalServiceSelect')?.value;
    const address = document.getElementById('modalAddress')?.value.trim();
    const notes = document.getElementById('modalNotes')?.value.trim();

    if (!name || !phone) {
      showToast('Please enter your Name and Mobile Number');
      return;
    }

    const message = `*NEW SERVICE BOOKING REQUEST - AS ENTERPRISES*\n\n` +
      `👤 *Customer Name:* ${name}\n` +
      `📞 *Mobile:* ${phone}\n` +
      `🛠️ *Service Required:* ${service}\n` +
      `📍 *Address/Area in Bhopal:* ${address || 'Bhopal'}\n` +
      `📝 *Notes/Problem Description:* ${notes || 'Standard Service'}\n\n` +
      `Please confirm technician schedule and on-site visit.`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    bookingModal?.classList.remove('active');
    document.body.style.overflow = '';
    modalBookingForm.reset();
    showToast('Booking request sent to WhatsApp! Our team will contact you shortly.');
  });

  // --- Contact Page Direct Form Submission ---
  const mainContactForm = document.getElementById('mainContactForm');
  mainContactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value.trim();
    const phone = document.getElementById('contactPhone')?.value.trim();
    const category = document.getElementById('contactCategory')?.value;
    const messageText = document.getElementById('contactMessage')?.value.trim();

    if (!name || !phone) {
      showToast('Please fill out your name and phone number');
      return;
    }

    const text = `*INQUIRY FROM WEBSITE - AS ENTERPRISES*\n\n` +
      `👤 *Name:* ${name}\n` +
      `📞 *Phone:* ${phone}\n` +
      `📌 *Category:* ${category}\n` +
      `💬 *Message:* ${messageText}\n\n` +
      `Location: Kokta Transport Nagar, Bansal College, Bhopal`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    mainContactForm.reset();
    showToast('Message redirected to WhatsApp! Thank you for reaching out.');
  });

  // --- Accessory WhatsApp Inquiry Links ---
  const accessoryInquiryBtns = document.querySelectorAll('.accessory-inquiry-btn');
  accessoryInquiryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productName = btn.getAttribute('data-product');
      const message = `Hello AS Enterprises,\nI am interested in buying *${productName}*. Please let me know the available models, brand options (HP/Dell/Lenovo/CP Plus), and best discount price!`;
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    });
  });

  // --- Toast Notification Helper ---
  function showToast(message) {
    let toast = document.getElementById('siteToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'siteToast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }
});
