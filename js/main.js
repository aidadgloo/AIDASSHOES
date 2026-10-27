/**
 * AIDA'S SHOES - Main JavaScript
 * Interactions, Mobile Menu, Filter, FAQ Accordion, Lightbox & WhatsApp Helpers
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger-btn');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
            if (navOverlay) navOverlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        if (navOverlay) {
            navOverlay.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
                navOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        }

        // Close mobile menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
                if (navOverlay) navOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // 2. Sticky Navbar Effect on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }

        // Scroll to Top Button Visibility
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        if (scrollTopBtn) {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
    });

    // 3. Scroll to Top Handler
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 4. FAQ Accordion (on Service & Contact pages)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');
                // Close all others
                faqItems.forEach(other => other.classList.remove('active'));
                // Toggle current
                if (!isOpen) {
                    item.classList.add('active');
                }
            });
        }
    });

    // 5. Gallery Filter (on Galerie page)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-card');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue || category?.includes(filterValue)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.85)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 250);
                    }
                });
            });
        });
    }

    // 6. Lightbox Modal for Gallery Images
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxClose = document.getElementById('lightboxClose');
    const zoomButtons = document.querySelectorAll('.zoom-btn, .gallery-card img');

    if (lightboxModal && lightboxImg) {
        zoomButtons.forEach(el => {
            el.addEventListener('click', (e) => {
                // If it's the image or zoom button
                const card = el.closest('.gallery-card');
                if (card) {
                    const img = card.querySelector('img');
                    const title = card.querySelector('h3')?.innerText || "Modèle AIDA'S SHOES";
                    if (img) {
                        lightboxImg.src = img.src;
                        if (lightboxTitle) lightboxTitle.innerText = title;
                        lightboxModal.classList.add('active');
                        document.body.classList.add('no-scroll');
                    }
                }
            });
        });

        if (lightboxClose) {
            lightboxClose.addEventListener('click', () => {
                lightboxModal.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        }

        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    // 7. Interactive Contact Form Submission Feedback
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            const name = document.getElementById('formName')?.value || '';
            const phone = document.getElementById('formPhone')?.value || '';
            const message = document.getElementById('formMessage')?.value || '';

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Envoi en cours...';

            setTimeout(() => {
                // WhatsApp URL generation if user wants direct contact
                submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Reçu !';
                submitBtn.style.background = '#15803d';

                const alertBox = document.getElementById('formAlert');
                if (alertBox) {
                    alertBox.innerHTML = `
                        <div class="alert-success">
                            <i class="fa-solid fa-circle-check"></i>
                            <div>
                                <strong>Merci ${name || 'cher client'} !</strong> Votre message a bien été enregistré. 
                                Vous pouvez également nous contacter directement sur WhatsApp au <strong>+221 78 372 92 51</strong> pour une réponse immédiate.
                                <div style="margin-top: 10px;">
                                    <a href="https://wa.me/221783729251?text=Bonjour%20AIDA'S%20SHOES,%20je%20m'appelle%20${encodeURIComponent(name)}.%20${encodeURIComponent(message)}" target="_blank" class="btn btn-sm btn-whatsapp">
                                        <i class="fab fa-whatsapp"></i> Continuer sur WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    `;
                    alertBox.style.display = 'block';
                }

                contactForm.reset();

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                }, 4000);
            }, 800);
        });
    }

    // 8. Service Calculator / Delivery Estimator (if present)
    const zoneSelect = document.getElementById('zoneSelect');
    const calcResult = document.getElementById('calcResult');
    if (zoneSelect && calcResult) {
        zoneSelect.addEventListener('change', () => {
            const val = zoneSelect.value;
            if (val === 'dakar') {
                calcResult.innerHTML = `
                    <div class="calc-card">
                        <div class="calc-price">2 000 FCFA</div>
                        <div class="calc-delay"><i class="fa-solid fa-clock"></i> Livraison le jour même (2h à 4h)</div>
                        <p>Livraison à domicile partout à Dakar & Banlieue avec option d'essayage.</p>
                    </div>
                `;
            } else if (val === 'saint-louis') {
                calcResult.innerHTML = `
                    <div class="calc-card">
                        <div class="calc-price">2 000 FCFA</div>
                        <div class="calc-delay"><i class="fa-solid fa-clock"></i> Livraison locale express (2h à 5h)</div>
                        <p>Retrait direct en boutique ou livraison à votre porte à Saint-Louis.</p>
                    </div>
                `;
            } else if (val === 'regions') {
                calcResult.innerHTML = `
                    <div class="calc-card">
                        <div class="calc-price">3 000 FCFA</div>
                        <div class="calc-delay"><i class="fa-solid fa-truck-fast"></i> 24h à 48h ouvrées</div>
                        <p>Envoi sécurisé via nos transporteurs partenaires dans toutes les régions du Sénégal (Thiès, Touba, Kaolack, Ziguinchor, etc.).</p>
                    </div>
                `;
            } else if (val === 'international') {
                calcResult.innerHTML = `
                    <div class="calc-card">
                        <div class="calc-price">Sur devis (Dès 15 000 FCFA)</div>
                        <div class="calc-delay"><i class="fa-solid fa-plane"></i> 3 à 5 jours ouvrés via DHL / Express</div>
                        <p>Expéditions vers la sous-région et l'international (France, USA, Côte d'Ivoire, etc.).</p>
                    </div>
                `;
            } else {
                calcResult.innerHTML = `<p class="text-muted">Sélectionnez votre zone de résidence pour afficher le tarif et le délai estimé.</p>`;
            }
        });
    }
});
