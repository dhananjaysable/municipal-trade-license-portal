// Verification service for citizen authentication
const verificationService = {
    // Verify citizen using mobile, property, or license number
    verifyCitizen: async (identifier, type) => {
        try {
            const response = await fetch('/api/verify-citizen', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identifier, type }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Verification failed:', error);
            throw error;
        }
    },

    // Check license validity for renewal
    checkLicenseValidity: async (licenseNumber) => {
        try {
            const response = await fetch('/api/check-license', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ licenseNumber }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('License check failed:', error);
            throw error;
        }
    },

    // Validate citizen session
    validateSession: () => {
        const sessionData = localStorage.getItem('citizenSession');
        if (!sessionData) return null;
        
        try {
            const session = JSON.parse(sessionData);
            if (new Date(session.expiresAt) < new Date()) {
                localStorage.removeItem('citizenSession');
                return null;
            }
            return session;
        } catch (error) {
            localStorage.removeItem('citizenSession');
            return null;
        }
    },

    // Create citizen session after verification
    createSession: (citizenData) => {
        const session = {
            ...citizenData,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        };
        localStorage.setItem('citizenSession', JSON.stringify(session));
        return session;
    },

    // Clear citizen session
    clearSession: () => {
        localStorage.removeItem('citizenSession');
    }
};

export default verificationService;