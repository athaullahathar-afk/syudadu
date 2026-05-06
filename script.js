class ConfessionSite {
    constructor() {
        this.dates = [
            { day: 'Thu, 10 May', time: '9:00 PM', full: 'Sunday, May 10th at 9:00 PM' },
            { day: 'Sat, 13 May', time: '9:00 PM', full: 'Friday, May 15th at 9:00 PM' },
            { day: 'Mon, 14 May', time: '9:00 PM', full: 'Saturday, MAy 16th at 9:00 PM' },
            { day: 'Wed, 15 May', time: '9:00 PM', full: 'Sunday, May 17th at 9:00 PM' }
            { day: 'Wed, 16 May', time: '9:00 PM', full: 'Sunday, May 17th at 9:00 PM' }
        ];
        this.selectedDate = null;
        this.waNumber = '+6285701037489'; // GANTI INI SAMA NOMOR WA LU (format internasional)
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
        
        const message = `Halo ganteng! I picked ${this.selectedDate.full} for our meetup 😊 Can we do Google Meet then?`;
        const encodedMessage = encodeURIComponent(message);
        const waUrl = `https://wa.me/${this.waNumber}?text=${encodedMessage}`;
        
        window.open(waUrl, '_blank');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ConfessionSite();
});
