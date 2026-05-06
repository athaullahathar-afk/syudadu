class ConfessionSite {
    constructor() {
        this.dates = [
            { day: 'Thu, 10 May', time: '10:00 WITA', full: 'Sunday, May 10th at 10:00 WITA' },
            { day: 'Wed, 13 May', time: '10:00 WITA', full: 'Wednesday, May 13th at 9:00 WITA' },
            { day: 'Mon, 14 May', time: '10:00 WITA', full: 'Thursday, MAy 14th at 9:00 WITA' },
            { day: 'Wed, 15 May', time: '10:00 WITA', full: 'Friday, May 15th at 9:00 WITA' },
            { day: 'Wed, 16 May', time: '10:00 WITA', full: 'Saturday, May 16th at 9:00 WITA' }
        ];
        this.selectedDate = null;
        this.waNumber = '+6285701037489'; 
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
        
        const message = `Halo ganteng! wkwkwk Aku pilih tanggal ${this.selectedDate.full} for our meetup yaa 😊`;
        const encodedMessage = encodeURIComponent(message);
        const waUrl = `https://wa.me/${this.waNumber}?text=${encodedMessage}`;
        
        window.open(waUrl, '_blank');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ConfessionSite();
});
