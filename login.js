document.addEventListener('DOMContentLoaded', () => {
    
    const senhaInput = document.getElementById('senha');
    const toggleBtn = document.getElementById('togglePassword');
    const iconEye = document.getElementById('iconEye');

    toggleBtn.addEventListener('click', () => {
        const isPassword = senhaInput.type === "password";
        senhaInput.type = isPassword ? "text" : "password";

        iconEye.innerHTML = isPassword
            ? `
                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.8 21.8 0 0 1 5.06-6.94"/>
                <path d="M9.9 9.9a3 3 0 1 1 4.2 4.2"/>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              `
            : `
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              `;
    });

});
