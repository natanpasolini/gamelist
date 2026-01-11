const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter(e => e.isIntersecting);
    
    visible.forEach((entry, index) => {
        setTimeout(() => {
                entry.target.classList.add('card-visible');
                observer.unobserve(entry.target); 
            }, index * 200); 
        });
}, { threshold: 0.1, rootMargin: '100px' });

export function useObserver() {
    const cards = document.querySelectorAll('.card-hidden');
    cards.forEach(card => observer.observe(card));
};