class ConfessionSite {
    constructor() {
        this.dates = [
            { day: 'Thu, 12 Dec', time: '7:00 PM', full: 'Thursday, December 12th at 7:00 PM' },
            { day: 'Sat, 14 Dec', time: '3:00 PM', full: 'Saturday, December 14th at 3:00 PM' },
            { day: 'Mon, 16 Dec', time: '6:30 PM', full: 'Monday, December 16th at 6:30 PM' },
            { day: 'Wed, 18 Dec', time: '8:00 PM', full: 'Wednesday, December 18th at 8:00 PM' }
        ];
        this.selectedDate = null;
        this.waNumber = '6281234567890'; // GANTI INI SAMA NOMOR WA LU (format internasional)
        this.init();
    }

    init() {
        this.renderDates();
        this.attachEvents();
    }

    renderDates() {
        const grid = document.getElementById('dateGrid');
        grid.innerHTML = this.dates.map((date, index) => `
            <div class="date-card" data-index="${index}">
                <div class="date-time">${date.time}</div>
                <div class="date-info">${date.day}</div>
            </div>
        `).join('');
    }

    attachEvents() {
        document.querySelectorAll('.date-card').forEach((card, index) => {
            card.addEventListener('click', () => this.selectDate(index));
        });
    }

    selectDate(index) {
        // Reset all cards
        document.querySelectorAll('.date-card').forEach(c => c.classList.remove('selected'));
        
        // Select clicked card
        const card = document.querySelector(`[data-index="${index}"]`);
        card.classList.add('selected');
        this.selectedDate = this.dates[index];
        
        // Auto redirect after 2 seconds
        setTimeout(() => {
            this.redirectToWhatsApp();
        }, 1500);
    }

    redirectToWhatsApp() {
        if (!this.selectedDate) return;
        
        const message = `Hey! I picked ${this.selectedDate.full} for our meetup 😊 Can we do Google Meet then?`;
        const encodedMessage = encodeURIComponent(message);
        const waUrl = `https://wa.me/${this.waNumber}?text=${encodedMessage}`;
        
        window.open(waUrl, '_blank');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ConfessionSite();
});
