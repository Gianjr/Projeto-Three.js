document.addEventListener("DOMContentLoaded", () => {
    const galleryContainer = document.querySelector('.gallery_container');
    const galleryControlsContainer = document.querySelector('.gallery_controls');
    const galleryControls = ['previous', 'next'];
    const galleryItems = Array.from(document.querySelectorAll('.gallery_item')); // Corrigido para "item"

    if (!galleryContainer || galleryItems.length === 0) {
        console.error("❌ ERRO: Elementos da galeria não encontrados!");
        return;
    }

    class Carrousel {
        constructor(container, galleryItems, controls) {
            this.carrouselContainer = container;
            this.carrouselControls = controls;
            this.carrouselArray = [...galleryItems];
            this.currentIndex = 0; // Para rastrear a posição atual
        }

        updateGallery() {
            this.carrouselArray.forEach((el) => {
                el.classList.remove('gallery_item1', 'gallery_item2', 'gallery_item3', 'gallery_item4', 'gallery_item5');
            });

            // Definir a ordem dos itens no carrossel (ajuste a sequência conforme necessário)
            const ordem = [0, 1, 2, 3, 4]; // Altere esta lista para personalizar a ordem

            ordem.forEach((pos, i) => {
                const index = (this.currentIndex + pos) % this.carrouselArray.length;
                this.carrouselArray[index].classList.add(`gallery_item${i + 1}`);
            });
        }

        setCurrentState(button) {
            if (button.classList.contains('gallery_controls-previous')) {
                this.currentIndex = (this.currentIndex - 1 + this.carrouselArray.length) % this.carrouselArray.length;
            } else {
                this.currentIndex = (this.currentIndex + 1) % this.carrouselArray.length;
            }

            this.updateGallery();
        }

        setControls() {
            this.carrouselControls.forEach(control => {
                const button = document.createElement('button');
                button.className = `gallery_controls-${control}`;
                button.innerText = control;
                galleryControlsContainer.appendChild(button);
            });
        }

        useControls() {
            const triggers = [...galleryControlsContainer.childNodes];
            triggers.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.setCurrentState(e.target);
                });
            });
        }
    }

    // Criando o carrossel corretamente com a classe Carrousel
    const exampleCarrousel = new Carrousel(galleryContainer, galleryItems, galleryControls);

    exampleCarrousel.setControls();
    exampleCarrousel.useControls();
    exampleCarrousel.updateGallery(); // Garante que a galeria inicializa corretamente
});

